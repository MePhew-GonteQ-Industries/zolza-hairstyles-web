<template>
  <div class="settings-page">
    <div class="settings-card">
      <div class="avatar-row">
        <i class="ph-user-square-light avatar-icon"></i>
        <div class="user-data">
          <CustomChip type="info" :customIconClass="userIconClass"
            >{{ userRole }}</CustomChip
          >
          <p class="email">{{ $store.state.user.email }}</p>
          <p class="username">Kwakwa Bisaga!</p>
        </div>
        Użytkownik od {{ accountCreatedTimeAgo }}
      </div>
      <div class="inputs-section">
        <div class="text-inputs">
          <CustomInput label="Imię" v-model:value="userData.name" />
          <CustomInput label="Nazwisko" v-model:value="userData.surname" />
        </div>
        <CustomSelect
          header="Płeć"
          iconClass="ph-gender-intersex-light"
          :options="genderOptions"
          v-model:selectedValue="userData.gender"
        />
      </div>
      <CustomButton
        type="error"
        class="delete-account"
        @click="deleteAccountModalOpen = true"
        >Usuń konto</CustomButton
      >
      <CustomModal v-model:open="deleteAccountModalOpen">
        <template #title>
          Czy jesteś pewny że chcesz usunąć swoje konto?
        </template>
        <CustomButton type="success">Kwakwa</CustomButton>
        <CustomButton type="error">Kwakwa</CustomButton>
      </CustomModal>
      <MessageBox type="warning" v-if="!$store.state.user.verified">
        <template #title>
          Twój adres email {{ $store.state.user.email }}
          nie jest potwierdzony. Sprawdź swoją skrzynkę pocztową.
        </template>
        <template #subtitle> Wyślij link ponownie </template>
      </MessageBox>
      <div class="save-changes" v-if="userDatamodified">
        <CustomButton class="save">Zapisz zmiany</CustomButton>
        <CustomButton type="secondary" class="cancel" @click="revertChanges"
          >Anuluj</CustomButton
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
import { useTimeAgo } from '@vueuse/core';

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
    const store = useStore();

    const userData = reactive({
      name: store.state.user.name,
      surname: store.state.user.surname,
      gender: store.state.user.gender,
    });

    const accountCreatedTimeAgo = useTimeAgo(
      store.state.user.created_at,
    );

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

    return {
      userData,
      accountCreatedTimeAgo,
      userRole,
      userIconClass,
      userDatamodified,
      revertChanges,
      genderOptions,
      deleteAccountModalOpen,
    };
  },
};
</script>

<style lang='scss'>
.settings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.settings-card {
  display: grid;
  grid-template-rows: auto;
  background-color: $background-accent-low;
  box-shadow: 0 0 8px -2px $box-shadow-color;
  border-radius: 0.375rem;
  padding: 2.188rem 2.125rem;
  gap: 1rem;

  .avatar-row {
    display: flex;
    align-items: center;
    font-size: 1rem;

    .user-data {
      .username {
        font-size: 1.5rem;
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

    .text-inputs {
      display: flex;
      gap: inherit;
    }

    .input-wrapper,
    .select-wrapper {
      height: 55px;
      width: 200px;
    }
  }

  .delete-account {
    margin-left: auto;
    width: 200px;
  }

  .save-changes {
    display: flex;
    gap: 1rem;

    .save {
      width: 170px;
    }

    .cancel {
      width: 100px;
    }
  }
}
</style>
