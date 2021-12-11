<template>
      <div class="mobile-navigation-container"
      :class="{ 'mobile-menu-collapsed' : !mobileMenuActive,
      'mobile-menu-shown' : mobileMenuActive}">
        <nav class="mobile-navigation">
          <img src="@/assets/wordmark.svg" alt="" class="wordmark">

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
               @click="toggleMobileMenu">Log in</router-link></li>
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

  .wordmark {
    position: absolute;
    left: 150px;
    top: 10px;
    height: 50px;
    filter: $logo-filter;

    @media only screen and (max-width: 620px) {
      & {
        top: 12px;
        left: 70px;
        height: 40px;
      }
    }

    @media only screen and (max-width: 410px) {
      & {
        top: 16px;
        height: 35px;
      }
    }

    @media only screen and (max-width: 375px) {
      & {
        display: none;
      }
    }
  }

  .mobile-menu-collapsed {
    width: 0;
  }

  .mobile-menu-shown {
    width: 60%;
  }

  .mobile-navigation-container {
    position: absolute;
    z-index: 20;
    height: 100vh;
    left: 0;
    top: 0;
    transition: width 500ms;
    overflow: hidden;
    display: flex;
    justify-content: right;
    background-color: $background-accent-color;

    .mobile-navigation {
      margin-top: 8vh;
      padding: 30px 0 90px;
      width: 60vw;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: $background-color;

      a {
        color: $primary-color;
        padding-left: 20px;
        font-size: 25px;
        display: inline-block;
        width: 100%;
      }

      .secondary-nav {

        @media only screen and (max-width: 990px) {
          & {
            display: none;
          }
        }
        @media only screen and (max-width: 570px) {
          & {
            display: block;
          }
        }

      }
    }
  }
</style>
