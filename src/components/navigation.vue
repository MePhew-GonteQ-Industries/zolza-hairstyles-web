<template>
    <nav class="navigation">
      <ul class="primary-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <ul class="secondary-nav">
        <li><router-link to="/signup">Sign up</router-link></li>
        <li><router-link to="/login">Sign up</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'navigation',
};
</script>

<style scoped>
  a {
    text-decoration: none;
    padding-right: 5px;
    margin-right: 10px;
  }

  li {
    display: inline-block;
  }

  .navigation {
    display: flex;
  }

  .secondary-nav {
    position: absolute;
    right: 0;
  }
</style>
