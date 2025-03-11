import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface MrInterceptors<R, T> {
  requestInterceptor?: (config: R) => R
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface MrAxiosRequestConfig<R = InternalAxiosRequestConfig, T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MrInterceptors<R, T>
}

interface HomeData {
  code: number
  data?: any[]
}
