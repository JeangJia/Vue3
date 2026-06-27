import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue'),
      meta: { hideLayout: true },
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: '数据概览' },
    },
    {
      path: '/content',
      component: () => import('@/views/contentList.vue'),
      meta: { title: '内容管理' },
    },
    {
      path: '/content/new',
      component: () => import('@/views/contentEdit.vue'),
      meta: { title: '内容发布' },
    },
    {
      path: '/content/:id',
      component: () => import('@/views/contentEdit.vue'),
      meta: { title: '编辑内容' },
    },
  ],
})

export default router
