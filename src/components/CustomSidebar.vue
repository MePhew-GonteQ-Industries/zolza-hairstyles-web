<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="sidebar">
    <CustomHamburgerIcon class="custom-hamburger-icon" @slide-sidebar="slideSidebar" :navbarActive="sidebarActive" />
    <div class="sidebar-wrapper">
      <div class="sidebar-menu" :class="{ 'sidebar-active': sidebarActive }">
        <div class="nav-section" @click="slideSidebar">
          <router-link to="/"><i class="ph-house"></i>{{ t("nav.primaryNav[0]") }}</router-link>
          <router-link v-if="$store.getters.isLoggedIn && $store.getters.isAdmin" to="/dashboard">
            <i class="ph-app-window"></i>{{ t("nav.primaryNav[1]") }}
          </router-link>
          <router-link v-if="$store.getters.isLoggedIn" to="/appointments"><i class="ph-calendar-check"></i>{{
              t('nav.primaryNav[2]')
          }}</router-link>
          <router-link to="/contact">
            <i class="ph-chat-centered-dots"></i>{{ t("nav.primaryNav[3]") }}
          </router-link>
        </div>
        <div class="footer-section" @click="slideSidebar">
          <router-link class="link" to="/terms-of-use">
            <i class="ph-files"></i>{{ t("footer[0]") }}
          </router-link>
          <router-link class="link" to="/privacy-policy">
            <i class="ph-files"></i>{{ t("footer[1]") }}
          </router-link>
          <router-link class="link" to="/cookies-policy">
            <i class="ph-files"></i>{{ t("footer[2]") }}
          </router-link>
          <router-link class="link" to="/rodo">
            <i class="ph-files"></i>RODO
          </router-link>
        </div>
      </div>
    </div>
    <div class="sidebar-background" :class="{ 'sidebar-menu-background': sidebarActive }" @click.self="slideSidebar">
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import CustomHamburgerIcon from "./CustomHamburgerIcon.vue";

export default {
  name: "customSidebar",
  components: {
    CustomHamburgerIcon,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const sidebarActive = ref(false);

    function slideSidebar() {
      sidebarActive.value = !sidebarActive.value;
    }

    return {
      slideSidebar,
      sidebarActive,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  * {
    font-size: 0.875rem;
    font-family: "Open Sans", sans-serif;
  }

  i {
    font-size: 1.438rem;
  }

  .custom-hamburger-icon {
    position: absolute;
    top: 22px;
    left: 1rem;
    display: block;
    transform: translateX(100vw);
    z-index: 2500;
  }

  .sidebar-wrapper {
    height: 100%;
    width: 100%;
    z-index: 8;

    a {
      color: $secondary-text-color !important;
      padding: .5rem .5rem;
      margin: 0 1rem;
      display: flex;
      align-items: center;
      gap: .5rem;

      &.router-link-active {
        color: $accent-color !important;
      }
    }

    .sidebar-menu {
      padding: 4rem 0;
      width: 60vw;
      height: 100%;
      background-color: $primary-color;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .nav-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        a {
          background-color: $secondary-color;
          border-radius: .375rem;
        }
      }

      .footer-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        border-top: 1px solid var(--secondary-color);
        padding-top: 1rem;
      }
    }
  }

  .sidebar-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translateX(100vw);
    display: none;
    transition: display 2s ease-in-out;
  }

  .sidebar-active {
    transform: translateX(100vw);
  }

  .sidebar-menu-background {
    display: block;
  }
}
</style>
