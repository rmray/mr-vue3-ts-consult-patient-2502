import type { PageRes, Result } from '@/types/base'
import type {
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  ConsultPartial,
  ConsultPayParams,
  Department,
  Image
} from '@/types/consult'
import type { EvaluateParams } from '@/types/room'
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

/** 获取问诊订单详情 */
export function getConsultOrderDetail(orderId: string) {
  return mrRequest.get<Result<ConsultOrderItem>>({ url: '/patient/consult/order/detail', params: { orderId } })
}

/** 获取原始处方 */
export function getPrescription(id: string) {
  return mrRequest.get<Result<Image>>({ url: `/patient/consult/prescription/${id}` })
}

/** 评价问诊订单 */
export function evaluateConsultOrder(data: EvaluateParams) {
  return mrRequest.post({ url: '/patient/order/evaluate', data })
}

/** 获取问诊订单列表 */
export function getConsultOrderList(params: ConsultOrderListParams) {
  return mrRequest.get<Result<PageRes<ConsultOrderItem[]>>>({ url: '/patient/consult/order/list', params })
}

/** 取消问诊订单 */
export function cancelConsultOrder(id: string) {
  return mrRequest.put<any>({ url: `/patient/order/cancel/${id}` })
}

/** 删除问诊订单 */
export function deleteConsultOrder(id: string) {
  return mrRequest.delete<any>({ url: `/patient/order/${id}` })
}
