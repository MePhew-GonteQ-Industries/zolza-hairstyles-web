<template>
  <div
      id="app-wrapper"
      :data-theme="state.theme">
    <div id="nav">
      <navbarSection :data-theme="state.theme" @theme-toggled="toggleTheme"/>
    </div>
    <router-view class="router-view"/>
    <footer>
      <contactSection />
    </footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, onMounted } from 'vue';
import navbarSection from '@/components/Navbar/NavbarSection.vue';
import contactSection from '@/views/Contact/ContactSection.vue';

export default {
  components: {
    navbarSection,
    contactSection,
  },
  setup() {
    const store = useStore();

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme;

    if (prefersDarkMode) {
      theme = 'dark';
    } else {
      theme = 'light';
    }

    const state = reactive({
      theme,
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

    onMounted(() => {
      store.dispatch('loadUser');
    });

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
      height: 100vh;

      #nav {
        position: sticky;
        top: 0;
        height: 8%;
        min-height: 50px;
        max-height: 75px;
        z-index: 10;
      }

      .router-view {
        min-height: 85%;
      }

      footer {
        height: 7%;
        background-color: $accent-bg-color;
      }
    }
  }
</style>
