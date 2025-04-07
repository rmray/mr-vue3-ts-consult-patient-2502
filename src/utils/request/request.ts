import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { MrAxiosRequestConfig } from './type'

class MrRequest {
  instance: AxiosInstance
  constructor(config: MrAxiosRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('res: ', res)
        // if (res.data.code !== 10000) {
        //   // Promise.reject(new Error('请求失败'))
        //   throw new Error(`请求出错，需要被捕获！${res.data}`)
        // }
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  request<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    // 请求拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise<R>((resolve, reject) => {
      // console.log(config)
      this.instance
        .request<any, R>(config)
        .then((res) => {
          // console.log(res)
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          // console.log(err)
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err)
        })
    })
  }

  get<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    return this.request<R>({ ...config, method: 'GET' })
  }

  post<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    return this.request<R>({ ...config, method: 'POST' })
  }

  delete<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    return this.request<R>({ ...config, method: 'DELETE' })
  }

  patch<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    return this.request<R>({ ...config, method: 'PATCH' })
  }

  put<R = any>(config: MrAxiosRequestConfig<AxiosRequestConfig, R>) {
    return this.request<R>({ ...config, method: 'PUT' })
  }
}

export default MrRequest
