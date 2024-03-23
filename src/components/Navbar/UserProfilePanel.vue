<template>
  <div
    class="profile-wrapper"
    ref="profileWrapper"
    v-if="$store.getters.isLoggedIn"
  >
    <i
      class="user-icon"
      :class="profilePanelExpanded ? 'ph-user-fill' : 'ph-user-light'"
      @click="toggleProfilePanel"
      @keyup.enter="toggleProfilePanel"
      v-ripple
    ></i>

    <div
      class="profile-panel"
      v-show="profilePanelExpanded"
      ref="profilePanel"
    >
      <div class="panel-header">
        <router-link
          :to="{ name: 'userAccountSettings' }"
          @click="collapseProfilePanel"
          ><i class="ph-user-circle-fill user-avatar"></i
        ></router-link>
        <router-link
          :to="{ name: 'userAccountSettings' }"
          @click="collapseProfilePanel"
        >
          <span>{{ $store.state.user.name }} {{ $store.state.user.surname }}</span>
        </router-link>
      </div>
      <div
        class="primary-options"
        @click="collapseProfilePanel"
        @keyup.enter="collapseProfilePanel"
      >
        <router-link
          :to="{ name: 'themeSettings' }"
          class="option-tile"
        >
          <i
            class="tile-icon"
            :class="$store.state.settings.theme === 'dark' ? 'ph-moon-light' : 'ph-sun-light'"
          ></i>
          <span class="tile-title">{{ t("userProfilePanel.theme") }}</span>
        </router-link>
        <router-link
          :to="{ name: 'languageSettings' }"
          class="option-tile"
        >
          <i class="ph-translate-light tile-icon"></i>
          <span class="tile-title">{{ t("shared.language") }}</span>
        </router-link>
        <router-link
          :to="{ name: 'userAccountSettings' }"
          class="option-tile"
        >
          <i class="ph-gear-six-light tile-icon"></i>
          <span class="tile-title">{{ t("userProfilePanel.settings") }}</span>
        </router-link>
        <button
          class="option-tile"
          @click="logout"
        >
          <i class="ph-sign-out-light tile-icon"></i>
          <span class="tile-title">{{ t("shared.logOut") }}</span>
        </button>
      </div>
      <div
        class="secondary-options"
        @click="collapseProfilePanel"
        @keyup.enter="collapseProfilePanel"
      >
        <button class="option-tile">
          <i class="ph-question-light tile-icon"></i>
          <span class="tile-title">{{ t("userProfilePanel.help") }}</span>
        </button>
        <button class="option-tile">
          <i class="ph-chat-circle-text-light tile-icon"></i>
          <span class="tile-title">{{ t("userProfilePanel.sendOpinion") }}</span>
        </button>
        <button class="option-tile">
          <i class="ph-bug-light tile-icon"></i>
          <span class="tile-title">{{ t("userProfilePanel.reportIssue") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onClickOutside, useMouseInElement } from "@vueuse/core";
import { useMessage } from "naive-ui";

export default {
  name: "UserProfilePanel",
  setup() {
    const router = useRouter();
    const { t } = useI18n({ useScope: "global" });
    const message = useMessage();

    const profilePanelExpanded = ref(false);

    function toggleProfilePanel() {
      profilePanelExpanded.value = !profilePanelExpanded.value;
    }

    function collapseProfilePanel() {
      profilePanelExpanded.value = false;
    }

    const profileWrapper = ref(null);

    onClickOutside(profileWrapper, () => {
      collapseProfilePanel();
    });

    const profilePanel = ref(null);

    const mouseIsOutsideprofilePanel = useMouseInElement(profilePanel).isOutside;

    const scrollHandler = (e) => {
      if (!profilePanelExpanded.value) {
        document.removeEventListener("wheel", scrollHandler);
        return;
      }

      if (mouseIsOutsideprofilePanel.value) {
        collapseProfilePanel();
        return;
      }

      e.preventDefault();
    };

    watch(profilePanelExpanded, (newValue) => {
      if (newValue) {
        document.addEventListener("wheel", scrollHandler, { passive: false });
        return;
      }

      document.removeEventListener("wheel", scrollHandler);
    });

    const store = useStore();

    function logout() {
      store.dispatch("logout").then(() => {
        if (router.currentRoute.value.meta.requiresAuth) router.push({ name: "home" });
        message.success(t("snackBars.logOut"));
      });
    }

    return {
      profilePanelExpanded,
      toggleProfilePanel,
      profileWrapper,
      profilePanel,
      logout,
      collapseProfilePanel,
      t,
      message,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 500;

  .user-icon {
    font-size: 25px;
    cursor: pointer;
    box-sizing: content-box;
    padding: 1rem;
    border-radius: 50%;
  }

  .profile-panel {
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: $secondary-color;
    border-radius: 0 0 5px 5px;
    max-height: 90vh;
    min-width: 350px;
    max-width: 450px;
    background-color: $primary-color;
    position: absolute;
    top: 100%;
    right: 0;
    color: $primary-text-color;

    @media only screen and (max-width: $xs) {
      min-width: 230px;
      min-height: 0;
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid $secondary-color;
      font-size: 1.125rem;

      @media only screen and (max-width: $xs) {
        font-size: 1rem;
        padding: 0.5rem;
      }

      a {
        color: inherit;
      }

      .user-avatar {
        font-size: 3rem;

        @media only screen and (max-width: $xs) {
          font-size: 1rem;
        }
      }
    }

    .primary-options {
      border-bottom: 1px solid $secondary-color;
    }

    .primary-options,
    .secondary-options {
      display: flex;
      flex-direction: column;
      padding-block: 0.5rem;
    }

    .option-tile {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      background-color: $primary-color;
      border: none;
      outline: none;
      color: inherit;
      font-size: inherit;

      @media only screen and (max-width: $xs) {
        font-size: 0.9rem;
      }

      &:hover {
        background-color: $secondary-color;
      }
    }
  }
}
</style>
