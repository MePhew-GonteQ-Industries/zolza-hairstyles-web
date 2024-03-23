<template>
  <nav class="menu">
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="{ name: link.toName }"
    >
      <span><i :class="link.iconClass"></i>{{ link.text }}</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
      <div class="active-tab-indicator"></div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: $secondary-color;
  color: $accent-text-color;
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  justify-content: center;
  height: calc(100vh - 6rem);
  width: 100%;
  position: relative;

  a {
    color: $accent-text-color;
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1rem;
    transition: none;
    margin-bottom: 1rem;

    .active-tab-indicator {
      left: -5px;
      height: 15px;
      width: 15px;
      position: absolute;
      border-radius: 100%;
      background-color: $accent-color;
      opacity: 0;
      z-index: 600;
    }

    &:hover,
    &.router-link-exact-active {
      background-color: $primary-color;

      i {
        background-color: $secondary-color;
      }

      .edge {
        content: "";
        height: 30px;
        width: 30px;
        position: absolute;
        bottom: -28px;
        right: -2px;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          bottom: -12px;
          left: -12px;
          width: 40px;
          height: 40px;
          box-shadow: 0 0 0 250px $primary-color;
          border-radius: 30%;
        }

        &.top {
          top: -28px;

          &::after {
            top: -12px;
          }
        }
      }
    }

    &.router-link-exact-active {
      color: $accent-color;

      .active-tab-indicator {
        opacity: 1;
      }
    }

    * {
      transition: none;
    }

    span {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 200px;
      font-family: "Open Sans", sans-serif;
    }

    i {
      font-size: 1.5rem;
      background-color: $primary-color;
      padding: 0.5rem;
      border-radius: 35%;
    }
  }
}
</style>
>
