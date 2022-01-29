import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

const { VUE_APP_ENV } = process.env;
const { VUE_APP_DEV_URL } = process.env;
const { VUE_APP_PROD_URL } = process.env;

if (VUE_APP_ENV === 'DEV') {
  axios.defaults.baseURL = VUE_APP_DEV_URL;
} else if (VUE_APP_ENV === 'PROD') {
  axios.defaults.baseURL = VUE_APP_PROD_URL;
}

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

createApp(App).use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .mount('#app');
