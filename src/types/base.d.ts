export interface Result<T> {
  code: number
  data: T
  message: string
  success?: boolean
}
