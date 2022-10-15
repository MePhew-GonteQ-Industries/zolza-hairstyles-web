<template>
  <div class="progress-bar" ref="progress">
    <div class="progress"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setCssPropertyValue } from "@/utils";

export default {
  name: "CustomProgressBar",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const progress = ref(null);

    onMounted(() => {
      setCssPropertyValue(progress.value, "--value", `${props.value}%`);
    });

    return {
      progress,
    };
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  --border-radius: 1rem;
  $border-radius: var(--border-radius);
  --value: none;
  $value: var(--value);

  height: 0.7rem;
  width: 100%;
  border-radius: $border-radius;
  background-color: $secondary-color;

  .progress {
    background-color: $accent-color;
    height: 100%;
    width: $value;
    border-radius: $border-radius 0 0 $border-radius;
  }
}
</style>
