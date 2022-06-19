import { createI18n } from 'vue-i18n';
import { usePreferredLanguages } from '@vueuse/core';
/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`,
 * which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

function getClientLocale() {
  return usePreferredLanguages()[0];
}

const initialLocale = getClientLocale() || process.env.VUE_APP_I18N_LOCALE || 'pl';

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: initialLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'pl',
  messages: loadLocaleMessages(),
  localeDir: 'locales',
  runtimeOnly: false,
  compositionOnly: false,
  fullInstall: true,
});

export default i18n;
