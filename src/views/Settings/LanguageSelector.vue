<template>
  <select name="lang" id="lang-selector" v-model="locale">
    <option value="pl">{{$t('settings.language-selector[0]')}}</option>
    <option value="en">{{$t('settings.language-selector[1]')}}</option>
  </select>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'LanguageSelector',
  setup() {
    const { t, locale } = useI18n({ useScope: 'global' });

    return { t, locale };
  },
};
</script>

<style lang="scss" scoped>
  select {
    width: 150px;
  }
</style>
