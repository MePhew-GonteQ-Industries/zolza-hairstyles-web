import axios from "axios";
import { useNavigatorLanguage } from "@vueuse/core";
import i18n from "@/i18n";

export default {
  state: {
    theme: "",
    language: "",
    defaultsLoaded: false,
  },

  getters: {
    settingsLoaded(state) {
      if (!state.theme) return false;
      if (!state.language) return false;
      return true;
    },
  },

  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLanguage(state, language) {
      const languageCode = language.substr(0, 2);
      document.documentElement.setAttribute("lang", languageCode);
      i18n.global.locale.value = languageCode;
      state.language = languageCode;
    },
    setDefaultsLoaded(state, value) {
      state.defaultsLoaded = value;
    },
  },

  actions: {
    loadDefaultSettings({ getters, commit }) {
      if (!getters.settingsLoaded) {
        const prefersDarkMode =
          window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = prefersDarkMode ? "dark" : "light";
        commit("setTheme", theme);
        const navigatorLanguage = useNavigatorLanguage();
        commit("setLanguage", navigatorLanguage.language.value);
        commit("setDefaultsLoaded", true);
      }
    },

    async loadSettings({ state, getters, commit }) {
      if (!getters.settingsLoaded || state.defaultsLoaded) {
        const response = await axios.get("settings");
        const { settings } = response.data;
        const theme = settings.find((setting) => setting.name === "preferred_theme").current_value;
        const language = settings.find((setting) => setting.name === "language").current_value;
        commit("setTheme", theme);
        commit("setLanguage", language);
        commit("setDefaultsLoaded", false);
      }
    },
  },
};
