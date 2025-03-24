<script setup lang="ts">
import type { Patient } from '@/types/patient'

import { computed, onMounted, ref } from 'vue'
import { getPatientList } from '@/services/patient'
import PatientOperate from './cpns/patient-operate/patient-operate.vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useConsultStore } from '@/store'

const router = useRouter()
const consultStore = useConsultStore()

/** 添加患者 */
const showPopup = ref(false)
const init: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const initPatient = ref<Patient>({ ...init })
function hdlPatientAdd(item?: Patient) {
  if (item) {
    const { name, idCard, gender, defaultFlag, id } = item
    initPatient.value = { name, idCard, gender, defaultFlag, id }
  } else {
    initPatient.value = { ...init }
  }
  showPopup.value = true
}

onMounted(() => {
  loadPatientList()
})

// 网络请求
const patients = ref<Patient[]>()
async function loadPatientList() {
  const res = await getPatientList()
  patients.value = res.data

  // 高亮默认患者
  const defaultPatient = patients.value.find((item) => item.defaultFlag === 1)
  patientId.value = defaultPatient ? defaultPatient.id : patients.value[0].id
}

/** 选择患者，兼容选择患者 */
const isChange = computed(() => router.currentRoute.value.query.isChange === '1')

/** 选择患者 */
const patientId = ref<string>()
function onSelected(item: Patient) {
  patientId.value = item.id
}

/** 下一步 */
function onNext() {
  if (!patientId.value) return showToast('请选择患者')

  // 存储患者ID
  consultStore.setPatientId(patientId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient">
    <!-- 导航栏 -->
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>

    <!-- 提示信息 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>

    <!-- 患者列表 -->
    <div class="patient-list">
      <template v-for="item in patients" :key="item.id">
        <div class="patient-item" :class="{ selected: patientId === item.id }" @click="onSelected(item)">
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
            <span class="gender">{{ item.genderValue }}</span>
            <span class="age">{{ item.age }}岁</span>
          </div>
          <div class="icon" @click="hdlPatientAdd(item)">
            <cp-icon name="user-edit"></cp-icon>
          </div>
          <div class="tag" v-if="item.defaultFlag === 1">默认</div>
        </div>
      </template>

      <!-- 添加患者 -->
      <div class="patient-add" v-if="patients && patients.length < 6" @click="hdlPatientAdd()">
        <cp-icon name="user-add"></cp-icon>
        <p>添加患者</p>
      </div>

      <!-- 底部提示 -->
      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <!-- 下一步 -->
    <div class="patient-next" v-if="isChange" @click="onNext">
      <van-button type="primary" block round>下一步</van-button>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model:show="showPopup" position="right">
      <patient-operate
        @close-popup="showPopup = false"
        @load-patient="loadPatientList"
        :init-patient="initPatient"
        :key="showPopup ? 1 : 0"
      ></patient-operate>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient {
  padding: 46px 0 80px;

  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
    }
  }
}

.patient-list {
  padding: 15px;

  .patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;
    .info {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      span {
        color: var(--cp-tip);
        margin-right: 20px;
        line-height: 30px;
        &.name {
          font-size: 16px;
          color: var(--cp-text1);
          width: 80px;
          margin-right: 0;
        }
        &.id {
          color: var(--cp-text2);
          width: 180px;
        }
      }
    }
    .icon {
      color: var(--cp-tag);
      width: 20px;
      text-align: center;
    }
    .tag {
      position: absolute;
      right: 60px;
      top: 21px;
      width: 30px;
      height: 16px;
      font-size: 10px;
      color: #fff;
      background-color: var(--cp-primary);
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.selected {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
      .icon {
        color: var(--cp-primary);
      }
    }
  }
  .patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;
    .cp-icon {
      font-size: 24px;
    }
  }
  .patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
  }
}

.patient-change {
  padding: 15px 15px 0;
  > h3 {
    font-size: 15px;
    line-height: 20px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 15px;
  box-sizing: border-box;
}
</style>
