<template>
  <div class="settings-page">
    <div class="elevated-card">
      <div class="avatar-row">
        <i class="ph-user-square-light avatar-icon"></i>
        <div class="user-data">
          <CustomChip type="info" :customIconClass="userIconClass">{{
            userRole
          }}</CustomChip>
          <p class="email">{{ $store.state.user.email }}</p>
          <p>{{ t("settings.userAccountSettings.userSince") }} {{ accountCreationDateStr }}</p>
          <p>({{ timeSinceCreationDate }})</p>
        </div>
      </div>
      <div class="inputs-section">
        <div class="text-inputs">
          <CustomInput
            :label="t('shared.name')"
            v-model:value="userData.name"
            appearance="primary"
            autocomplete="name"
          />
          <CustomInput
            :label="t('shared.surname')"
            v-model:value="userData.surname"
            appearance="primary"
            autocomplete="surname"
          />
        </div>
        <CustomSelect
          :header="t('shared.gender')"
          iconClass="ph-gender-intersex-light"
          :options="genderOptions"
          v-model:selectedValue="userData.gender"
          appearance="primary"
        />
      </div>
      <CustomButton
        type="error"
        class="delete-account-btn"
        @click="deleteAccountModalOpen = true"
        >{{ t("settings.userAccountSettings.deleteAccount") }}</CustomButton
      >
      <CustomModal v-model:open="deleteAccountModalOpen">
        <template #title>
           {{ t("settings.userAccountSettings.deleteAccountReassurance") }}</template>
        <div class="delete-account-wrappper">
          <div class="messages-wrapper">
            <MessageBox type="error">
              <template #title>{{ t("shared.warning") }}</template>
              <template #subtitle>
                {{ t("settings.userAccountSettings.deleteAccountInformation") }}
                <p>{{ t("settings.userAccountSettings.appointmentsCancellation") }}</p>
              </template>
            </MessageBox>
            <MessageBox
              type="error"
              v-if="$store.getters.isAdmin || $store.getters.isOwner"
            >
              <template #title>{{ t("shared.warning") }}</template>
              <template #subtitle>
                {{ t("settings.userAccountSettings.deleteHighLevelAccount") }}
              </template>
            </MessageBox>
          </div>
          <form @submit.prevent="" class="delete-account">
            <input
              type="text"
              autocomplete="username"
              class="hidden-input"
              id="hidden-username-input-delete-account"
            />
            <label for="hidden-username-input-delete-account"></label>
            <div class="input-with-title">
              <p>{{ t("settings.userAccountSettings.password") }}</p>
              <CustomInput
                :label="t('shared.password')"
                autocomplete="current-password"
                type="password"
                :required="true"
                v-model:value="deleteAccountPassword"
              />
            </div>
            <div class="input-with-title">
              <p>
                {{ t("settings.userAccountSettings.confirmationQuote") }}
                <span class="confirm-delete">{{
                  t("settings.userAccountSettings.confirmDeleteAccount")
                }}</span>
                :
              </p>
              <CustomInput
                :label="t('settings.userAccountSettings.confirmDeleteAccount')"
                iconClass="ph-trash-light"
                autocomplete=""
                v-model:value="confirmAccountDeletion"
              />
            </div>
            <div class="buttons-row">
              <CustomButton type="error" @click="deleteAccount"
                >{{ t("settings.userAccountSettings.confirmationButton") }}</CustomButton
              >
              <CustomButton
                type="secondary"
                @click="deleteAccountModalOpen = false"
                >{{ t("shared.operationCancel") }}</CustomButton
              >
            </div>
          </form>
        </div>
      </CustomModal>
      <MessageBox
        interactive
        :interactionHandler="requestEmailVerification"
        type="warning"
        v-if="!$store.state.user.verified"
      >
        <template #title>
          {{ t("settings.userAccountSettings.emailLabel") }} {{ $store.state.user.email }}
          {{ t("settings.userAccountSettings.emailNotConfirmed") }}
        </template>
        <template #subtitle>  {{ t("settings.userAccountSettings.emailLinkResend") }} </template>
      </MessageBox>
      <div class="save-changes" v-if="userDatamodified">
        <CustomButton class="save" type="success" @click="changeUserData"
          >{{ t("shared.saveChanges") }}</CustomButton
        >
        <CustomModal v-model:open="passwordPromptOpen">
          <template #title> {{ t("settings.userAccountSettings.passwordInput") }} </template>
          <div class="logout-everywhere-wrappper">
            <MessageBox type="info">
              <template #title>
                {{ t("settings.userAccountSettings.keyDataModification") }}</template>
              <template #subtitle
                >{{ t("settings.userAccountSettings.identityConfirmation") }}</template>
            </MessageBox>
            <form @submit.prevent="changeUserDataSudoMode">
              <input
                class="hidden-input"
                type="text"
                autocomplete="username"
                id="password-prompt-hidden-username-input"
              />
              <label for="password-prompt-hidden-username-input"></label>
              <div class="enter-password-wrapper">
                <CustomInput
                  :label="t('shared.password')"
                  autocomplete="new-password"
                  type="password"
                  v-model:value="password"
                />
                <router-link to="/password-reset" tabindex="-1"
                  >{{ t("shared.forgotYourPassword") }}</router-link
                >
              </div>
              <div class="buttons-row">
                <CustomButton type="success" @click="changeUserDataSudoMode"
                  >{{ t("settings.userAccountSettings.next") }}</CustomButton
                >
                <CustomButton
                  type="secondary"
                  @click="passwordPromptOpen = false"
                  >{{ t("shared.operationCancel") }}</CustomButton
                >
              </div>
            </form>
          </div>
        </CustomModal>
        <CustomButton type="secondary" class="cancel" @click="revertChanges"
          >{{ t("shared.operationCancel") }}</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomChip from '@/components/CustomChip.vue';
