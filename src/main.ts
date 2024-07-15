import { createApp } from 'vue'
import App from './App.vue'

// 导入全局样式表(静态)
import '@/styles/global.css'

// 导入element-plus 样式表
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
