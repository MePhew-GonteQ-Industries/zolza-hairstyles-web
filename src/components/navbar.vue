<template>
  <div class="navbar">
    <div id="mobile-cta">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt="" @click="toggleMobileNavigation">
      <mobile-navigation id="mobile-navigation"  class="mobileNavigagtionHidden"/>
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
      document.getElementById('mobile-navigation').classList.toggle('mobileNavigagtionHidden');
      document.getElementById('mobile-navigation').classList.toggle('mobileNavigagtionVisible');
    },
  },
};
</script>

<style lang="scss" scoped>
  #mobile-cta {
    z-index: 20;
  }

  a {
    display: block;
  }

  #hamburger-icon {
    z-index: 20;
  }

  .mobileNavigagtionHidden {
    height: 0;
    width: 0;
  }

  .mobileNavigagtionVisible {
    height: 100vh;
    width: 100vw;
  }

  .navbar {
    background-color: inherit;
    display: flex;
    align-items: center;
    place-content: flex-start;
    height: 100%;
    padding: 5px;
  }

  .navbar-logo {
    z-index: 0;
    padding: 0;
  }

  .wordmark{
    transform: scale(75%);
    padding: 0;
  }

  @media only screen and (min-width: 680px) {
    #mobile-cta {
      display: none;
      }

    .wordmark {
      transform: scale(100%);
      }

    .navbar-logo {
      padding: 10px 32px;
      }
    }
</style>
