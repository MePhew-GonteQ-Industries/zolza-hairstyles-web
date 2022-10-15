<template>
  <div class="data-icon-wrapper">
    <i
      :class="[
        statusSuccess ? 'ph-check-circle-light' : 'ph-x-circle-light',
        statusSuccess ? 'good' : 'wrong',
      ]"
    >
    </i>
  </div>
</template>

<script>
export default {
  name: "StatusIndicator",
  props: {
    statusSuccess: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.data-icon-wrapper {
  justify-content: center;

  i {
    background-color: $secondary-color;
    padding: 0.25rem;
    border-radius: 50%;

    &.wrong {
      background-color: $error-color-low;
      color: $error-color;
    }

    &.good {
      background-color: $success-color-low;
      color: $success-color;
    }
  }
}
</style>
