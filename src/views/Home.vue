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
  //#hero {
    //background-color: red;
  //}
</style>
