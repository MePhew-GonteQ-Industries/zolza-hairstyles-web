<template>
  <section class="app-page" id="home-page">
    Witamy w Zołza Hairstyles - umów się na wizytę już niebawem! (mam nadzieję)
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'HomePage',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
};
</script>

<style lang="scss" scoped>
  a {
    color: white;
    font-size: 4rem;
  }

  h1 {
    font-size: 25vw;
  }

  h1::selection {
    background-color: $primary-fg-color;
  }
</style>
