<template>
  <button class="login">{{ content }}</button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    content: String,
  },
};
</script>

<style lang='scss' scoped>
  button {
    height: 60px;
    width: 200px;
    border-radius: 30px;
    background-color: $secondary-color;
    color: $accent-color;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    border: none;

    &:focus {
      outline: none;
    }

    &:hover, &:active, &:focus  {
      box-shadow: 0 0 4px 3px $accent-color;
      border-color: none;
      outline: none;
    }

    &:active {
      transform: scale(.9);
    }
  }
</style>
