<template>
  <div class="dashboard-page user-view" v-if="userData">
    <!-- {{ $route.params.id }} -->
    <div class="user elevated-card">
      <div class="avatar-row">
        <i class="ph-user-square-light avatar-icon"></i>
        <div class="user-data">
          <CustomChip type="info" :customIconClass="userIconClass">{{ userRole }}</CustomChip>
          <p class="email">{{ userData.email }}</p>
        </div>
      </div>
      <div class="inputs-section">
        <div class="text-inputs">
          <CustomInput :label="t('shared.name')" v-model:value="userData.name" appearance="primary" autocomplete="name">
          </CustomInput>
          <CustomInput :label="t('shared.surname')" v-model:value="userData.surname" appearance="primary"
            autocomplete="surname"></CustomInput>
        </div>
        <CustomSelect :header="t('shared.gender')" iconClass="ph-gender-intersex-light" :options="genderOptions"
          v-model:selectedValue="userData.gender" appearance="primary"></CustomSelect>
      </div>
      <div class="user-account-buttons">
        <CustomButton type="error" class="block-account-button">Zablokuj konto</CustomButton>
        <CustomButton type="error" class="delete-account-button">{{ t('settings.userAccountSettings.deleteAccount') }}
        </CustomButton>
      </div>
      <div class="save-changes" v-if="userDataModified">
        <CustomButton class="save" type="success">{{ t('shared.saveChanges') }}</CustomButton>
        <CustomButton class="cancel" type="secondary">{{ t('shared.operationCancel') }}</CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { handleRequestError } from "@/utils";
import CustomChip from "@/components/CustomChip.vue";
import CustomInput from "@/components/CustomInput.vue";
import { useI18n } from "vue-i18n";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "UserView",
  components: {
    CustomChip,
    CustomInput,
    CustomSelect,
    CustomButton,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const store = useStore();
    const route = useRoute();

    const userData = ref(null);

    const userRole = ref(null);
    let userIconClass;

    // const userDataModified = computed(() =>
    //   storedUser.name !== userData.value.name
    // );

    const genderOptions = [
      {
        title: t('shared.male'),
        value: 'male',
        iconClass: 'ph-gender-male-light',
        iconAlt: 'male gender icon',
      },
      {
        title: t('shared.female'),
        value: 'female',
        iconClass: 'ph-gender-female-light',
        iconAlt: 'female gender icon',
      },
      {
        title: t('shared.other'),
        value: 'other',
        iconClass: 'ph-gender-neuter-light',
        iconAlt: 'other gender icon',
      }
    ];

    onMounted(async () => {
      const storedUser = store.getters.getUserById(route.params.id);

      if (storedUser) {
        userData.value = storedUser;
      } else {
        try {
          const response = await axios.get(`users/${route.params.id}`);
          userData.value = response.data;
        } catch (error) {
          handleRequestError(error);
        }
      }

      if (userData.value.isOwner) {
        userIconClass = "ph-user-gear-light";
        userRole.value = "Właściciel";
      } else if (userData.value.isAdmin) {
        userIconClass = "ph-wrench-light";
        userRole.value = "Admin";
      } else {
        userIconClass = "ph-user-light";
        userRole.value = "Użytkownik";
      }
    });

    return {
      t,
      userData,
      userRole,
      userIconClass,
      genderOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-view {
  .user {
    .avatar-row {
      display: flex;
      align-items: center;
      font-size: 1rem;

      .user-data {
        .email {
          font-size: 1.2rem;
        }
      }

      .avatar-icon {
        margin-left: -1.25rem;
        font-size: 10rem;
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
    }
  }
}
</style>
