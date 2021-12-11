<template>
  <div id="app-wrapper" :data-theme="state.theme">
    <div id="nav">
      <navbarSection @theme-toggled="toggleTheme"/>
    </div>
    <router-view class="router-view"/>
    <footer>
      <contactSection />
    </footer>
  </div>
</template>

<script>
import { reactive } from 'vue';
import navbarSection from '@/components/Navbar/navbarSection.vue';
import contactSection from '@/views/Contact/ContactSection.vue';

export default {
  components: {
    navbarSection,
    contactSection,
  },
  setup() {
    const state = reactive({
      theme: 'light',
    });

    function toggleTheme() {
      switch (state.theme) {
        case 'light':
          state.theme = 'dark';
          break;
        case 'dark':
          state.theme = 'light';
          break;
        default:
          console.error('Theme was in an incorrect state');
      }
    }

    return {
      state,
      toggleTheme,
    };
  },
};

</script>

<style lang="scss">
  #app {

    #app-wrapper {

      #nav {
        position: sticky;
        top: 0;
        height: 8vh;
        z-index: 10;
      }

      .router-view {
        min-height: 85vh;
      }

      footer {
        height: 7vh;
        width: 100vw;
        padding: 5px 10% 0 10%;
        background-color: $background-accent-color;

        @media only screen and (max-width: 645px) {
          & {
            padding: 5px 5% 0 5%;
          }
        }

        @media only screen and (max-width: 570px) {
          & {
            padding: 2px 1% 0 1%;
          }
        }
      }
    }
  }
</style>
