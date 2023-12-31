import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('swiper-' && 'Fancybox'),

      }
    }
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/assets/scss/_vars.scss" as *;',
      },
    }
  }
})
