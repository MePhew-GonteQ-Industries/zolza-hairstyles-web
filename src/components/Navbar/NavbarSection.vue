<template>
  <div class="navbar">
    <div id="mobile-navigation-container">
      <img id="hamburger-icon" src="@/assets/nav/hamburger_icon.svg" alt="Menu"
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
    <section class="navbar-logo-section">
      <router-link id="logo-link" to="/"><img class="wordmark" src="@/assets/wordmark.svg" alt="">
      </router-link>
    </section>
    <desktopNavigation :data-theme="dataTheme"  @theme-toggled="toggleTheme"/>
  </div>
</template>

<script>
import { reactive } from 'vue';
import desktopNavigation from '@/components/Navbar/DesktopNavigation/DesktopNavigation.vue';
import mobileNavigation from '@/components/Navbar/MobileNavigation.vue';

export default {
  name: 'navbarSection',
  components: {
    desktopNavigation,
    mobileNavigation,
  },
  props: ['dataTheme'],
  setup(_props, ctx) {
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
    padding: 10px;
    background-color: $accent-bg-color;
    display: flex;
    align-items: center;

    .mobile-menu-modal {
      position: absolute;
      z-index: 5;
      display: block;
      top: 8vh;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: $modal-bg-color;
    }

    .hide {
      display: none;

      @media only screen and (min-width: 941px) {
        display: flex;
      }
    }

    .show {
      display: flex;
    }

    #hamburger-icon {
      user-select: none;
      padding: 4px;
      height: 22px;
      z-index: 30;
      position: relative;
      cursor: pointer;
      filter: $logo-filter;
    }

    .navbar-logo-section {
      user-select: none;
      margin: 0 30px 0 30px;
      padding: 0;
      align-items: center;
      justify-content: left;

      @media only screen and (max-width: 940px) {
        & {
          width: 100%;
          justify-content: center;
        }
      }

      #logo-link {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .wordmark{
        height: 50px;
        filter: $logo-filter;

        @media only screen and (max-height: 720px) {
          height: 35px;
        }
      }
    }
    @media only screen and (min-width: 941px){
      #mobile-navigation-container{
        display: none;
      }
    }
  }
</style>
