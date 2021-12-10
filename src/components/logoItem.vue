<template>
  <div id="logo">
    <img src="@/assets/logo.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'logoItem',
};
</script>

<style lang='scss' scoped>
  #logo {
    background-color: $primary-color;
    width: 250px;
    height: 250px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #logo img {
    height: 50%;
    filter: brightness(0) saturate(0) invert(100%);
  }
</style>