import MessageBox from '@/components/MessageBox.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomModal from '@/components/CustomModal.vue';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import TimeAgo from '@/timeAgo';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import { useRouter } from 'vue-router';

export default {
  name: 'UserAccountSettings',
  components: {
    CustomInput,
    CustomSelect,
    CustomChip,
    MessageBox,
    CustomButton,
    CustomModal,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const store = useStore();
    const locale = store.state.settings.language;

    const userData = reactive({
      name: store.state.user.name,
      surname: store.state.user.surname,
      gender: store.state.user.gender,
    });

    let userRole;
    let userIconClass;

    if (store.getters.isOwner) {
      userIconClass = 'ph-user-gear-light';
      userRole = 'Właściciel';
    } else if (store.getters.isAdmin) {
      userIconClass = 'ph-wrench-light';
      userRole = 'Administrator';
    } else {
      userIconClass = 'ph-user-light';
      userRole = 'Użytkownik';
    }

    const userDatamodified = computed(
      () => store.state.user.name !== userData.name
        || store.state.user.surname !== userData.surname
        || store.state.user.gender !== userData.gender,
    );

    const revertChanges = () => {
      userData.name = store.state.user.name;
      userData.surname = store.state.user.surname;
      userData.gender = store.state.user.gender;
    };

    const genderOptions = [
      {
        title: 'Male',
        value: 'male',
        iconClass: 'ph-gender-male-light',
        iconAlt: 'male gender icon',
      },
      {
        title: 'Female',
        value: 'female',
        iconClass: 'ph-gender-female-light',
        iconAlt: 'female gender icon',
      },
      {
        title: 'Other',
        value: 'other',
        iconClass: 'ph-gender-neuter-light',
        iconAlt: 'other gender icon',
      },
    ];

    const deleteAccountModalOpen = ref(false);

    const accountCreationDate = new Date(`${store.state.user.createdAt}Z`);

    const accountCreationDateStr = accountCreationDate.toLocaleTimeString(
      locale,
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );

    const timeAgo = new TimeAgo(locale);

    const timeSinceCreationDate = timeAgo.format(accountCreationDate);

    const validateUserData = () => {
      if (
        !userData.name
        || userData.name.length < 3
        || userData.name.length > 50
      ) {
        return false;
      }
      if (
        !userData.surname
        || userData.surname.length < 3
        || userData.surname.length > 50
      ) {
        return false;
      }

      return true;
    };

    const requestEmailVerification = () => {
      axios
        .post('/users/request-email-verification', {
          email: store.state.user.email,
        })
        .then((response) => {
          if (response.status === 202) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    const passwordPromptOpen = ref(false);

    const password = ref('');

    const requestUserDataChange = () => {
      axios
        .put('/users/me/update-details', {
          name: userData.name,
          surname: userData.surname,
          gender: userData.gender,
        })
        .then((response) => {
          if (response.status === 200) {
            store.commit('setUserData', response.data);
          }
        })
        .catch((error) => {
          const { status } = handleRequestError(error);
          if (status === 403) {
            passwordPromptOpen.value = true;
          }
        });
    };

    const changeUserData = () => {
      if (validateUserData()) {
        if (store.getters.sudoModeActive) {
          requestUserDataChange();
        } else {
          passwordPromptOpen.value = true;
        }
      }
    };

    const changeUserDataSudoMode = () => {
      if (password.value) {
        store.dispatch('enterSudoMode', password.value).then(() => {
          passwordPromptOpen.value = false;
          changeUserData();
        });
      }
    };

    const deleteAccountPassword = ref('');
    const confirmAccountDeletion = ref('');

    const validateDeleteData = () => {
      if (!deleteAccountPassword.value) return false;
      if (
        confirmAccountDeletion.value
        !== t('userAccountSettings.confirmDeleteAccount')
      ) {
        return false;
      }

      return true;
    };

    const requestAccountDeletion = () => {
      axios
        .put(
          'users/me/delete',
          new URLSearchParams({
            password: deleteAccountPassword.value,
          }),
        )
        .then(() => {
          store.dispatch('logout').then(() => {
            router.push({ name: 'home' });
          });
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    const deleteAccount = () => {
      if (validateDeleteData()) {
        requestAccountDeletion();
      }
    };

    return {
      userData,
      userRole,
      userIconClass,
      userDatamodified,
      revertChanges,
      genderOptions,
      deleteAccountModalOpen,
      accountCreationDateStr,
      timeSinceCreationDate,
      changeUserData,
      requestEmailVerification,
      passwordPromptOpen,
      password,
      changeUserDataSudoMode,
      deleteAccount,
      deleteAccountPassword,
      confirmAccountDeletion,
      t,
    };
  },
};
</script>

<style lang='scss' scoped>
.delete-account-wrappper,
.logout-everywhere-wrappper {
  .buttons-row {
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;
    @media only screen and (max-width: $xs){
      flex-direction: column;
    }
    button {
      width: 100%;
    }
  }
}

.logout-everywhere-wrappper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .enter-password-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-block: 1rem;

    a {
      padding: 0;
      font-size: inherit;
      color: $accent-color;
      font-size: 0.875rem;
      align-self: flex-end;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .btns-wrapper {
    display: flex;
  }
}

.delete-account-wrappper {
  display: flex;
  flex-direction: column;

  .messages-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .delete-account {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-with-title {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      gap: 0.375rem;
    }

    .confirm-delete {
      font-style: italic;
      font-weight: 200;
    }
  }
}

.avatar-row {
  display: flex;
  align-items: center;
  font-size: 1rem;
  @media only screen and (max-width: $xs){
    flex-direction: column;
  }

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
  display: grid;
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: $xs){
    display: flex;
    flex-direction: column;
  }

  .text-inputs {
    display: flex;
    gap: inherit;
    @media only screen and (max-width: $xs){
      flex-direction: column;
    }
  }

  .input-wrapper,
  .select-wrapper {
    height: 55px;
    width: 200px;
  }
}

.delete-account-btn {
  margin-left: auto;
  width: 200px;
  @media only screen and (max-width: $xs){
    position: absolute;
    top: 18vh;
    left: 2vw;
    width: 115px;
  }
}

.save-changes {
  display: flex;
  gap: 1rem;
  @media only screen and (max-width: $xs){
    margin: auto;
  }

  .save {
    width: 170px;
  }

  .cancel {
    width: 100px;
  }
}
</style>
