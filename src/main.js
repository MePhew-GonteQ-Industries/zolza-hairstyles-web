import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

const { VUE_API_URL } = process.env;
axios.defaults.baseURL = VUE_API_URL;

createApp(App).use(i18n)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .mount('#app');
