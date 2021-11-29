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
            <li><router-link to="/signup"
               @click="toggleMobileMenu">Log In</router-link></li>
            <li><router-link to="/login"
               @click="toggleMobileMenu">Sign up</router-link></li>
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
    width: 50%;
}

.mobile-navigation-container {
  z-index: 20;
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  background-color: $darker-white;
  transition: width 500ms;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .mobile-navigation {
    margin: 80px 50% 50% 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
      margin-left: 10px;
      font-size: 25px;
      padding: 0 25px 0 25px;
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
