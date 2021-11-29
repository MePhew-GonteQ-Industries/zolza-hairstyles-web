<template>
  <div class="navbar">
    <div id="mobile-cta">
      <img id="hamburger-icon" src="@/assets/menu.svg" alt="" @click="toggleMobileNavigation">
      <mobile-navigation id="mobile-navigation"  class="mobileNavigagtionHidden"/>
      <div id="modal-overlay" class="hide-modal-overlay" @click="toggleMobileNavigation"></div>
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
      document.getElementById('modal-overlay').classList.toggle('hide-modal-overlay');
      document.getElementById('modal-overlay').classList.toggle('show-modal-overlay');
    },
  },
};
</script>

<style lang="scss" scoped>
  #modal-overlay {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    transition: all 100ms ease-in;
  }

  .hide-modal-overlay {
    //display: none;
    background-color: rgba(0, 0, 0, 0);
    visibility: hidden;
  }

  .show-modal-overlay {
    //display: block;
    visibility: visible;
    background-color: rgba(0, 0, 0, .75);
  }

  #hamburger-icon {
    z-index: 30;
    position: relative;
    cursor: pointer;
  }

  .mobileNavigagtionHidden {
    height: 100vh;
    width: 0;
  }

  .mobileNavigagtionVisible {
    width: 50vw;
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
    transform: scale(.75);
    height: 60px;
    padding: 0;
  }

  @media only screen and (min-width: 680px) {
    #mobile-cta {
      display: none;
      }

    .wordmark {
      transform: scale(1);
      }
    }
</style>
