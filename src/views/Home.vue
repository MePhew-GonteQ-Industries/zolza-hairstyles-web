<template>
  <div id="homepage">
    <hero id='hero'></hero>
  </div>
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
    background-color: chocolate;
  }
</style>
