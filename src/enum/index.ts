/** 问诊类型 */
export enum ConsultType {
  /** 找医生 */ Doctor = 1,
  /** 急速问诊 */ Fast = 2,
  /** 开药问诊 */ Medication = 3
}
/** 问诊时间 */
export enum IllnessTime {
  /** 一周 */ Week = 1,
  /** 一月 */ Month,
  /** 半年 */ HalfYear,
  /** 半年以上 */ More
}

/** 消息类型 */
export enum MsgType {
  /** 文本消息 */ MsgText = 1,
  /** 图片消息 */ MsgImage = 4,

  /** 患者卡片 */ CardPatient = 21,
  /** 处方卡片 */ CardPrescription,
  /** 未评价卡片 */ CardUnevaluated,
  /** 已评价卡片 */ CardEvaluated,

  /** 通知消息 */ Notify = 31,
  /** 温馨提示 */ NotifyTip,
  /** 取消提示 */ NotifyCancel
}

/** 处方状态 */
export enum PrescriptionStatus {
  /** 未支付 */ Unpaid = 1,
  /** 已支付 */ Paid,
  /** 已失效 */ Invalid
}

/** 问诊订单状态 */
export enum ConsultOrderStatus {
  /** 待支付 */ ConsultUnpaid = 1,

  // 接诊状态
  /** 待医生接诊 */ ConsultChatWaiting = 2,
  /** 医生问诊中 */ ConsultChating = 3,
  /** 医生已结束 */ ConsultChatFinished = 4,
  /** 已取消 */ ConsultChatCanceled = 5,

  // 药品订单状态
  /** 待支付 */ MedicineUnpaid = 10,
  /** 已支付，待发货 */ MedicineUnsend = 11,
  /** 已发货，待收货 */ MedicineUnreceived = 12,
  /** 已收货 */ MedicineReceived = 13,
  /** 已取消 */ MedicineCanceled = 14
}
