import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

const { VUE_APP_API_URL } = process.env;
axios.defaults.baseURL = VUE_APP_API_URL;

createApp(App).use(i18n)
  .use(store)
  .use(router)
  .mount('#app');
