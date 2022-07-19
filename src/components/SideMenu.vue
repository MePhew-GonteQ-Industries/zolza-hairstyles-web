<template>
  <nav class="menu" ref="menu">
    <router-link
      v-for="(link, index) in links"
      :key="link.id"
      :to="{ name: link.toName }"
      @click="changeOffset(index)"
    >
      <span><i :class="link.iconClass"></i>{{ link.text }}</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>
    <div class="active-tab-indicator"></div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { setCssPropertyValue } from '@/utils';

export default {
  name: 'SideMenu',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const menu = ref(null);

    const changeOffset = (index) => {
      setCssPropertyValue(menu.value, '--offset', `${88 * index}px`);
    };

    return {
      menu,
      changeOffset,
    };
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
  --offset: 0;
  $offset: var(--offset);

  & a.router-link-exact-active ~ .active-tab-indicator {
    opacity: 1;
  }

  .active-tab-indicator {
    height: 15px;
    width: 15px;
    position: absolute;
    top: 138px;
    left: -8px;
    border-radius: 100%;
    background-color: $accent-color;
    opacity: 0;
    transition-property: transform, opacity;
    transform: translateY(calc($offset * -3));
    z-index: 600;
    transform: translateY($offset);
  }

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
</style>>
