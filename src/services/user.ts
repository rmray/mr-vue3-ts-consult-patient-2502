import type { Result } from '@/types/base'
import type { User } from '@/types/user'
import mrRequest from '@/utils/request'

/** 用户登录-密码登录 */
export function userLoginByPassword(data: { mobile: string; password: string }) {
  return mrRequest.post<Result<User>>({
    url: '/login/password',
    data
  })
}
