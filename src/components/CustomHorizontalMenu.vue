<template>
  <div class="menu">
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="{ name: link.toName }"
      class="horizontal-menu-links"
    >
      <span
        ><i :class="link.iconClass">{{ link.text }}</i></span
      >
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CustomHorizontalMenu",
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
  overflow: auto;
  white-space: nowrap;
  display: flex;
  .horizontal-menu-links {
    color: $accent-text-color;
    display: inline-block;
    padding: 10px;
  }
  .router-link-exact-active {
    color: $accent-color;
  }
}
</style>
