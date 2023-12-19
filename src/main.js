import { createApp } from 'vue'
import router from './router/router'
import store from './store/store'
import App from './App.vue'

import API from './api/api'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import {aliases, mdi } from 'vuetify/iconsets/mdi'
import VueLazyload from 'vue-lazyload'
// Fancybox

import "@fancyapps/ui/dist/fancybox/fancybox.css";


// Styles

import './assets/scss/_style.scss';

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


API.init();
app.config.globalProperties.$API = API
app.use(store)
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/img/loading.gif',
  attempt: 1,
})
app.use(vuetify)
app.use(router)
app.mount('#app')
