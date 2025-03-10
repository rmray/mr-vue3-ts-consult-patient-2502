import type { FieldRule } from 'vant'

/** 验证手机号 */
export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

/** 验证密码 */
export const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{6,24}$/, message: '密码必须是6-24个字符' }
]
