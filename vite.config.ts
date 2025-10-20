import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// 定义一个函数 `r`，用于解析相对路径
export const r = (...args: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), ...args)

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`, // 设置别名 `~/` 为 `src/` 目录
    },
  },

  plugins: [
    react(),
    UnoCSS(),
  ],

  server: {
    port: 7321,
    watch: {
      // 排除特定的文件夹或文件
      ignored: ['**/data/*', '**/node_modules/*'],
    },
  },

  build: {
    emptyOutDir: true, // 是否清空输出目录
    minify: 'terser', // 使用 Terser 进行代码压缩
    outDir: r('dist'),
    rollupOptions: {
      input: r('src/index.html'),
    },
    sourcemap: false, // 是否生成 source map
  },
})
