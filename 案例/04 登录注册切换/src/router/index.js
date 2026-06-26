import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',  // 访问根路径时重定向到登录页
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue'),
    }
  ],
})

export default router
