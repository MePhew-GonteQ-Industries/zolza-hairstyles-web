<template>
  <div class="form-wrapper">
    <div class="icon-header">
      <h1>{{ t("resetPassword.requestPasswordReset.heading") }}</h1>
      <i class="ph-lock-key-bold"></i>
    </div>
    <h3>{{ t("resetPassword.requestPasswordReset.subtitle") }}</h3>

    <form @submit.prevent="handleResetPasswordRequest" novalidate>
      <div class="inputs">
        <CustomInput
          :label="t('resetPassword.requestPasswordReset.emailField.label')"
          iconClass="ph-envelope-simple-light"
          inputType="email"
          autocomplete="email"
          v-model:value="userEmail"
          :invalid="emailInvalid"
          :forceValidate="forceValidate"
          :required="true"
          :messageEmpty="
            t('resetPassword.requestPasswordReset.emailField.messageEmpty')
          "
          :messageInvalid="
            t('resetPassword.requestPasswordReset.emailField.messageInvalid')
          "
        />
      </div>

      <CustomButton class="btn">
        {{ t("resetPassword.requestPasswordReset.resetPasswordBtn") }}
      </CustomButton>
    </form>
    <div class="under-form-section">
      <router-link to="/login" class="return-link">
        <i class="ph-caret-left-bold"></i>
        <span>Powrót do logowania</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import validateEmail from '@/utils';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';

export default {
  name: 'RequestPasswordReset',
  components: {
    CustomInput,
    CustomButton,
  },
  setup() {
    const { t } = useI18n();

    const userEmail = ref('');

    const emailInvalid = computed(() => !validateEmail(userEmail.value));

    const forceValidate = ref(false);

    function validateEmailData() {
      forceValidate.value = true;

      if (!userEmail.value) {
        return false;
      }

      return validateEmail(userEmail.value);
    }

    function requestPasswordReset() {
      axios
        .post('auth/request-password-reset', {
          email: userEmail.value,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
              case 404: {
                console.error(error.response.status);
                break;
              }
              default: {
                console.error(error.response.status);
                break;
              }
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    }

    function handleResetPasswordRequest() {
      if (validateEmailData()) {
        requestPasswordReset();
      }
    }

    return {
      t,
      userEmail,
      handleResetPasswordRequest,
      emailInvalid,
      forceValidate,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
