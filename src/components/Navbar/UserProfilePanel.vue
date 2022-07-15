<template>
  <div class="profile-wrapper" ref="profileWrapper">
    <i class="user-icon"
    :class="profilePanelExpanded ? 'ph-user-fill': 'ph-user-light'"
    @click='toggleProfilePanel'></i>

    <div class="profile-panel" v-show="profilePanelExpanded" ref="profilePanel">
      <div class="panel-header" v-if="$store.state.user.userData">
        <i class="ph-user-circle-fill user-avatar"></i>
        <span>{{ $store.state.user.userData.name }} {{ $store.state.user.userData.surname }}</span>
      </div>
      <div class="primary-options" @click="collapseProfilePanel">
        <router-link to="/settings/theme" class="option-tile">
          <i class="tile-icon"
          :class="$store.state.settings.theme === 'dark' ? 'ph-moon-light' : 'ph-sun-light'"></i>
          <span class="tile-title">Motyw</span>
        </router-link>
        <router-link to="/settings/language" class="option-tile">
          <i class="ph-translate-light tile-icon"></i>
          <span class="tile-title">Język</span>
        </router-link>
        <router-link to="/settings" class="option-tile">
          <i class="ph-gear-six-light tile-icon"></i>
          <span class="tile-title">Ustawienia</span>
        </router-link>
        <button class="option-tile" @click="logout">
          <i class="ph-sign-out-light tile-icon"></i>
          <span class="tile-title">Wyloguj się</span>
        </button>
      </div>
      <div class="secondary-options" @click="collapseProfilePanel">
        <button class="option-tile">
          <i class="ph-question-light tile-icon"></i>
          <span class="tile-title">Pomoc</span>
        </button>
        <button class="option-tile">
          <i class="ph-chat-circle-text-light tile-icon"></i>
          <span class="tile-title">Prześlij opinię</span>
        </button>
        <button class="option-tile">
          <i class="ph-bug-light tile-icon"></i>
          <span class="tile-title">Zgłoś błąd</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside, useMouseInElement } from '@vueuse/core';

export default {
  name: 'UserProfilePanel',
  setup() {
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
        document.removeEventListener('wheel', scrollHandler);
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
        document.addEventListener('wheel', scrollHandler, { passive: false });
        return;
      }

      document.removeEventListener('wheel', scrollHandler);
    });

    const store = useStore();

    function logout() {
      store.dispatch('logout');
    }

    return {
      profilePanelExpanded,
      toggleProfilePanel,
      profileWrapper,
      profilePanel,
      logout,
      collapseProfilePanel,
    };
  },
};

</script>

<style lang='scss' scoped>
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

    &:active {
      background-color: $secondary-color;
    }
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

    .panel-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid $secondary-color;
      font-size: 1.125rem;

      .user-avatar {
        font-size: 3rem;
      }
    }

    .primary-options {
      border-bottom: 1px solid $secondary-color;
    }

    .primary-options, .secondary-options {
      display: flex;
      flex-direction: column;
      padding-block: .5rem;
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

      &:hover {
        background-color: $secondary-color;
      }
    }
  }
}
</style>
