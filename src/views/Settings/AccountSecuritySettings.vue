<template>
  <div class="settings-page account-security-settings">
    <div class="elevated-card change-password">
      <h1>{{ t("accountSecuritySettings.passwordChange") }}</h1>
      <form @submit.prevent>
        <input
          class="hidden-input"
          type="text"
          autocomplete="username"
          id="settings-change-password-hidden-username-input"
        />
        <label for="settings-change-password-hidden-username-input"></label>
        <CustomInput
          v-model:value="passwordData.current"
          :label="t('accountSecurityPage.currentPassword')"
          autocomplete="current-password"
          type="password"
          :required="true"
        />
        <CustomInput
          v-model:value="passwordData.new"
          :label="t('accountSecurityPage.newPassword')"
          autocomplete="new-password"
          type="password"
          :required="true"
        />
        <CustomInput
          v-model:value="passwordData.repeat"
          :label="t('accountSecuritySettings.repeatNewPassword')"
          autocomplete="new-password"
          type="password"
          :required="true"
        />
        <router-link to="/password-reset" tabindex="-1"
          >{{ t('accountSecurityPage.forgotYourPassword') }}</router-link
        >
        <CustomButton @click="changePassword">
        {{ t('accountSecurityPage.changePassword') }}</CustomButton>
      </form>
    </div>
    <div class="elevated-card two-fa" v-if="false">
      <div class="header">
        <h1>{{ t("accountSecuritySettings.twoFactorAuthentication") }}</h1>
        <CustomChip type="warning">{{ t("accountSecuritySettings.notConfigured") }}</CustomChip>
      </div>
      <p>
        {{ t("accountSecuritySettings.twoFAInfo") }}
      </p>
      <CustomButton type="success">{{ t("accountSecuritySettings.configureNow") }}</CustomButton>
    </div>
    <div class="elevated-card active-sessions">
      <div class="header">
        <h1>{{ t("accountSecuritySettings.sessions") }}</h1>
        <CustomButton
          type="warning"
          class="logout-everywhere"
          v-if="sessions.length > 1"
          @click="logoutEverywhereModalOpen = true"
          >{{ t("accountSecuritySettings.logOutEverywhere") }}</CustomButton
        >
        <CustomModal v-model:open="logoutEverywhereModalOpen">
          <template #title>
            {{ t("accountSecuritySettings.logOutReassurance") }}
          </template>
          <div class="logout-everywhere-wrappper">
            <MessageBox type="warning">
              <template #title>{{ t("accountSecuritySettings.warning") }}</template>
              <template #subtitle> {{ t("accountSecuritySettings.irrevirsibleInfo") }} </template>
            </MessageBox>
            <div class="btns-wrapper">
              <CustomButton type="warning" @click="logoutEverywhere"
                >{{ t("accountSecuritySettings.logOut") }}</CustomButton
              >
              <CustomButton
                type="secondary"
                @click="logoutEverywhereModalOpen = false"
                >{{ t("shared.operationCancel") }}</CustomButton
              >
            </div>
          </div>
        </CustomModal>
      </div>
      <MessageBox type="info">
        <template #title>
          {{ t("accountSecuritySettings.devicesList") }}
        </template>
        <template #subtitle>
          {{ t("accountSecuritySettings.logOutUnrecognisedDevices") }}
        </template>
      </MessageBox>
      <div class="active-sessions-wrapper">
        <LoginSession
          v-for="session in sessions"
          :key="session.id"
          :session="session"
        >
        </LoginSession>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, onMounted, computed, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import CustomInput from '@/components/CustomInput.vue';
