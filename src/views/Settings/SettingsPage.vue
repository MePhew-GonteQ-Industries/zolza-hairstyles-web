<template>
  <section
    class="app-page"
    id="settings-page"
  >
    <CustomHorizontalMenu
      :links="links"
      class="horizontal-menu"
    ></CustomHorizontalMenu>
    <SideMenu
      id="settings-navigation"
      :links="links"
    />
    <router-view v-if="$store.getters.isLoggedIn"></router-view>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import SideMenu from "@/components/SideMenu.vue";
import CustomHorizontalMenu from "@/components/CustomHorizontalMenu.vue";

export default {
  name: "SettingsPage",
  components: {
    SideMenu,
    CustomHorizontalMenu,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    const links = [
      {
        id: uuidv4(),
        toName: "userAccountSettings",
        iconClass: "ph-user-light",
        text: t("settings.sideMenu.account"),
      },
      {
        id: uuidv4(),
        toName: "accountSecuritySettings",
        iconClass: "ph-lock-open-light",
        text: t("settings.sideMenu.security"),
      },
      {
        id: uuidv4(),
        toName: "notificationsSettings",
        iconClass: "ph-bell-ringing-light",
        text: t("settings.sideMenu.notifications"),
      },
      {
        id: uuidv4(),
        toName: "themeSettings",
        iconClass: store.state.settings.theme === "dark" ? "ph-moon-light" : "ph-sun-light",
        text: t("settings.sideMenu.theme"),
      },
      {
        id: uuidv4(),
        toName: "languageSettings",
        iconClass: "ph-translate-light",
        text: t("shared.language"),
      },
    ];

    return {
      links,
      t,
    };
  },
};
</script>

<style lang="scss">
#settings-page {
  .horizontal-menu {
    width: 92vw;
    display: none;
    @media only screen and (max-width: $xs) {
      display: block;
    }
  }
  #settings-navigation {
    .active-tab-indicator {
      top: 225px;
    }
    @media only screen and (max-width: $xs) {
      display: none;
    }
  }
}
</style>
