<template>
    <nav class="mobileNavigation">
      <ul class="primary-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <ul class="secondary-nav">
        <li><router-link to="/signup">Log In</router-link></li>
        <li><router-link to="/login">Sign up</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'mobileNavigation',
};
</script>

<style lang='scss' scoped>
@media only screen and (max-width: 680px) {
    .secondary-nav {
      display: none;
    }
  }
@media only screen and (max-width: 520px) {
    .secondary-nav {
      display: initial;
    }
  }
</style>
