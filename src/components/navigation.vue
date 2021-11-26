<template>
    <nav class="navigation">
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
  name: 'navigation',
};
</script>

<style lang='scss' scoped>
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
    justify-content: space-between;
    width: 100%;

      @media only screen and (max-width: 680px) {
     .primary-nav {
       display: none;
     }
   }
  }

  @media only screen and (max-width: 680px) {
    .navigation{
       justify-content: flex-end;
     }
   }

  @media only screen and (max-width: 410px) {
    .navigation {
      display: none;
    }
  }

</style>
