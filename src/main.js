import { createApp } from "vue";
import axios from "axios";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import VWave from "v-wave";

const { VITE_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_API_URL;

const printCreatorMessage = () => {
  if (navigator.userAgent.toLowerCase().includes("chrome")) {
    const n = [
      `
    %c Made with \u2665 by MePhew & GonteQ Industries %c https://github.com/MePhew-GonteQ-Industries`,
      "color: #fff; background: #19A7CE; padding:5px 0;",
      "color: #fff; background: #1c1c1c; padding:5px 0;",
    ];
    window.console.log.apply(console, n);
  } else
    window.console &&
      window.console.log(
        "Made with \u2665 by MePhew & GonteQ Industries - https://github.com/MePhew-GonteQ-Industries",
      );
};

printCreatorMessage();

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(VCalendar, {})
  .use(VWave, {
    directive: "ripple",
  })
  .mount("#app");
