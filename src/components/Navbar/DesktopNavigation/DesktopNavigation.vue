<template>
    <nav class="navigation">
      <ul class="primary-nav">
        <li><router-link to='/'>{{ t('nav.primaryNav[0]') }}</router-link></li>
        <li><router-link to='/services'>{{ t('nav.primaryNav[1]') }}
          </router-link></li>
        <li><router-link to="/contact">{{ t('nav.primaryNav[2]') }}</router-link></li>
      </ul>

      <div class="controls-wrapper">
        <ToggleThemeSwitch v-if="!userLoggedIn" :data-theme="dataTheme" @change="toggleTheme"/>
      </div>

      <ul class="secondary-nav" v-if="!userLoggedIn">
          <li><router-link to="/login" class="login-btn">{{ t('nav.secondaryNav[0]') }}
          </router-link></li>
          <li><router-link to="/select-sign-up-method" class="signup-btn">
          {{ t('nav.secondaryNav[1]') }}
          </router-link></li>
      </ul>

      <div class="user-prof" v-else>
        <img class="prof-icon" src="@/assets/bell-fill.svg" alt="">
        <img @click="logout" class="prof-icon" src="@/assets/avatar-fill.svg" alt="">
      </div>
    </nav>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';
import ToggleThemeSwitch from '@/components/Navbar/DesktopNavigation/ToggleThemeSwitch.vue';

export default {
  name: 'desktopNavigation',
  components: {
    ToggleThemeSwitch,
  },
  props: {
    dataTheme: {
      type: String,
      required: true,
    },
  },
  setup(_props, ctx) {
    const { t } = useI18n({ useScope: 'global' });

    const store = useStore();

    const userLoggedIn = computed(() => store.state.user.loggedIn);

    function logout() {
      store.dispatch('logout');
    }

    function toggleTheme() {
      ctx.emit('theme-toggled');
    }

    return {
      toggleTheme,
      userLoggedIn,
      logout,
      t,
    };
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

    .user-prof {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 20px;

      .prof-icon {
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
    }

    @media only screen and (max-width: 990px) {
      &{
        justify-content: flex-end;
      }
    }

    .primary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      &:lang(en) {
        @media only screen and (max-width: 940px) {
          & {
            display: none;
          }
        }
      }

      &:lang(pl) {
        @media only screen and (max-width: 1160px) {
          & {
            display: none;
          }
        }
      }

      li {
        cursor: pointer;

        &:hover a{
          margin-bottom: 10px;
          border-bottom: 1px solid $primary-fg-color;

          //TODO: Fix not clickable space
        }

        a {
          user-select: none;
          display: inline-block;
          color: $primary-fg-color;
          text-decoration: none;
          margin-right: 10px;
          transition: margin-bottom 200ms;
          height: 100%;

          &.router-link-active {
            color: $link-active-color;
          }

          @media only screen and (min-width: 690px){
            &{
              font-size: 26px;
            }
          }

          @media only screen and (max-height: 720px) {
            font-size: 22px;
          }
        }
      }
    }

    .secondary-nav {
      display: flex;
      align-items: center;
      justify-content: center;

      @media only screen and (max-height: 720px) {
        @media only screen and (max-width: 640px) {
          & {
            display: none;
          }
        }
      }

      @media only screen and (max-width: 610px) {
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

          @media only screen and (min-width: 690px){
            &{
              font-size: 26px;
            }
          }

          @media only screen and (max-height: 720px) {
            font-size: 22px;
          }

          &.login-btn, &.signup-btn {
            margin: 0 10px 0 10px;
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
