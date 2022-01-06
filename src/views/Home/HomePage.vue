<template>
  <section class="app-page" id="homepage">
    <heroSection id='hero'></heroSection>
    <h1>{{$t('home')}}</h1>
    <language-selector />
  </section>
</template>

<script>
import heroSection from '@/views/Home/HeroSection.vue';
import languageSelector from '@/views/Settings/LanguageSelector.vue';

export default {
  name: 'HomePage',
  components: {
    heroSection,
    languageSelector,
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 25vw;
  }

  h1::selection {
    background-color: $primary-fg-color;
  }
</style>
