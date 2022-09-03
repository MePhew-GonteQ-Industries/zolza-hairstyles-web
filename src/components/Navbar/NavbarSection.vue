<template>
  <nav class="navbar">
    <desktopNavigation
    @slide-sidebar="sidebarSlide"/>
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
  methods: {
    sidebarSlide() {
      this.$emit('slide-sidebar');
    },
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10vw;
    height: 100%;
  }

  @media only screen and (max-width: $xs){
    .navbar{
      padding: 0 0 0 10vw;
    }
  }
</style>
