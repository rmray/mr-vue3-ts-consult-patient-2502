import type { ConsultType } from '@/enum'
import type { ConsultIllness, ConsultPartial } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'consult',
  () => {
    const consult = ref<ConsultPartial>({})

    // 设置store
    // 问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 快速问诊类型，0 普通 1 三甲
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 科室ID
    const setDepId = (depId: string) => (consult.value.depId = depId)
    // 病情描述
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 患者ID
    const setPatientId = (patiendId: string) => (consult.value.patientId = patiendId)

    return { consult, setType, setIllnessType, setDepId, setIllness, setPatientId }
  },
  {
    persist: true
  }
)
