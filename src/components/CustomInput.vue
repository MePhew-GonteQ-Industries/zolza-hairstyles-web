<template>
  <label for="">{{label}}</label>
  <input type="text" name="" id="">
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: String,
  },
};
</script>

<style lang='scss' scoped>
  input {
    border-radius: 5px;
    border: none;
    background-color: rgb(214, 214, 214);
    color: black;
    padding: 10px 5px;
    border: 2px solid transparent;

    &:focus {
      outline: none;
      border-color: purple;
      box-shadow: 1px 1px red;
    }
  }
</style>
