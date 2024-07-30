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
        path: 'cesium',
        component: () => import('@/views/cesiumViewer.vue'),
      },
      {
        path: 'tdt',
        component: () => import('@/views/TdtViewer.vue'),
      },
      {
        path: 'gaode',
        component: () => import('@/views/GdViewer.vue'),
      },
    ]
  },
  {
    path: '/entity',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'addPoint',
        component: () => import('@/views/addPoint.vue'),
      },      
      {
        path: 'addLine',
        component: () => import('@/views/addLine.vue'),
      },
      {
        path: 'addPlane',
        component: () => import('@/views/addPlane.vue'),
      },
    ]
  },
  {
    path: '/measure',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'realTimeDisplay',
        component: () => import('@/views/realTimeDisplay.vue'),
      },      
      {
        path: 'measureDistance',
        component: () => import('@/views/measureDistance.vue'),
      },
      {
        path: 'addPlane',
        component: () => import('@/views/addPlane.vue'),
      },
    ]
  },
  {
    path: '/weather',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'rain',
        component: () => import('@/views/rain.vue'),
      },      
      {
        path: 'snow',
        component: () => import('@/views/snow.vue'),
      },
      {
        path: 'fog',
        component: () => import('@/views/fog.vue'),
      },
    ]
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

// 导出路由
export default router
