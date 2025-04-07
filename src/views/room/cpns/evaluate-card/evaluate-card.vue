<script setup lang="ts">
import { evaluateConsultOrder } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import type { EvaluateDoc } from '@/types/room'
import { showToast } from 'vant'
import { computed, inject, ref, type Ref } from 'vue'

const props = defineProps<{
  evaluateDoc?: EvaluateDoc
}>()

/** 评价信息 */
const score = ref(props.evaluateDoc?.score) // 评分星级
const content = ref('') // 评价内容
const anonymousFlag = ref(false) // 是否匿名评价
const disabled = computed(() => !score.value || !content.value)

/** 提交评价 */
const consultOrder = inject<Ref<ConsultOrderItem>>('consultOrder')
async function onSubmit() {
  if (!score.value) return showToast('请选择评分')
  if (!content.value) return showToast('请填写评价内容')
  if (!consultOrder?.value) return showToast('未找到问诊订单')
  if (!consultOrder.value.docInfo) return showToast('未找到医生信息')

  await evaluateConsultOrder({
    docId: consultOrder.value.docInfo.id,
    orderId: consultOrder.value.id,
    score: score.value,
    content: content.value,
    anonymousFlag: anonymousFlag.value ? 1 : 0
  })
}
</script>

<template>
  <!-- 已评价 -->
  <div class="evaluate-card" v-if="evaluateDoc">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate v-model="score" size="7vw" gutter="3vw" color="#fadb14" void-icon="star" void-color="rgba(0,0,0,0.04)" />
  </div>

  <!-- 未评价 -->
  <div class="evaluate-card" v-else>
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <van-rate size="7vw" gutter="3vw" void-icon="star" void-color="rgba(0,0,0,0.04)" v-model="score" />
    <van-field
      type="textarea"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
      maxlength="150"
      show-word-limit
      rows="3"
      v-model="content"
    />
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button :class="{ disabled }" type="primary" size="small" round @click="onSubmit">提交评价</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evaluate-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    :deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
