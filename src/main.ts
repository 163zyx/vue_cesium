import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 导入全局样式表(静态)
import '@/styles/global.css'

// 导入element-plus 样式表
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'

// 引入cesium
import * as Cesium from 'cesium'


// window.CESIUM_BASE_URL = "/cesium";
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODJlMmFiZC0xNTIyLTQ4ZTEtOWU1Zi0yMzczZTY5ZTc1ZWYiLCJpZCI6MTI3OTQzLCJpYXQiOjE2NzgzNDQ0MjR9.aowNZ19N7EJ1bmsvJ_mSnVDQsVdT9pzxwU-apT1P_6A"

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
