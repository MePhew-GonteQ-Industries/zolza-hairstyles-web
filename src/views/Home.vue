<template>
  <section class="app-page" id="homepage">
    <hero id='hero'></hero>
  </section>
</template>

<script>
import hero from '@/components/hero.vue';

export default {
  name: 'Home',
  components: {
    hero,
  },
};
</script>

<style lang="scss" scoped>
  #homepage {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
