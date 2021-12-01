<template>
  <div class="navbar">
    <div id="mobile-navigation-container">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt=""
      @click=toggleMobileMenu>
      <mobile-navigation
        :mobile-menu-active="state.mobileMenuActive"
        @mobile-menu-closed="toggleMobileMenu"/>
      <div class="mobile-menu-modal"
        :class="{ 'mobile-menu-modal-hidden' : !state.mobileMenuActive }"
        @click="toggleMobileMenu">
      </div>
    </div>
    <section class="navbar-logo-section">
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
.navbar {
  height: 100%;
  padding: 10px 10px 5px 10px;
  background-color: inherit;
  display: flex;
  align-items: center;

  .mobile-menu-modal {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $modal-background;
  }

  .mobile-menu-modal-hidden {
    display: none;
  }

  #hamburger-icon {
    padding: 4px;
    height: 22px;
    z-index: 30;
    position: relative;
    cursor: pointer;
  }

  .navbar-logo-section {
    margin: 0 30px 0 30px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    #logo-link {
      height: 50px;
      display: block;
      padding: 0;
    }

    .wordmark{
      height: 50px;
      padding: 0;
    }
  }
  @media only screen and (min-width: 990px){
    #mobile-navigation-container{
      display: none;
    }
  }
  // @media only screen and (max-width: 570px){
  //   .navbar-logo-section{
  //     width: 100%;
  //   }
  // }
}

</style>
