<template>
  <div
    class="sorted-header"
    :class="{ active: sortBy === sortName }"
    @click="toggleSort"
    @keyup.enter="$emit('toggleSort')"
  >
    <span>
      <slot />
    </span>
    <div class="sort-wrapper">
      <i
        class="ph-sort-ascending-light"
        v-if="sortAscending"
      ></i>
      <i
        class="ph-sort-descending-light"
        v-if="!sortAscending"
      ></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SortedHeader",
  props: {
    sortName: {
      type: String,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
  },
  emits: ["toggleSort"],
  setup(props, { emit }) {
    const sortAscending = ref(false);

    const toggleSort = () => {
      if (props.sortBy === props.sortName) {
        sortAscending.value = !sortAscending.value;
      }

      emit("toggleSort");
    };

    return {
      sortAscending,
      toggleSort,
    };
  },
};
</script>

<style lang="scss" scoped>
.sorted-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
  cursor: pointer;

  &:hover {
    i {
      opacity: 1;
    }
  }

  &.active {
    i {
      opacity: 1;
      color: $accent-color;
    }
  }

  .sort-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    font-size: 1rem;
    cursor: pointer;
    opacity: 0;
    transition-property: color;
  }
}
</style>
