<template>
  <nav class="menu" ref="menu">
    <router-link v-for="link in links" :key="link.id" :to="{ name: link.toName }">
      <span><i :class="link.iconClass"></i>{{ link.text }}</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>
    <div class="active-tab-indicator"></div>
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SideMenu",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const menu = ref(null);

    return {
      menu,
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

  & a.router-link-exact-active ~ .active-tab-indicator {
    opacity: 1;
  }

  a:nth-child(1).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 0);
  }
  a:nth-child(2).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 1);
  }
  a:nth-child(3).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 2);
  }
  a:nth-child(4).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 3);
  }
  a:nth-child(5).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 4);
  }
  a:nth-child(6).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 5);
  }
  a:nth-child(7).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 6);
  }
  a:nth-child(8).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 7);
  }
  a:nth-child(9).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 8);
  }
  a:nth-child(10).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 9);
  }
  a:nth-child(11).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 10);
  }
  a:nth-child(12).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 11);
  }
  a:nth-child(13).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 12);
  }
  a:nth-child(14).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 13);
  }
  a:nth-child(15).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 14);
  }
  a:nth-child(16).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 15);
  }
  a:nth-child(17).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 16);
  }
  a:nth-child(18).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 17);
  }
  a:nth-child(19).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 18);
  }
  a:nth-child(20).router-link-exact-active ~ .active-tab-indicator {
    --offset: calc(88px * 19);
  }

  .active-tab-indicator {
    --offset: -400px;
    $offset: var(--offset);

    height: 15px;
    width: 15px;
    position: absolute;
    top: 138px;
    left: -8px;
    border-radius: 100%;
    background-color: $accent-color;
    opacity: 0;
    transition-property: transform, opacity;
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
</style>
>
