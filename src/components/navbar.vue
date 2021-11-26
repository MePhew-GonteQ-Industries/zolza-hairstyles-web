<template>
  <div class="navbar">
    <div id="mobile-cta">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt="" @click="toggleMobileNavigation">
      <mobile-navigation id="mobile-navigation"  class="mobileNavigagtionHidden"/>
    </div>
    <section class="navbar-logo">
      <router-link id="logo-link" to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt="">
      </router-link></section>
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

<!--suppress CssUnusedSymbol, CssUnusedSymbol, CssUnusedSymbol -->
<style lang="scss" scoped>
  #hamburger-icon {
    z-index: 30;
    position: relative;
  }

  .mobileNavigagtionHidden {
    height: 100vh;
    width: 0;
  }

  .mobileNavigagtionVisible {
    width: 100vw;
  }

  .navbar {
    background-color: inherit;
    display: flex;
    align-items: center;
    place-content: flex-start;
    height: 80px;
    padding: 10px 10px 5px 10px;
  }

  #logo-link {
    height: 60px;
    display: block;
  }

  .navbar-logo {
    margin: 0 40px 0 30px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wordmark{
    //transform: scale(75%);
    height: 60px;
    padding: 0;
  }

  @media only screen and (min-width: 680px) {
    #mobile-cta {
      display: none;
      }

    .wordmark {
      //transform: scale(100%);
      }
    }
</style>
