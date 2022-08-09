<template>
  <div class="settings-page">
    <div class="elevated-card session-card" v-if="session">
      <div class="header">
        <div class="icon-wrapper">
          <CustomTooltip type="info">
            <template #activator>
              <i
                :class="session.iconClass || 'ph-question-light'"
                class="session-icon"
              ></i>
            </template>
            {{ session.deviceTooltip }}
          </CustomTooltip>
        </div>
        <div class="title">
          <p class="section-title">Urządzenie:</p>
          <span>{{ session.deviceTooltip }}</span>
          <span
            v-if="
              session.last_access_data.user_agent_info.device.family &&
              session.last_access_data.user_agent_info.device.family !== 'Other'
            "
          >
            {{ session.last_access_data.user_agent_info.device.family }}
            {{ session.last_access_data.user_agent_info.brand }}
            {{ session.last_access_data.user_agent_info.model }}
          </span>
        </div>

        <CustomButton
          type="warning"
          class="logout-btn"
          v-if="!(session.id === $store.state.auth.sessionId)"
          @click="logoutModalOpen = true"
          >Wyloguj się</CustomButton
        >
        <CustomChip type="info" class="current-session-chip" v-else>
          Twoja obecna sesja
        </CustomChip>
        <CustomModal v-model:open="logoutModalOpen">
          <template #title>
            Czy na pewno chcesz wylogować się z tego urządzenia?
          </template>
          <div class="logout-everywhere-wrappper">
            <MessageBox type="warning">
              <template #title>UWAGA</template>
              <template #subtitle> Akcja jest nieodwracalna </template>
            </MessageBox>
            <div class="btns-wrapper">
              <CustomButton type="warning" @click="logout"
                >Wyloguj</CustomButton
              >
              <CustomButton type="secondary" @click="logoutModalOpen = false"
                >Anuluj</CustomButton
              >
            </div>
          </div>
        </CustomModal>
      </div>
      <div class="sessions-data">
        <div class="data-wrapper">
          <div class="session-data">
            <p class="section-title">Ostatni dostęp:</p>
            <p>{{ session.last_accessed_str }}</p>
            <p>({{ session.timeSinceLastAccessed }})</p>
          </div>
          <div class="session-data">
            <p class="section-title">Adres ip:</p>
            <p>{{ session.last_access_data.ip_address }}</p>
          </div>
          <div class="session-data">
            <p class="section-title">Lokalizacja:</p>
            <template v-if="session.last_access_data.location">
              <p>
                {{ session.last_access_data.location.city }},
                {{ session.last_access_data.location.region }},
                {{ session.last_access_data.location.country }}
              </p>
              <CustomButton
                type="info"
                class="show-on-map-btn"
                @click="showLastAccessMap"
                >Pokaż na mapie</CustomButton
              >
            </template>
            <p v-else>Brak danych</p>
          </div>
          <CustomMap
            v-if="session.last_access_data.location"
            :location="session.last_access_data.location"
            :show="lastAccessMapLoaded"
          />
        </div>

        <div class="data-wrapper">
          <div class="session-data">
            <p class="section-title">Logowanie:</p>
            <p>{{ session.first_accessed_str }}</p>
            <p>({{ session.timeSinceFirstAccessed }})</p>
          </div>
          <div class="session-data">
            <p class="section-title">Adres ip:</p>
            <p>{{ session.sign_in_data.ip_address }}</p>
          </div>
          <div class="session-data">
            <p class="section-title">Lokalizacja:</p>
            <template v-if="session.sign_in_data.location">
              <p>
                {{ session.sign_in_data.location.city }},
                {{ session.sign_in_data.location.region }},
                {{ session.sign_in_data.location.country }}
              </p>
              <CustomButton
                type="info"
                class="show-on-map-btn"
                @click="showSignInMap"
                >Pokaż na mapie</CustomButton
              >
            </template>
            <p v-else>Brak danych</p>
          </div>
          <CustomMap
            v-if="session.sign_in_data.location"
            :location="session.sign_in_data.location"
            :show="signInMapLoaded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import CustomButton from '@/components/CustomButton.vue';
