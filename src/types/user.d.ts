// 请求参数类型

/** 验证码类型 */
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

// 返回类型

/** 用户类型 */
export interface User {
  token: string // 令牌
  id: string // 用户ID
  account: string // 账号
  mobile: string // 手机号
  avatar: string // 头像
  refreshToken: string // 刷新令牌
}

type OmitUser = Omit<User, 'token' | 'refreshToken'>
export type UserInfo = OmitUser & {
  likeNumber: number // 关注数量
  collectionNumber: number // 收藏数量
  score: number // 我的总积分
  couponNumber: number // 我的优惠券数量
  consultationInfo: any[] // 问诊中信息
  orderInfo: {
    paidNumber: number // 待付款
    receivedNumber: number // 待发货
    shippedNumber: number // 待收货
    finishedNumber: number // 已完成
  }
}
