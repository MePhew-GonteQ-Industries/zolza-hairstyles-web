import { createI18n } from "vue-i18n";
import { usePreferredLanguages } from "@vueuse/core";
import messages from "@intlify/unplugin-vue-i18n/messages";

function getClientLocale() {
  return usePreferredLanguages()[0];
}

const initialLocale = getClientLocale() || import.meta.env.VITE_I18N_LOCALE || "pl";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "pl",
  availableLocales: ["[pl]", "en"],
  messages,
  runtimeOnly: false,
  compositionOnly: false,
  fullInstall: true,
});

export default i18n;
