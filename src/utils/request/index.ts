import MrRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '../cache'

// console.log(BASE_URL, TIME_OUT)

const mrRequest = new MrRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 实例拦截器-使用
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      const { user } = localCache.getItem('user')
      const token = user?.token
      // console.log('token', token, user)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    },
    requestInterceptorCatch: (err: any) => err,
    responseInterceptor: (res) => res,
    responseInterceptorCatch: (err) => err
  }
})

export default mrRequest

// 测试请求
// mrRequest
//   .request<HomeData>({
//     url: '/home/multidata',

//     // 请求拦截器-使用
//     interceptors: {
//       requestInterceptor: (config) => {
//         // console.log('请求拦截器: requestInterceptor')
//         return config
//       },
//       requestInterceptorCatch: (err: any) => {
//         // console.log('请求拦截器: requestInterceptorCatch')
//         return err
//       },
//       responseInterceptor: (res) => {
//         // console.log('请求拦截器: responseInterceptor')
//         return res
//       },
//       responseInterceptorCatch: (err) => {
//         // console.log('请求拦截器: responseInterceptorCatch')
//         return err
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
