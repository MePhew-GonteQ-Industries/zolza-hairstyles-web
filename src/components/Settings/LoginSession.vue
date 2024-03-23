<template>
  <div class="login-session">
    <div class="session-data">
      <div class="header">
        <CustomTooltip type="info">
          <template #activator>
            <i
              :class="session.iconClass ? session.iconClass : 'ph-question-light'"
              class="device-icon"
            ></i>
          </template>
          <span>{{ session.deviceTooltip }}</span>
        </CustomTooltip>
        <span
          class="location"
          v-if="session.last_access_data.location"
        >
          <span>{{ session.last_access_data.location.country }}</span
          >, <span>{{ session.last_access_data.location.region }}</span>
        </span>
      </div>
      <div class="content">
        <span class="title">
          <router-link :to="`sessions/${session.id}`"
            ><span v-if="session.last_access_data.location">{{
              session.last_access_data.location.city
            }}</span>
            <span>&nbsp;{{ session.last_access_data.ip_address }}</span></router-link
          >
        </span>
        <span class="last-access-notice">
          <template v-if="session.id === $store.state.auth.sessionId">Twoja obecna sesja </template>
          <template v-else> Ostatni dostęp {{ session.last_accessed_str }} </template>
        </span>
      </div>
    </div>
    <LinkButton
      type="info"
      :to="`sessions/${session.id}`"
      class="details-link"
    >
      Szczegóły
    </LinkButton>
  </div>
</template>

<script>
import LinkButton from "@/components/LinkButton.vue";
import CustomTooltip from "@/components/CustomTooltip.vue";

export default {
  name: "LoginSession",
  components: {
    LinkButton,
    CustomTooltip,
  },
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.login-session {
  display: grid;
  grid-template-columns: auto auto;
  background-color: $background-accent-low;
  padding: 1rem;
  border-bottom: thin solid $secondary-color;
  align-items: center;
  @media only screen and (max-width: $xs) {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    background-color: $background-accent-medium;
  }

  .session-data {
    display: grid;
    grid-template-columns: 140px auto;
    align-items: center;
    gap: 1rem;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .device-icon {
        font-size: 3rem;
        color: $secondary-text-color;
      }
    }

    .content {
      display: flex;
      flex-direction: column;

      .title {
        a {
          color: $secondary-text-color;
          padding: 0;
          font-size: 1.125rem;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .details-link {
    width: 100px;
    justify-self: flex-end;
    height: 40px;
  }
}
</style>
