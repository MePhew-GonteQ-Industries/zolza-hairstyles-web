<template>
  <section class="app-page" id="settings-page">
    <SideMenu id="settings-navigation" :links="links" />
    <router-view v-if="$store.getters.isLoggedIn"></router-view>
  </section>
</template>

<script>
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'SettingsPage',
  components: {
    SideMenu,
  },
  setup() {
    const store = useStore();

    const links = [
      {
        id: uuidv4(),
        toName: 'userAccountSettings',
        iconClass: 'ph-user-light',
        text: "t('settings.account')",
      },
      {
        id: uuidv4(),
        toName: 'accountSecuritySettings',
        iconClass: 'ph-lock-open-light',
        text: "t('settings.security')",
      },
      {
        id: uuidv4(),
        toName: 'notificationsSettings',
        iconClass: 'ph-bell-ringing-light',
        text: "t('settings.notifications')",
      },
      {
        id: uuidv4(),
        toName: 'themeSettings',
        iconClass: store.state.settings.theme === 'dark'
          ? 'ph-moon-light'
          : 'ph-sun-light',
        text: "t('settings.theme')",
      },
      {
        id: uuidv4(),
        toName: 'languageSettings',
        iconClass: 'ph-translate-light',
        text: "t('shared.language')",
      },
    ];

    return {
      links,
    };
  },
};
</script>

<style lang='scss'>
#settings-navigation {
    .active-tab-indicator {
      top: 225px;
    }
}
</style>
