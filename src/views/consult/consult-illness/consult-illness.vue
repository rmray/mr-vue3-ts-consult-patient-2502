<script setup lang="ts">
import type { ConsultIllness, Image } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant'

import { consultFlagOptions, illnessTimeOptions } from '@/constance'
import { uploadImage } from '@/services/consult'
import { useConsultStore } from '@/store'
import { showConfirmDialog, showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const consultStore = useConsultStore()
const router = useRouter()

/** 表单 */
const consultIllness = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

/** 文件上传 */
const fileList = ref<Image[]>([])
/** 文件上传，监听上传文件读取完 */
const onAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return

  // 上传图片，成功后更新状态
  item.status = 'uploading'
  item.message = '上传Z...'
  uploadImage(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = '上传成功'
      console.log('res: ', res)
      // 同步到表单
      item.url = res.data.url
      consultIllness.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
/** 文件上传，监听预览图删除 */
function onDelete(item: UploaderFileListItem) {
  console.log(item.url, fileList.value)
  consultIllness.value.pictures = consultIllness.value.pictures?.filter((pic) => pic.url !== item.url)
}

/** 下一步，按钮disabled */
const disabled = computed(() => {
  return (
    consultIllness.value.illnessDesc === '' ||
    consultIllness.value.illnessTime === undefined ||
    consultIllness.value.consultFlag === undefined
  )
})
/** 下一步，监听点击下一步 */
function onNext() {
  // 表单校验
  if (consultIllness.value.illnessDesc === '') return showToast('请输入病情描述')
  if (consultIllness.value.illnessTime === undefined) return showToast('请选择患病时间')
  if (consultIllness.value.consultFlag === undefined) return showToast('请选择是否就诊过')

  // 记录病情描述
  consultStore.setIllness(consultIllness.value)
  router.push('/patient?isChange=1')
}

/** 回显表单 */
onMounted(() => {
  const { illnessDesc, illnessTime, consultFlag, pictures } = consultStore.consult
  if (!illnessDesc) return
  showConfirmDialog({
    title: '温馨提示',
    message: '是否继续上次的病情描述？',
    closeOnPopstate: false
  }).then(() => {
    consultIllness.value = { illnessDesc, illnessTime, consultFlag, pictures }
    fileList.value = pictures || []
  })
})
</script>

<template>
  <div class="consult-illness">
    <!-- 导航栏 -->
    <cp-nav-bar title="图文问诊"></cp-nav-bar>

    <!-- 医生提示 -->
    <div class="illness-tip">
      <img src="@/assets/images/avatar-doctor.svg" fit="cover" class="img" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <cp-icon name="consult-safe"></cp-icon>
          内容仅医生可见
        </p>
      </div>
    </div>

    <!-- 病情描述 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="consultIllness.illnessDesc"
        rows="3"
      />
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="illnessTimeOptions" v-model="consultIllness.illnessTime"></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="consultFlagOptions" v-model="consultIllness.consultFlag"></cp-radio-btn>
      </div>

      <!-- 上传图片 -->
      <div class="illness-img">
        <van-uploader
          :after-read="onAfterRead"
          upload-text="上传图片"
          upload-icon="photo-o"
          :max-count="9"
          :max-size="5 * 1024 * 1024"
          v-model="fileList"
          @delete="onDelete"
        />
        <p class="tip" v-if="!fileList.length">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
    </div>

    <!-- 下一步 -->
    <van-button :class="{ disabled }" type="primary" round block @click="onNext">下一步</van-button>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}

.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}

.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
