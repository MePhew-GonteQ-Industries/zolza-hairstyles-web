<template>
  <div class="dashboard-page user-view" v-if="userData">
    <!-- {{ $route.params.id }} -->
    <div class="elevated-card">
      <div class="user" v-if="userData && !loading">
        <div class="avatar-row">
          <i class="ph-user-square-light avatar-icon"></i>
          <div class="user-data">
            <CustomChip type="info" :customIconClass="userIconClass">{{ userRole }} </CustomChip>
            <p class="email">{{ userData.email }}</p>
            <div class="indicators-wrapper">
              <div class="single-indicator">
                <p>Zweryfikowany</p>
                <StatusIndicator :statusSuccess="userData.verified"></StatusIndicator>
              </div>
              <div class="single-indicator">
                <p>Zablokowany</p>
                <StatusIndicator :statusSuccess="userData.blocked"></StatusIndicator>
              </div>
            </div>
          </div>
        </div>
        <div class="inputs-section">
          <div class="text-inputs">
            <CustomInput
              :label="t('shared.name')"
              v-model:value="userData.name"
              appearance="primary"
              autocomplete="name"
            >
            </CustomInput>
            <CustomInput
              :label="t('shared.surname')"
              v-model:value="userData.surname"
              appearance="primary"
              autocomplete="surname"
            ></CustomInput>
          </div>
          <CustomSelect
            :header="t('shared.gender')"
            iconClass="ph-gender-intersex-light"
            :options="genderOptions"
            v-model:selectedValue="userData.gender"
            appearance="primary"
            v-if="!loading"
          ></CustomSelect>
        </div>
        <div class="user-account-buttons">
          <CustomButton type="error" class="block-account-button">Zablokuj konto</CustomButton>
          <CustomButton type="error" class="delete-account-button"
            >{{ t("settings.userAccountSettings.deleteAccount") }}
          </CustomButton>
        </div>
        <div class="save-changes" v-if="userDataModified">
          <CustomButton class="save" type="success">{{ t("shared.saveChanges") }}</CustomButton>
          <CustomButton class="cancel" type="secondary"
            >{{ t("shared.operationCancel") }}
          </CustomButton>
        </div>
      </div>
      <div class="loader" v-else>
        <CustomLoader></CustomLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { createRequestErrorMessage } from "@/utils";
import CustomChip from "@/components/CustomChip.vue";
import CustomInput from "@/components/CustomInput.vue";
import { useI18n } from "vue-i18n";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomButton from "@/components/CustomButton.vue";
import StatusIndicator from "@/components/StatusIndicator.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import { useMessage } from "naive-ui";

export default {
  name: "UserView",
  components: {
    CustomChip,
    CustomInput,
    CustomSelect,
    CustomButton,
    StatusIndicator,
    CustomLoader,
  },
  setup() {
    const message = useMessage();
    const { t } = useI18n({ useScope: "global" });
    const store = useStore();
    const route = useRoute();

    const genderOptions = [
      {
        title: t("shared.male"),
        value: "male",
        iconClass: "ph-gender-male-light",
        iconAlt: "male gender icon",
      },
      {
        title: t("shared.female"),
        value: "female",
        iconClass: "ph-gender-female-light",
        iconAlt: "female gender icon",
      },
      {
        title: t("shared.other"),
        value: "other",
        iconClass: "ph-gender-neuter-light",
        iconAlt: "other gender icon",
      },
    ];

    const userData = ref(null);

    const userRole = ref(null);
    const loading = ref(true);
    let userIconClass;

    // const userDataModified = computed(() =>
    //   storedUser.name !== userData.value.name
    // );

    onMounted(async () => {
      const storedUser = store.getters.getUserById(route.params.id);

      if (storedUser) {
        userData.value = storedUser;
        userRole.value = userData.value.permission_level;
        switch (userRole.value) {
          case "Właściciel":
            userIconClass = "ph-user-gear-light";
            break;
          case "Admin":
            userIconClass = "ph-wrench-light";
            break;
          default:
            userIconClass = "ph-user-light";
            break;
        }
      } else {
        try {
          const response = await axios.get(`users/${route.params.id}`);
          userData.value = response.data;
          if (userData.value["permission_level"].includes("owner")) {
            userIconClass = "ph-user-gear-light";
            userRole.value = "Właściciel";
          } else if (userData.value["permission_level"].includes("admin")) {
            userIconClass = "ph-wrench-light";
            userRole.value = "Admin";
          } else {
            userIconClass = "ph-user-light";
            userRole.value = "Użytkownik";
          }
        } catch (error) {
          message.error(
            `Nie udało się pobrać danych użytkownika - ${createRequestErrorMessage(error)}`
          );
        }
      }

      switch (userData.value.gender) {
        case "Męska":
          userData.value.gender = "male";
          break;
        case "Żeńska":
          userData.value.gender = "female";
          break;
        case "Inna":
          userData.value.gender = "other";
          break;
      }
      loading.value = false;
    });

    return {
      t,
      userData,
      userRole,
      userIconClass,
      genderOptions,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.elevated-card {
  @media only screen and (max-width: $sm) {
    padding: 1rem;
  }
}

.user-view {
  .user {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .avatar-row {
      display: flex;
      align-items: center;
      font-size: 1rem;

      @media only screen and (max-width: $sm) {
        flex-direction: column;
      }

      .user-data {
        @media only screen and (max-width: $sm) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .email {
          font-size: 1.2rem;
        }
      }

      .avatar-icon {
        margin-left: -1.25rem;
        font-size: 10rem;
      }

      .indicators-wrapper {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-top: 10px;

        @media only screen and (max-width: $sm) {
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .single-indicator {
          display: flex;
          gap: 1rem;
        }
      }
    }

    .inputs-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      .text-inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

    .user-account-buttons {
      width: 100%;
      display: flex;
      gap: 1rem;
      justify-content: space-between;

      @media only screen and (max-width: $sm) {
        flex-direction: column;
      }
    }
  }
}
</style>
