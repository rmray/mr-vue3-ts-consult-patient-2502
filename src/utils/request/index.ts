import type { InternalAxiosRequestConfig } from 'axios'

import MrRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '../cache'

const mrRequest = new MrRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 实例拦截器
  interceptors: {
    requestSuccess(config) {
      // 携带token
      const token = localCache.getCache('user')?.token ?? ''
      if (config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config as InternalAxiosRequestConfig
    },
    requestFailure(err) {
      // console.log('实例-请求-拦截失败')
      return err
    },
    responseSuccess(res) {
      // console.log('实例-响应-拦截成功')
      return res
    },
    responseFailure(err) {
      // console.log('实例-响应-拦截失败')
      return err
    }
  }
})

export default mrRequest
