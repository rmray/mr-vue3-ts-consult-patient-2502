import { getPrescription } from '@/services/consult'
import { showImagePreview } from 'vant'

export function useShowPrescription() {
  async function onShowPrescription(prescriptionId?: string) {
    if (!prescriptionId) return false

    const res = await getPrescription(prescriptionId)
    showImagePreview([res.data.url]) // 展示处方图片
  }

  return { onShowPrescription }
}
