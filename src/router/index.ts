import {createRouter, createWebHistory} from 'vue-router'
// RouteRecordRaw 内置的接口类型
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw>= [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/cesium',
        component: () => import('@/views/cesiumViewer.vue'),
      }
    ]
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

// 导出路由
export default router
