// 请求
/** 分页请求 */
export interface PageReq {
  current: number
  pageSize: number
}

// 响应
/** 响应结果 */
export interface Result<T> {
  code: number
  data: T
  message: string
  success?: boolean
}

/** 分页响应 */
export interface PageRes<T> {
  pageTotal: number
  total: number
  rows: T
}
