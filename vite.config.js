import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => /^(swiper|swiper-container|swiper-slide|Fancybox)$/.test(tag),
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
