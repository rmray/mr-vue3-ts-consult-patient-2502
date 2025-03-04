/* 区分生产、开发环境的方法： */

// 方式一：手动切换
// const BASE_URL = 'http://codercba.com:5000'
// const TIME_OUT = 10000

// 方式二：条件判断后分别赋值
// let BASE_URL: string
// let TIME_OUT: number
// if (import.meta.env.MODE === 'production') {
//   BASE_URL = 'http://codercba.com:8000'
//   TIME_OUT = 10000
// } else {
//   BASE_URL = 'http://codercba.com:5000'
//   TIME_OUT = 10000
// }

// 方式三：读取.env文件配置
const BASE_URL = import.meta.env.VITE_BASE_URL
const TIME_OUT = import.meta.env.VITE_TIME_OUT

export { BASE_URL, TIME_OUT }
