import type { MsgType, PrescriptionStatus } from '@/enum'
import type { Consult, Image } from './consult'
import type { Patient } from './patient'

/** 药品 */
export interface Medical {
  id: string // 药品ID
  name: string // 药品名称
  amount: string // 金额
  avatar: string // 药品图片
  specs: string // 规格
  usageDosag: string // 用法用量
  quantity: string // 数量
  prescriptionFlag: 0 | 1 // 是否处方药
}

/** 处方 */
export interface Prescription {
  id: string // 处方ID
  createTime: string // 创建时间

  orderId: string // 订单ID
  recordId: string // 问诊记录ID

  name: string // 患者名称
  gender: 0 | 1 // 性别，0：女，1：男
  genderValue: string // 性别值
  age: string // 年龄
  diagnosis: string // 诊断信息

  status: PrescriptionStatus // 处方状态
  medicines: Medical[] // 药品列表
}

/** 评价 */
export interface EvaluateDoc {
  id?: string // 评价ID
  createTime?: string // 创建时间
  content?: string // 内容
  score?: number // 评分
  creator?: string // 创建者
}

/** 消息 */
export interface Message {
  id: string // 消息ID
  msgType: MsgType // 消息类型
  createTime: string // 创建时间

  from?: string // 发送者
  fromAvatar?: string // 发送者头像
  to?: string // 接收者
  toAvatar?: string // 接收者头像

  msg: {
    content?: string // 文本内容
    picture?: Image // 图片消息
    // 问诊记录
    consultRecord?: Consult & {
      patientInfo: Patient
    }
    prescription?: Prescription // 处方信息
    evaluateDoc?: EvaluateDoc // 评价信息
  }
}

/** 消息分组列表 */
export type TimeMessages = {
  sid: string // 会话ID
  createTime: string // 创建时间
  orderId: string // 订单ID

  items: Message[] // 消息列表
}

/** 评价问诊订单请求参数 */
export interface EvaluateParams {
  docId: string // 评价的医生ID
  orderId: string // 订单ID
  score: number // 评分
  content: string // 评价内容
  anonymousFlag: 0 | 1 // 是否匿名，1：匿名，0：不匿名
}
