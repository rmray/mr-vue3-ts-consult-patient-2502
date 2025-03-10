import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // Vant按需引入
    Components({
      // dts: false,
      resolvers: [VantResolver({ importStyle: false })]
    }),
    AutoImport({
      // dts: false,
      resolvers: [VantResolver()]
    }),

    // svg地图
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
