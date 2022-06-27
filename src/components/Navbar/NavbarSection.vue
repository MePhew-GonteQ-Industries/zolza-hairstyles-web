<template>
  <nav class="navbar">
    <desktopNavigation :data-theme="dataTheme"  @theme-toggled="toggleTheme"/>
  </nav>
</template>

<script>
import { reactive } from 'vue';
import desktopNavigation from '@/components/Navbar/DesktopNavigation/DesktopNavigation.vue';

export default {
  name: 'navbarSection',
  components: {
    desktopNavigation,
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10vw;
    height: 5rem;
  }
</style>
