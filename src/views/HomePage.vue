<template>
  <section class="app-page" id="homepage">
    <heroSection id='hero'></heroSection>
  </section>
</template>

<script>
import heroSection from '@/components/heroSection.vue';

export default {
  name: 'HomePage',
  components: {
    heroSection,
  },
};
</script>

<style lang="scss" scoped>
</style>
