<template>
  <section class="app-page" id="home-page">
    <heroSection id='hero'></heroSection>
    <h1>{{ t('home') }}</h1>
    <language-selector />
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import heroSection from '@/views/Home/HeroSection.vue';
import languageSelector from '@/views/Settings/LanguageSelector.vue';

export default {
  name: 'HomePage',
  components: {
    heroSection,
    languageSelector,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
};
</script>

<style lang="scss" scoped>
  #home-page {
    // background-image: url('~@/assets/blob-background2.svg');
    background-size: cover;
  }

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
