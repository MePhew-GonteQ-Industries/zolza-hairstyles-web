<template>
  <div id="logo">
    <img src="@/assets/logo.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'logo',
};
</script>

<style scoped>
  #logo {
    background-color: white;
    width: 70%;
    max-width: 230px;
    height: 230px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #logo img {
    filter: invert(100%);
  }
</style>
