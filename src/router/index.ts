import {createRouter, createWebHistory} from 'vue-router'
// RouteRecordRaw 内置的接口类型
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw>= [
  {
    path:'/',
    redirect:'/home'
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

// 导出路由
export default router
