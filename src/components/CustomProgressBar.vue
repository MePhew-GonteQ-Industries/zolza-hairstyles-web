<template>
<div class="progress-bar" ref="progress">
  <div class="progress"></div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CustomProgressBar',
  props: {
    color: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const progress = ref(null);

    onMounted(() => {
      progress.value.style.setProperty('--color', props.color);
      progress.value.style.setProperty('--value', `${props.value}%`);
    });

    return {
      progress,
    };
  },
};
</script>

<style lang='scss' scoped>
.progress-bar {
  --border-radius: 1rem;
  $border-radius: var(--border-radius);
  --color: none;
  $color: var(--color);
  --value: none;
  $value: var(--value);

  height: .7rem;
  width: 100%;
  border-radius: $border-radius;
  background-color: #dedede;

  .progress {
    background-color: $color;
    height: 100%;
    width: $value;
    border-radius: $border-radius 0 0 $border-radius;
  }
}
</style>
