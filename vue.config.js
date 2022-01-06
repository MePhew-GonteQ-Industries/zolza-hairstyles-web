module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/base.scss";',
      },
    },
  },

  pluginOptions: {
    i18n: {
      globalInjection: true,
      legacy: false,
      locale: process.env.VUE_APP_I18N_LOCALE || 'pl',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'pl',
      localeDir: 'locales',
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  /* eslint no-param-reassign: "error" */
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Zołza Hairstyles';
        return args;
      });
  },
};
