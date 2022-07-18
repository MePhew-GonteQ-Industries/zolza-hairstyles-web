<template>
  <button class="login">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
};
</script>

<style lang='scss' scoped>
  button {
    height: 45px;
    width: 408px;
    border-radius: 0.313rem;
    background-color: $accent-color;
    color: $secondary-text-color;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border: none;
    box-shadow: 0 0 8px -2px $box-shadow-color;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }

    &:hover, &:active, &:focus  {
      border: none;
      outline: none;
    }

    &:active {
      transform: scale(.9);
    }
  }
</style>
