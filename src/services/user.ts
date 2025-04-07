import type { Result } from '@/types/base'
import type { CodeType, User, UserInfo } from '@/types/user'
import mrRequest from '@/utils/request'

/** 用户登录-密码登录 */
export function loginByPassword(data: { mobile: string; password: string }) {
  return mrRequest.post<Result<User>>({ url: '/login/password', data })
}

/** 用户登录-验证码登录-获取验证码 */
export function getCode(data: { mobile: string; type: CodeType }) {
  return mrRequest.get<Result<{ code: string }>>({ url: '/code', params: data })
}

/** 用户登录-验证码登录 */
export function loginByCode(data: { mobile: string; code: string }) {
  return mrRequest.post({ url: '/login', data })
}

/** 获取用户信息 */
export function getUserInfo() {
  return mrRequest.get<Result<UserInfo>>({ url: '/patient/myUser' })
}

/** 获取未读消息数量 */
export function getUnreadMessageCount() {
  return mrRequest.get<Result<number>>({ url: '/patient/message/unRead/all' })
}
