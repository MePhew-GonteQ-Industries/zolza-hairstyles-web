import { createApp } from "vue";
import axios from "axios";
import { SetupCalendar } from "v-calendar";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import VWave from "v-wave";

const { VITE_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_API_URL;

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(SetupCalendar, {})
  .use(VWave, {
    directive: "ripple",
  })
  .mount("#app");
