import type { ConsultOrderStatus, ConsultType, IllnessTime } from '@/enum'
import type { Doctor } from './home'
import type { Patient } from './patient'
import type { PageReq } from './base'

/** 图片列表 */
export type Image = {
  id: string // 图片ID
  url: string // 图片地址
}
/** 问诊记录 */
export type Consult = {
  id: string // 问诊记录ID

  type: ConsultType // 问诊类型

  illnessType: 0 | 1 // 快速问诊类型，0 普通 1 三甲

  depId: string // 科室ID

  illnessDesc: string // 疾病描述
  illnessTime: IllnessTime // 疾病持续时间
  consultFlag: 0 | 1 // 是否就诊过，0 未就诊过  1 就诊过
  pictures: Image[] // 图片数组

  patientId: string // 患者ID

  couponId: string // 优惠券ID
}
/** 问诊记录-可选 */
export type ConsultPartial = Partial<Consult>

/** 科室 */
export interface SubDepartment {
  id: string
  name: string
}
export type Department = SubDepartment & {
  child: SubDepartment[]
}

/** 病情描述 */
export type ConsultIllness = Pick<ConsultPartial, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>

/** 支付 */
export type ConsultOrderPreParams = Pick<ConsultPartial, 'type' | 'illnessType'>
export interface ConsultOrderPreData {
  payment: number // 需付款
  couponDeduction: number // 优惠券抵扣
  couponId: string // 优惠券ID
  pointDeduction: number // 积分抵扣
  actualPayment: number // 实际支付
}

/** 生成支付URL */
export interface ConsultPayParams {
  paymentMethod: 0 | 1 // 支付方式，0 微信  1 支付宝
  orderId: string // 订单ID
  payCallback: string // 支付回调地址
}

/** 问诊订单详情 */
export type ConsultOrderItem = Consult & {
  createTime: string // 创建时间
  orderNo: string // 订单编号
  status: ConsultOrderStatus // 订单状态
  statusValue: string // 订单状态值
  typeValue: string // 订单类型值
  countdown: number // 倒计时
  prescriptionId?: string // 处方ID
  evaluateId: number // 评价ID

  payment: number // 应付金额
  couponDeduction: number // 优惠券抵扣
  ponitDeduction: number // 积分抵扣
  actualPayment: number // 实际支付

  docInfo: Doctor // 医生信息
  patientInfo: Patient // 患者信息
}

/** 问诊订单列表-请求参数 */
export type ConsultOrderListParams = PageReq & {
  type: ConsultType // 订单类型
}
