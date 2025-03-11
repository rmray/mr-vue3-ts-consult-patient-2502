import type { Result } from '@/types/base'
import type { CodeType, User } from '@/types/user'
import mrRequest from '@/utils/request'

/** 用户登录-密码登录 */
export function loginByPassword(data: { mobile: string; password: string }) {
  console.log(data)
  return mrRequest.post<Result<User>>({
    url: '/login/password',
    data
  })
}

/** 用户登录-验证码登录-获取验证码 */
export function getCode(data: { mobile: string; type: CodeType }) {
  return mrRequest.get<Result<{ code: string }>>({
    url: '/code',
    params: data
  })
}

/** 用户登录-验证码登录 */
export function loginByCode(data: { mobile: string; code: string }) {
  return mrRequest.post({
    url: '/login',
    data
  })
}