import CustomChip from '@/components/CustomChip.vue';
import CustomButton from '@/components/CustomButton.vue';
import LoginSession from '@/components/Settings/LoginSession.vue';
import MessageBox from '@/components/MessageBox.vue';
import CustomModal from '@/components/CustomModal.vue';
import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  name: 'AccountSecuritySettings',
  components: {
    CustomInput,
    CustomChip,
    CustomButton,
    LoginSession,
    MessageBox,
    CustomModal,
  },
  setup() {
    const store = useStore();
    const locale = store.state.settings.language;
    const { t } = useI18n({ useScope: 'global' });

    const sessions = computed(() => {
      if (!store.state.sessions.sessions.length) return [];

      const sessionsTemp = [];

      store.state.sessions.sessions.forEach((session) => {
        const sessionTemp = session;

        sessionTemp.last_accessed_str = new Date(
          `${session.last_accessed}Z`,
        ).toLocaleTimeString(locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        let sessionIcon;

        const userAgentInfo = session.last_access_data.user_agent_info;

        let deviceTooltip = `${userAgentInfo.browser.family} ${userAgentInfo.browser.version}`;

        if (userAgentInfo.os.family && userAgentInfo.os.family !== 'Other') {
          deviceTooltip += ` na ${userAgentInfo.os.family} ${userAgentInfo.os.version}`;
        }

        if (userAgentInfo) {
          const deviceInfo = userAgentInfo.device;

          if (deviceInfo) {
            if (deviceInfo.is_bot) sessionIcon = 'ph-robot-light';

            if (deviceInfo.is_pc) sessionIcon = 'ph-desktop-light';

            if (deviceInfo.is_tablet) sessionIcon = 'ph-device-tablet-light';

            if (deviceInfo.is_mobile) sessionIcon = 'ph-device-mobile-light';
          }
        }

        if (!sessionIcon) {
          if (session.last_access_data.user_agent.includes('dart')) {
            sessionIcon = 'ph-device-mobile-light';
            deviceTooltip = 'Aplikacja Zołza Hairstyles dla urządzeń mobilnych';
          }
        }

        sessionTemp.iconClass = sessionIcon;
        sessionTemp.deviceTooltip = deviceTooltip;

        sessionsTemp.push(sessionTemp);
      });

      return sessionsTemp;
    });

    onMounted(async () => {
      await store.dispatch('loadSessions');
    });

    const logoutEverywhereModalOpen = ref(false);

    const logoutEverywhere = () => {
      axios
        .post('auth/logout-everywhere')
        .then((response) => {
          if (response.status === 200) {
            store.dispatch('deleteSessions').then(() => {
              store.dispatch('loadSessions').then(() => {
                logoutEverywhereModalOpen.value = false;
              });
            });
          }
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    const passwordData = reactive({
      current: '',
      new: '',
      repeat: '',
    });

    const requestPasswordChange = () => {
      axios
        .post('auth/change-password', {
          old_password: passwordData.current,
          new_password: passwordData.new,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    const validatePasswordData = () => {
      if (!passwordData.current || !passwordData.new || !passwordData.repeat) {
        return false;
      }
      if (!(passwordData.new === passwordData.repeat)) return false;
      // todo: validate password
      return true;
    };

    const changePassword = () => {
      if (validatePasswordData()) {
        requestPasswordChange();
      }
    };

    return {
      sessions,
      logoutEverywhereModalOpen,
      logoutEverywhere,
      passwordData,
      changePassword,
      t,
    };
  },
};
</script>

<style lang='scss' scoped>
.logout-everywhere-wrappper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .btns-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;

    button {
      width: 30%;
    }
  }
}

.account-security-settings {
  display: grid;
  grid-template-columns: auto auto;
  align-items: stretch;

  a {
    color: $accent-color;
    font-size: 0.875rem;

    &:hover {
      text-decoration: underline;
    }
  }

  .active-sessions {
    grid-column: 1 / 3;
  }
}

.active-sessions {
  .header {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto auto;
  }

  .active-sessions-wrapper {
    display: flex;
    flex-direction: column;

    & > :first-child {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    & > :last-child {
      border-radius: 0 0 0.5rem 0.5rem;
      border-bottom: none;
    }
  }
}

.change-password {
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.two-fa {
  .header {
    display: flex;
    gap: 1rem;

    .chip {
      height: 35px;
    }
  }

  button {
    margin: 0 auto;
  }
}
</style>
