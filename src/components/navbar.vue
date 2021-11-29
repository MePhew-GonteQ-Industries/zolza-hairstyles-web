<template>
  <div class="navbar">
    <div id="mobile-navigation-container">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt=""
      @click=toggleMobileMenu>
      <mobile-navigation :mobile-menu-active="state.mobileMenuActive" />
      <div class="mobile-menu-modal"
        :class="{ 'mobile-menu-modal-hidden' : !state.mobileMenuActive }"
        @click="toggleMobileMenu">
      </div>
    </div>
    <section class="navbar-logo">
      <router-link id="logo-link" to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt="">
      </router-link></section>
    <navigation />
  </div>
</template>

<script>
import { reactive } from 'vue';
import navigation from '@/components/navigation.vue';
import mobileNavigation from '@/components/mobileNavigation.vue';

export default {
  name: 'navbar',
  components: {
    navigation,
    mobileNavigation,
  },
  setup() {
    const state = reactive({
      mobileMenuActive: false,
    });

    function toggleMobileMenu() {
      state.mobileMenuActive = !state.mobileMenuActive;
    }

    return {
      state,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
  .mobile-menu-modal {
    display: block;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: $modal-background;
  }

  .mobile-menu-modal-hidden {
    display: none;
  }

  #hamburger-icon {
    height: 18px;
    z-index: 30;
    position: relative;
    cursor: pointer;
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
    height: 60px;
    padding: 0;
  }

  @media only screen and (min-width: 680px) {
    #mobile-navigation-container {
      display: none;
      }
    }
</style>
