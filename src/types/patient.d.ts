// 请求参数类型

// 返回类型
export interface Patient {
  id?: string // 患者ID
  name: string // 姓名
  age?: number // 年龄
  gender: number // 性别 1男，2女
  genderValue?: string // 性别值
  idCard: string // 身份证号
  defaultFlag: number // 是否为默认患者 1 是，0否
}
