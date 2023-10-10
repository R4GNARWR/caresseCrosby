import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import {aliases, mdi } from 'vuetify/iconsets/mdi'

// Fancybox

import "@fancyapps/ui/dist/fancybox/fancybox.css";

// yandex map

import YmapPlugin from 'vue-yandex-maps'
const mapSettings = {
  apiKey: '453f5758-6290-4de4-bae1-d645fb102e5c', // Индивидуальный ключ API
  lang: 'ru_RU', // Используемый язык
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1' // Версия Я.Карт
}

// Styles

import './assets/scss/_style.scss';

const pinia = createPinia()
const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
  })

app.use(YmapPlugin, mapSettings)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
