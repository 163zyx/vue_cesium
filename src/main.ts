import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 导入全局样式表(静态)
import '@/styles/global.css'

// 导入element-plus 样式表
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'

import "cesium/Build/Cesium/Widgets/widgets.css";

import * as Cesium from "cesium";

(window as any).CESIUM_BASE_URL = "/Cesium"; 

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiM2Y1Y2E1ZS1jMGE5LTQxZmEtOWUxYS04ZDZmYzk2NTQ5YTkiLCJpZCI6MTI3OTQzLCJpYXQiOjE3MjEwOTgxMzN9.afzXMWyvqKIqBgx6ejQpxjKGoZWXcAg4Kyipd7UX1Io";


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
