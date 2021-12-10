<template>
  <div class="navbar">
    <div id="mobile-navigation-container">
      <img id="hamburger-icon" src="@/assets/hamburger_icon.svg" alt=""
           @click=toggleMobileMenu
           :aria-expanded="state.mobileMenuActive"
           aria-controls="navbarSupportedContent"
           aria-label="Toggle navigation">
      <mobile-navigation
        :mobile-menu-active="state.mobileMenuActive"
        @mobile-menu-closed="toggleMobileMenu"/>
      <div class="mobile-menu-modal"
        :class="{ 'hide' : !state.mobileMenuActive }"
        @click="toggleMobileMenu">
      </div>
    </div>
    <section class="navbar-logo-section"
        :class="{'hide' : state.mobileMenuActive,
                 'show' : !state.mobileMenuActive}">
      <router-link id="logo-link" to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt="">
      </router-link>
    </section>
    <desktopNavigation @theme-toggled="toggleTheme"/>
  </div>
</template>

<script>
import { reactive } from 'vue';
import desktopNavigation from '@/components/desktopNavigation.vue';
import mobileNavigation from '@/components/mobileNavigation.vue';

export default {
  name: 'navbarSection',
  components: {
    desktopNavigation,
    mobileNavigation,
  },
  setup(props, ctx) {
    const state = reactive({
      mobileMenuActive: false,
    });

    function toggleMobileMenu() {
      state.mobileMenuActive = !state.mobileMenuActive;
    }

    function toggleTheme() {
      ctx.emit('theme-toggled');
    }

    return {
      state,
      toggleMobileMenu,
      toggleTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  padding: 10px 10px 5px 10px;
  background-color: $background-accent-color;
  display: flex;
  align-items: center;

  .mobile-menu-modal {
    position: absolute;
    z-index: 5;
    display: block;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $modal-background;
  }

  .hide {
    display: none;
  }

  .show {
    display: flex;
  }

  #hamburger-icon {
    padding: 4px;
    height: 22px;
    z-index: 30;
    position: relative;
    cursor: pointer;
    filter: $logo-filter;
  }

  .navbar-logo-section {
    margin: 0 30px 0 30px;
    padding: 0;
    align-items: center;
    justify-content: left;

    @media only screen and (max-width: 900px) {
      & {
        width: 100%;
        justify-content: center;
      }
    }

    #logo-link {
      height: 50px;
      display: block;
      padding: 0;
    }

    .wordmark{
      height: 50px;
      filter: $logo-filter;
    }
  }
  @media only screen and (min-width: 900px){
    #mobile-navigation-container{
      display: none;
    }
  }
}

</style>
