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
    config.plugin('define').tap((definitions) => {
      definitions[0] = Object.assign(definitions[0], {
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
      });
      return definitions;
    });
  },
};
