<template>
  <div
    class="hamburger-icon"
    :class="{ 'nav-active': navbarActive }"
    @click="sidebarSlide"
  >
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
  </div>
</template>

<script>
export default {
  name: "CustomHarburgerIcon",
  props: {
    navbarActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["slide-sidebar"],
  setup(_, { emit }) {
    const sidebarSlide = () => {
      emit("slide-sidebar");
    };

    return {
      sidebarSlide,
    };
  },
};
</script>

<style lang="scss" scoped>
.hamburger-icon {
  flex-flow: column;
  z-index: 2500;
  display: flex;

  div {
    width: 25px;
    height: 2px;
    background-color: $accent-color;
    margin: 5px;
    border-radius: 50px;
    transition: all 0.3s ease;
  }
}

.nav-active {
  .line1 {
    transform: rotate(-45deg) translate(-8px, 2px);
  }

  .line2 {
    opacity: 0;
  }

  .line3 {
    transform: rotate(45deg) translate(-8px, -2px);
  }
}
</style>
