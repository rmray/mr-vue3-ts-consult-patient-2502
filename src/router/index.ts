import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/login.vue') },
    {
      path: '/',
      redirect: 'home',
      children: [
        { path: 'home', component: () => import('@/views/home/home.vue') },
        { path: 'article', component: () => import('@/views/article/article.vue') },
        { path: 'notify', component: () => import('@/views/notify/notify.vue') },
        { path: 'user', component: () => import('@/views/user/user.vue') }
      ]
    }
  ]
})

export default router
