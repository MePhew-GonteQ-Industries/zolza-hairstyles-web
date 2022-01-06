<template>
      <div class="mobile-navigation-container"
      :class="{ 'mobile-menu-collapsed' : !mobileMenuActive,
      'mobile-menu-shown' : mobileMenuActive}">
        <nav class="mobile-navigation">
          <div class="top-bar">
            <img src="@/assets/wordmark.svg" alt="" class="wordmark">
          </div>

          <ul class="primary-nav">
            <li><router-link to="/"
               @click="toggleMobileMenu"><img src="@/assets/nav/home.svg" alt="">
              {{$t('nav.primary-nav[0]')}}</router-link></li><li><router-link to="/services"
               @click="toggleMobileMenu"><img src="@/assets/logo.svg" alt="">
            {{$t('nav.primary-nav[1]')}}</router-link></li>
            <li><router-link to="/contact"
               @click="toggleMobileMenu"><img src="@/assets/nav/contact.svg" alt="">
              {{$t('nav.primary-nav[2]')}}</router-link></li>
          </ul>

          <ul class="secondary-nav">
            <li><router-link to="/login"
               @click="toggleMobileMenu"><img src="@/assets/nav/login.svg" alt="">
              {{$t('nav.secondary-nav[0]')}}</router-link></li>
            <li><router-link to="/signup"
               @click="toggleMobileMenu"><img src="@/assets/nav/user.svg" alt="">
              {{$t('nav.secondary-nav[1]')}}</router-link></li>
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
  .mobile-navigation-container {
    position: absolute;
    z-index: 20;
    height: 100vh;
    left: 0;
    top: 0;
    transition: width 500ms;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    background-color: $accent-bg-color;

    &.mobile-menu-collapsed {
      width: 0;
    }

    &.mobile-menu-shown {
      width: 60%;
    }

    .mobile-navigation {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: $primary-bg-color;

      a {
        color: $primary-fg-color;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: left;
        width: 100%;
        font-size: 25px;

        &:lang(pl) {
          font-size: 20px;
        }

        img {
          height: 30px;
          width: 30px;
          margin-right: 10px;
          filter: $mobile-menu-icon-filter;
        }

        &.router-link-active {
          color: $link-active-color;

          img {
            filter: $mobile-menu-icon-link-active-filter;
          }
        }
      }

      .top-bar {
        position: absolute;
        top: 0;
        height: 8vh;
        min-height: 50px;
        max-height: 75px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: $accent-bg-color;

        .wordmark {
          margin-left: 60px;
          height: 50px;
          filter: $logo-filter;

          @media only screen and (max-width: 470px) {
            margin-left: 45px;
            height: 40px;
          }

          @media only screen and (max-width: 370px) {
            margin-left: 50px;
            height: 35px;
          }

          @media only screen and (max-width: 340px) {
            margin-left: 55px;
            height: 30px;
          }

          @media only screen and (max-width: 340px) {
            margin-left: 50px;
            height: 30px;
          }

          @media only screen and (max-height: 750px) {
            height: 40px;
          }
        }
      }

      .primary-nav {
        margin-top: 80px;
      }

      .secondary-nav {
        margin-bottom: 10vh;

        @media only screen and (min-width: 610px) {
          & {
            display: none;
          }
        }

        @media only screen and (max-height: 720px) {
          @media only screen and (max-width: 640px) {
            & {
              display: block;
            }
          }
        }

        @media only screen and (max-width: 610px) {
          & {
            display: block;
          }
        }
      }
    }
  }
</style>
