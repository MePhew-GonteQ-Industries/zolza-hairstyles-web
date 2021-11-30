<template>
      <div class="mobile-navigation-container"
      :class="{ 'mobile-menu-hidden' : !mobileMenuActive,
      'mobile-menu-shown' : mobileMenuActive}">
        <nav class="mobile-navigation">
          <ul class="primary-nav">
            <li><router-link to="/"
               @click="toggleMobileMenu">Home</router-link></li>
            <li><router-link to="/services"
               @click="toggleMobileMenu">Services</router-link></li>
            <li><router-link to="/contact"
               @click="toggleMobileMenu">Contact</router-link></li>
          </ul>

          <ul class="secondary-nav">
            <li><router-link to="/login"
               @click="toggleMobileMenu">Log In</router-link></li>
            <li><router-link to="/signup"
               @click="toggleMobileMenu">Sign up</router-link></li>
          </ul>
        </nav>
      </div>
</template>

<script>

export default {
  name: 'mobileNavigation',
  props: {
    mobileMenuActive: { default: false }, // TODO: Add transition : line 5
  },
  setup(props, ctx) {
    function toggleMobileMenu() {
      ctx.emit('mobile-menu-closed');
    }

    return { toggleMobileMenu };
  },
};
</script>

<style lang='scss' scoped>
.mobile-menu-hidden {
  width: 0;
}

.mobile-menu-shown {
    width: 30%;
}

.mobile-navigation-container {
  position: absolute;
  z-index: 20;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: $darker-white;
  transition: width 500ms;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .mobile-navigation {
    padding: 80px 0 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: right;

    a {
      margin-left: 10px;
      font-size: 25px;
      transition: visibility 5000ms;
    }
  }
  @media only screen and (max-width: 990px) {
      .secondary-nav {
       display: none;
      }
    }
  @media only screen and (max-width: 570px) {
      .secondary-nav {
        display: initial;
      }
    }
}

</style>
