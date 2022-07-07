<template>
    <nav class="navigation">
      <router-link id="logo-link" to="/">
        <img class="wordmark" src="@/assets/wordmark.svg" alt="">
      </router-link>

      <ul class="primary-nav">
        <li><router-link to='/'>{{ t('nav.primaryNav[0]') }}</router-link></li>
        <li><router-link to="/contact">{{ t('nav.primaryNav[2]') }}</router-link></li>
      </ul>

      <ul class="secondary-nav" v-if="!userLoggedIn">
          <li>
            <router-link to="/login" class="login-btn">
              <i class="ph-user-light"></i>{{ t('nav.secondaryNav[0]') }}
            </router-link>
          </li>

          <li>
            <router-link to="/sign-up" class="signup-btn">
              <i class="ph-user-plus-light"></i>{{ t('nav.secondaryNav[1]') }}
            </router-link>
          </li>
      </ul>

      <div class="user-prof" v-else>
        <ul>
          <li><NotificationsPanel /></li>
          <li><i @click="logout" class="ph-user-light prof-icon"></i></li>
        </ul>
      </div>
    </nav>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';
import NotificationsPanel from '@/components/Navbar/NotificationsPanel.vue';

export default {
  name: 'desktopNavigation',
  components: {
    NotificationsPanel,
  },
  props: {
    dataTheme: {
      type: String,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const { t } = useI18n({ useScope: 'global' });

    const store = useStore();

    const userLoggedIn = computed(() => store.state.user.loggedIn);

    function logout() {
      store.dispatch('logout');
    }

    function toggleTheme() {
      emit('theme-toggled');
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
.navigation, .primary-nav, .secondary-nav {
   display: flex;
}

.navigation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .wordmark {
    filter: invert(1);
  }

  a {
    color: white;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;

    &.router-link-active {
      color: $text-color-element-active;
      font-weight: 500;
    }
  }

  .primary-nav {
    gap: 1.125rem;
  }

  .secondary-nav {
    a {
      margin: 0 .5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;

      i {
        font-size: 1.675rem;
      }
    }
  }

  .user-prof {
    ul {
      display: flex;
      gap: 25px;
      margin: 0 .5rem;
      font-size: 25px;
      align-items: center;
      justify-content: space-around;

      .prof-icon {
        padding: 1rem;
      }
    }
  }
}
</style>
