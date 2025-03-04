import axios from 'axios'
import { showToast } from 'vant'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

interface MrInterceptors<T> {
  requestSuccess?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailure?: (err: any) => any
  responseSuccess?: (res: T) => T
  responseFailure?: (err: any) => any
}
export interface MrRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MrInterceptors<T>
}

class MrRequest {
  instance: AxiosInstance

  /* 构造方法 */
  constructor(config: MrRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局-请求-拦截成功')
        return config
      },
      (err) => {
        // console.log('全局-请求-拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局-响应-拦截成功')
        // 响应成功，业务失败
        if (res.data.code !== 10000) {
          showToast(res.data.message || '业务失败！') // 弹出提示
          throw new Error(res.data.message)
        }
        return res.data
      },
      (err) => {
        // console.log('全局-响应-拦截失败')

        // 401错误，token失效
        if (err.response?.status === 401) {
          // 1. 删除用户信息
          const userStore = useUserStore()
          userStore.delUser()
          // 2. 跳转到登录页面
          const router = useRouter()
          router.push({
            path: '/login',
            query: {
              redirect: router.currentRoute.value.fullPath
            }
          })
        }
        return err
      }
    )

    // 实例拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(config.interceptors.requestSuccess, config.interceptors.requestFailure)
      this.instance.interceptors.response.use(config.interceptors.responseSuccess, config.interceptors.responseFailure)
    }
  }

  /* 封装request方法 */
  request<T = any>(config: MrRequestConfig<T>) {
    // 单次拦截器
    if (config.interceptors?.requestSuccess) {
      config.interceptors.requestSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          resolve(res)
        },
        (err) => {
          if (config.interceptors?.responseFailure) {
            config.interceptors.responseFailure(err)
          }
          reject(err)
        }
      )
    })
  }

  /* 封装get方法 */
  get<T = any>(config: MrRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  /* 封装post方法 */
  post<T = any>(config: MrRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  /* 封装patch方法 */
  patch<T = any>(config: MrRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }

  /* 封装delete方法 */
  put<T = any>(config: MrRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }

  /* 封装delete方法 */
  delete<T = any>(config: MrRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default MrRequest
