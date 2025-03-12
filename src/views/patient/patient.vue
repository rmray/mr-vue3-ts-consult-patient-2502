<script setup lang="ts">
import type { Patient } from '@/types/patient'

import { onMounted, ref } from 'vue'
import { getPatientList } from '@/services/patient'
import PatientList from './cpns/patient-list/patient-list.vue'
import PatientOperate from './cpns/patient-operate/patient-operate.vue'

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
}
</script>

<template>
  <div class="patient">
    <!-- 导航栏 -->
    <cp-nav-bar title="家庭档案"></cp-nav-bar>

    <!-- 患者列表 -->
    <patient-list v-if="patients" :patients="patients" @patient-add="hdlPatientAdd"></patient-list>

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
</style>
