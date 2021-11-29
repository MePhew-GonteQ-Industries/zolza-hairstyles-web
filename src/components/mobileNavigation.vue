<template>
      <div class="mobile-navigation-container"
      :class="{ 'mobile-menu-hidden' : !props.mobileMenuActive,
      'mobile-menu-shown' : props.mobileMenuActive}">
      <p>{{mobileMenuActive}}</p>
        <nav class="mobile-navigation">
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
      </div>
</template>

<script>

export default {
  name: 'mobileNavigation',
  props: {
    mobileMenuActive: { default: false },
  },
  setup(props) {
    console.log(props);
  },
};
</script>

<style lang='scss' scoped>
.mobile-menu-hidden {
  width: 0;
}

.mobile-menu-shown {
    width: 50%;
}

.mobile-navigation-container {
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  background-color: $darker-white;
  z-index: 20;
  margin-right: 50%;
  transition: width 500ms;
  overflow: hidden;

  .mobile-navigation {
    position: relative;
    height: 100%;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
      margin-left: 10px;
      font-size: 25px;
      padding: 0 25px 0 25px;
    }
  }
}

@media only screen and (max-width: 680px) {
    .secondary-nav {
      display: none;
    }
  }
@media only screen and (max-width: 560px) {
    .secondary-nav {
      display: initial;
    }
  }
</style>
