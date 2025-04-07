/** 问诊类型 */
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}
/** 问诊时间 */
export enum IllnessTime {
  Week = 1,
  Month,
  HalfYear,
  More
}

/** 消息类型 */
export enum MsgType {
  MsgText = 1, // 文本消息
  MsgImage = 4, // 图片消息

  CardPatient = 21, // 患者卡片
  CardPrescription, // 处方卡片
  CardUnevaluated, // 未评价卡片
  CardEvaluated, // 已评价卡片

  Notify = 31, // 通知消息
  NotifyTip, // 温馨提示
  NotifyCancel // 取消提示
}

/** 处方状态 */
export enum PrescriptionStatus {
  Unpaid = 1, // 未支付
  Paid, // 已支付
  Invalid // 已失效
}

/** 问诊订单状态 */
export enum ConsultOrderStatus {
  ConsultUnpaid = 1, // 待支付

  // 接诊状态
  ConsultChatWaiting = 2, // 待医生接诊
  ConsultChating = 3, // 医生问诊中
  ConsultChatFinished = 4, // 医生已结束
  ConsultChatCanceled = 5, // 已取消

  // 药品订单状态
  MedicineUnpaid = 10, // 待支付
  MedicineUnsend = 11, // 已支付，待发货
  MedicineUnreceived = 12, // 已发货，待收货
  MedicineReceived = 13, // 已收货
  MedicineCanceled = 14 // 已取消
}
