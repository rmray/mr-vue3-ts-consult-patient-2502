import { useUserStore } from '@/store'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 1. 进度条-取消转圈动画
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('@/views/layout/layout.vue'),
      children: [
        { path: 'home', meta: { title: '首页' }, component: () => import('@/views/home/home.vue') },
        { path: 'article', meta: { title: '健康百科' }, component: () => import('@/views/article/article.vue') },
        { path: 'notify', meta: { title: '消息通知' }, component: () => import('@/views/notify/notify.vue') },
        { path: 'user', meta: { title: '我的' }, component: () => import('@/views/user/user.vue') }
      ]
    },
    { path: '/login', meta: { title: '登录' }, component: () => import('@/views/login/login.vue') },
    { path: '/patient', meta: { title: '家庭档案' }, component: () => import('@/views/patient/patient.vue') },
    { path: '/consult', meta: { title: '问诊' }, component: () => import('@/views/consult/consult.vue') },
    { path: '/order', meta: { title: '订单' }, component: () => import('@/views/order/order.vue') }
  ]
})

// 前置导航守卫
router.beforeEach((to: RouteLocationNormalized) => {
  // 1. 进度条-开始动画
  NProgress.start()

  // 2. 访问权限控制
  // 注意：此处使用store，需要在导航守卫中初始化store，否则会报错
  const userStore = useUserStore() // 获取用户信息
  const whiteList = ['/login'] // 白名单，不需要登录的页面
  const user = userStore.user
  if (!user?.token && !whiteList.includes(to.path)) return '/login'
})

// 后置导航守卫
router.afterEach((to: RouteLocationNormalized) => {
  // 1. 进度条-结束动画
  NProgress.done()

  // 3. 设置页面标题
  const title = to.meta?.title
  document.title = title ? `${title} - 优医问诊` : '优医问诊'
})

export default router
