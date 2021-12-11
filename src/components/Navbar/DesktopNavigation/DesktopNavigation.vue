<template>
    <nav class="navigation">
      <ul class="primary-nav">
        <li><router-link to="/">{{$t('nav.primary-nav[0]')}}</router-link></li>
        <li><router-link to="/services">{{$t('nav.primary-nav[1]')}}</router-link></li>
        <li><router-link to="/contact">{{$t('nav.primary-nav[2]')}}</router-link></li>
      </ul>

      <div class="controls-wrapper">
        <ToggleThemeSwitch @change="toggleTheme"/>
      </div>

      <ul class="secondary-nav">
        <li><router-link to="/login" class="login-btn">{{$t('nav.secondary-nav[0]')}}
        </router-link></li>
        <li><router-link to="/signup" class="signup-btn">{{$t('nav.secondary-nav[1]')}}
        </router-link></li>
      </ul>
    </nav>
</template>

<script>
import ToggleThemeSwitch from '@/components/Navbar/DesktopNavigation/ToggleThemeSwitch.vue';

export default {
  name: 'desktopNavigation',
  components: {
    ToggleThemeSwitch,
  },
  setup(props, ctx) {
    function toggleTheme() {
      ctx.emit('theme-toggled');
    }

    return { toggleTheme };
  },
};
</script>

<style lang='scss' scoped>
  .controls-wrapper {
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;
  }

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;

    @media only screen and (max-width: 990px) {
      &{
        justify-content: flex-end;
      }
    }

    .primary-nav {
      display: flex;
      align-items: center;
      justify-content: center;

      @media only screen and (max-width: 900px) {
        & {
          display: none;
        }
      }

      li {
        cursor: pointer;

        a {
          user-select: none;
          display: inline-block;
          color: $primary-fg-color;
          text-decoration: none;
          margin-right: 10px;

          &.router-link-active {
            color: $link-active-color;
          }

          @media only screen and (min-width: 660px){
            &{
              font-size: 26px;
            }
          }
        }

        &:hover a{
          margin-bottom: 10px;
          border-bottom: 1px solid $primary-fg-color;
        }
      }
    }

    .secondary-nav {
      display: flex;
      align-items: center;
      justify-content: center;

      @media only screen and (max-width: 580px) {
        & {
          display: none;
        }
      }

      li {
        cursor: pointer;

        a {
          user-select: none;
          display: inline-block;
          color: $primary-fg-color;
          text-decoration: none;
          margin-right: 10px;

          @media only screen and (min-width: 660px){
            &{
              font-size: 26px;
            }
          }

          &.login-btn, &.signup-btn {
            padding: 0 10px 0 10px;
          }

          &.login-btn {

            &:hover {
              color: $hover-color;
            }
          }

          &.signup-btn {
            border: 1px solid transparent;
            border-radius: 10px;
            background-color: $page-fg-color;
            color: $primary-bg-color;

            &:hover {
              background-color: $primary-bg-color;
              color: $page-fg-color;
              border-color: $page-fg-color;
            }
          }
        }
      }
    }
  }
</style>
