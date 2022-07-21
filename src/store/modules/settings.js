export default {
  state: {
    theme: 'dark',
    language: 'pl',
  },

  getters: {
  },

  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLanguage(state, language) {
      document.documentElement.setAttribute('lang', language);
      state.language = language;
    },
  },

  actions: {
  },
};
