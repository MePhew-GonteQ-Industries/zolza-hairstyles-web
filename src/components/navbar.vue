<template>
  <div class="navbar">
    <img id="mobile-cta" class="hamburger-icon" src="@/assets/menu.svg" alt="">
    <section class="navbar-logo">
      <router-link to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt=""></router-link>
    </section>
    <navigation />
  </div>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
  name: 'navbar',
  components: {
    navigation,
  },
};
</script>

<style lang="scss" scoped>
  .navbar {
    background-color: inherit;
    display: flex;
    align-items: center;
    place-content: flex-start;
    height: 100%;
    padding: 5px;
  }

  @media only screen and (max-width: 600px) {
    .navigation {
      display: none;
    }
  }

  @media only screen and (min-width: 600px) {
    #mobile-cta {
      display: none;
    }
  }

</style>
