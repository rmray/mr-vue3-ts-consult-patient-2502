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

/** 校验姓名 */
export const nameRules: FieldRule[] = [
  { required: true, message: '请输入姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '姓名必须是2-16位汉字' }
]

/** 校验身份证号 */
export const idCardRules: FieldRule[] = [
  { required: true, message: '请输入身份证号' },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号格式不正确'
  }
]
