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
    border: 2px solid transparent;
    background-color: #1A92F0;
    color: white;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover, &:active, &:focus  {
      border-color: white;
      box-shadow: 0 0 4px 3px rgb(156, 156, 156);
    }

    &:active {
      transform: scale(.9);
    }
  }
</style>
