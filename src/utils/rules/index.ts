import type { FieldRule } from 'vant'

/** 校验手机号 */
export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

/** 校验密码 */
export const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{6,24}$/, message: '密码必须是6-24个字符' }
]

/** 校验验证码 */
export const codeRules: FieldRule[] = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码必须是6位数字' }
]
