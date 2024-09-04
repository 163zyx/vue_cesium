// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import path from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/variable.scss";',
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    vueSetupExtend({
      enableAutoExpose: true
    }),
  ],
  // 配置src别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 8080, //端口号
    open: true //启动后是否自动打开浏览器
  }
})
