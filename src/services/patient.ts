import type { Result } from '@/types/base'
import type { Patient } from '@/types/patient'
import mrRequest from '@/utils/request'

/** 获取患者列表 */
export function getPatientList() {
  return mrRequest.get<Result<Patient[]>>({ url: '/patient/mylist' })
}

/** 添加患者 */
export function addPatient(patient: Patient) {
  return mrRequest.post<Result<{ id: string }>>({ url: '/patient/add', data: patient })
}

/** 更新患者 */
export function updatePatient(patient: Patient) {
  return mrRequest.put<Result<{ id: string }>>({ url: '/patient/update', data: patient })
}

/** 删除患者 */
export function deletePatient(id: string) {
  return mrRequest.delete<Result<{ id: string }>>({ url: `/patient/del/${id}` })
}
