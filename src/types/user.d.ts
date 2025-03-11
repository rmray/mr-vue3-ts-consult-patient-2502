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
