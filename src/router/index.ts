import {createRouter, createWebHistory} from 'vue-router'
// RouteRecordRaw 内置的接口类型
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw>= [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    component: Home,
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

// 导出路由
export default router
