/* eslint-disable */

import { createApp } from 'vue';
import axios from 'axios';
import { SetupCalendar } from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import VWave from 'v-wave';

const { VUE_APP_API_URL } = process.env;
axios.defaults.baseURL = VUE_APP_API_URL;

createApp(App).use(i18n)
  .use(store)
  .use(router)
  .use(SetupCalendar, {})
  .use(VWave, {
    directive: 'ripple',
  })
  .mount('#app');
