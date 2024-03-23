<template>
  <nav class="navbar">
    <desktopNavigation @slide-sidebar="sidebarSlide" />
  </nav>
</template>

<script>
import { reactive } from "vue";
import desktopNavigation from "@/components/Navbar/DesktopNavigation/DesktopNavigation.vue";

export default {
  name: "navbarSection",
  components: {
    desktopNavigation,
  },
  setup(_, { emit }) {
    const state = reactive({
      mobileMenuActive: false,
    });

    const sidebarSlide = () => {
      emit("slide-sidebar");
    };

    function toggleMobileMenu() {
      state.mobileMenuActive = !state.mobileMenuActive;
    }

    return {
      state,
      toggleMobileMenu,
      sidebarSlide,
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

  @media only screen and (max-width: $md) {
    padding: 0;
  }
}

@media only screen and (max-width: $xs) {
  .navbar {
    padding: 0 0 0 10vw;
  }
}
</style>
