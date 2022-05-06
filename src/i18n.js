import axios from 'axios';
import { createI18n } from 'vue-i18n';
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
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

function getClientLocale() {
  return (navigator.language.slice(0, 2));
}

export { getClientLocale };

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

const loadedLanguages = [initialLocale];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export async function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  axios.defaults.timeout = 1000;
  // If the language hasn't been loaded yet
  console.log('sending request');
  console.log(axios.get(`https://zolza-hairstyles.pl/api/lang/${lang}`));
  return Promise.resolve(axios.get(`https://zolza-hairstyles.pl/api/lang/${lang}`).then((res) => {
    console.log(res);
    const msgs = res.data;
    loadedLanguages.push(lang);
    i18n.setLocaleMessage(lang, msgs.default);
    setI18nLanguage(lang);
  }));
}

export default i18n;