import CustomTooltip from '@/components/CustomTooltip.vue';
import CustomModal from '@/components/CustomModal.vue';
import MessageBox from '@/components/MessageBox.vue';
import CustomChip from '@/components/CustomChip.vue';
import CustomMap from '@/components/CustomMap.vue';
import TimeAgo from '@/timeAgo';

export default {
  name: 'SessionView',
  components: {
    CustomButton,
    CustomTooltip,
    CustomModal,
    MessageBox,
    CustomChip,
    CustomMap,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const locale = store.state.settings.language;

    const sessionData = ref(null);

    const timeAgo = new TimeAgo(locale);

    const session = computed(() => {
      if (!sessionData.value) return null;

      const sessionTemp = sessionData.value;

      const lastAccessed = new Date(`${sessionTemp.last_accessed}Z`);

      sessionTemp.last_accessed_str = lastAccessed.toLocaleTimeString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      sessionTemp.timeSinceLastAccessed = timeAgo.format(lastAccessed);

      const firstAccessed = new Date(`${sessionTemp.first_accessed}Z`);

      sessionTemp.first_accessed_str = firstAccessed.toLocaleTimeString(
        locale,
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );

      sessionTemp.timeSinceFirstAccessed = timeAgo.format(firstAccessed);

      let sessionIcon;

      const userAgentInfo = sessionTemp.last_access_data.user_agent_info;

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
        if (sessionTemp.last_access_data.user_agent.includes('dart')) {
          sessionIcon = 'ph-device-mobile-light';
          deviceTooltip = 'Aplikacja Zołza Hairstyles na urządzenia mobilne';
        }
      }

      sessionTemp.iconClass = sessionIcon;
      sessionTemp.deviceTooltip = deviceTooltip;

      return sessionTemp;
    });

    onMounted(async () => {
      const storedSession = store.getters.getSessionById(route.params.id);

      if (storedSession) {
        sessionData.value = storedSession;
      } else {
        try {
          const response = await axios.get(`auth/sessions/${route.params.id}`);
          sessionData.value = response.data;
        } catch (error) {
          handleRequestError(error);
        }
      }
    });

    const logoutModalOpen = ref(false);

    const logout = () => {
      axios
        .delete(`auth/revoke-session/${session.value.id}`)
        .then((response) => {
          if (response.status === 200) {
            store.dispatch('deleteSessions');
            router.push({ name: 'accountSecuritySettings' });
          }
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    const lastAccessMapLoaded = ref(false);
    const signInMapLoaded = ref(false);

    const showLastAccessMap = () => {
      lastAccessMapLoaded.value = true;
    };

    const showSignInMap = () => {
      signInMapLoaded.value = true;
    };

    return {
      session,
      logoutModalOpen,
      logout,
      showLastAccessMap,
      showSignInMap,
      lastAccessMapLoaded,
      signInMapLoaded,
    };
  },
};
</script>

<style lang="scss" scoped>
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

.section-title {
  font-weight: bold;
}

.session-card {
  width: 80%;
  min-width: 600px;
  padding-block: 1rem;

  .header {
    display: grid;
    gap: 1rem;
    grid-template-columns: 8rem auto auto;

    button {
      width: 150px;
      align-self: center;
      justify-self: center;
    }

    .current-session-chip {
      margin-top: 1rem;
      height: 40px;
    }

    .title {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
    }
  }

  .sessions-data {
    display: flex;
    flex-direction: column;

    & > :first-child {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    & > :last-child {
      border-radius: 0 0 0.5rem 0.5rem;
      border-bottom: none;
    }

    .data-wrapper {
      display: grid;
      grid-template-columns: auto auto auto;
      background-color: $background-accent-low;
      padding: 1rem;
      border-bottom: thin solid $secondary-color;
      align-items: center;
      gap: 1rem;

      &:hover {
        background-color: $background-accent-medium;
      }

      .session-data {
        display: flex;
        flex-direction: column;
        height: 100%;

        .show-on-map-btn {
          margin-top: 1rem;
          align-self: center;
        }
      }

      .map {
        grid-column: 1/4;
      }
    }
  }

  .session-icon {
    font-size: 8rem;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
