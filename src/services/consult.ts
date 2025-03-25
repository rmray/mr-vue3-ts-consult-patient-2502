import type { Result } from '@/types/base'
import type {
  ConsultOrderPreData,
  ConsultOrderPreParams,
  ConsultPartial,
  ConsultPayParams,
  Department,
  Image
} from '@/types/consult'
import mrRequest from '@/utils/request'

/** 获取所有科室列表 */
export function getAllDepartment() {
  return mrRequest.get<Result<Department[]>>({
    url: '/dep/all'
  })
}

/** 图片上传 */
export function uploadImage(file: File) {
  const fd = new FormData()
  fd.append('file', file)

  return mrRequest.post<Result<Image>>({
    url: '/upload',
    data: fd
  })
}

/** 获取折扣信息 */
export function getDiscount(params: ConsultOrderPreParams) {
  return mrRequest.get<Result<ConsultOrderPreData>>({ url: '/patient/consult/order/pre', params })
}

/** 生成订单id */
export function getConsultOrderId(consult: ConsultPartial) {
  return mrRequest.post<Result<{ id: string }>>({ url: '/patient/consult/order', data: consult })
}

/** 生成支付url */
export function getPayUrl(params: ConsultPayParams) {
  return mrRequest.post<Result<{ payUrl: string }>>({ url: '/patient/consult/pay', data: params })
}
