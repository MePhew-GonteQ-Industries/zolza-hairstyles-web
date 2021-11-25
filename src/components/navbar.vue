<template>
  <div class="navbar">
    <div id="mobile-cta">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt="" @click="toggleMobileNavigation">
      <mobile-navigation id="mobile-navigation"  class="hidden"/>
    </div>
    <section class="navbar-logo">
      <router-link to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt=""></router-link>
    </section>
    <navigation />
  </div>
</template>

<script>
import navigation from '@/components/navigation.vue';
import mobileNavigation from '@/components/mobileNavigation.vue';

export default {
  name: 'navbar',
  components: {
    navigation,
    mobileNavigation,
  },
  methods: {
    toggleMobileNavigation() {
      document.getElementById('mobile-navigation').classList.toggle('hidden');
      document.getElementById('mobile-navigation').classList.toggle('displayed');
    },
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

  .navbar-logo{
    padding: 10px 32px;
  }

  @media only screen and (max-width: 520px) {
    .navigation {
      display: none;
    }
  }

  @media only screen and (min-width: 680px) {
    #mobile-cta {
      display: none;
    }
  }

</style>
