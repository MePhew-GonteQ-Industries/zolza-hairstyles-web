<template>
    <nav class="navigation">
      <ul class="primary-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <ul class="secondary-nav">
        <li><router-link to="/login" id="login">Log In</router-link></li>
        <li><router-link to="/signup" id="signup">Sign up</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'navigation',
};
</script>

<style lang='scss' scoped>
  #login {
    padding: 0 10px 0 10px;
    border: 1px solid black;
    border-radius: 20px;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  #signup {
    padding: 0 10px 0 10px;
    border: 1px solid transparent;
    background-color: $light-complementary-color;
    color: white;
    border-radius: 10px;

    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black;
    }
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .primary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .secondary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .primary-nav a {
      font-size: 24px;
    }

      @media only screen and (max-width: 990px) {
     .primary-nav {
       display: none;
     }
   }

    a {
      text-decoration: none;
      margin-right: 10px;
    }

    li {
      display: inline-block;
    }
  }

  @media only screen and (max-width: 990px) {
    .navigation{
       justify-content: flex-end;
     }
   }

  @media only screen and (max-width: 570px) {
    .navigation {
      display: none;
    }
  }

  @media only screen and (min-width: 640px){
    a{
      font-size: 26px;
    }
  }
</style>
