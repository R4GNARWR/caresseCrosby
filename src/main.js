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

app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
