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
    height: 38px;
    width: 408px;
    border-radius: .5rem;
    background-color: $accent-color;
    color: $secondary-text-color;
    font-size: 1.2rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border: none;
    box-shadow: 0 4px 8px -4px $box-shadow-color;

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
