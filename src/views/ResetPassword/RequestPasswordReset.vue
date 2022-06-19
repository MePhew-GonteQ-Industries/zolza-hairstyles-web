<template>
  <div class="recovery-wrapper">
    <h1>{{t('resetPassword.requestPasswordReset.heading')}}</h1>
    <h2>{{t('resetPassword.requestPasswordReset.description')}}</h2>

    <form @submit.prevent='handleResetPasswordRequest' novalidate>

    <CustomInput :label="t('resetPassword.requestPasswordReset.emailField.label')"
    :iconSrc='emailIcon' inputType='email'
    autocomplete="email" v-model:value="userEmail"
    :invalid="showValidationFeedback && emailInvalid"
    :required='true'
    :messageEmpty="t('resetPassword.requestPasswordReset.emailField.messageEmpty')"
    :messageInvalid="t('resetPassword.requestPasswordReset.emailField.messageInvalid')"/>

    <CustomButton class="reset-password-btn"
    :content="t('resetPassword.requestPasswordReset.resetPasswordBtn')"/>

    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import validateEmail from '@/utils';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import emailIcon from '@/assets/email.svg';

export default {
  name: 'RequestPasswordReset',
  components: {
    CustomInput,
    CustomButton,
  },
  setup() {
    const { t } = useI18n();

    const showValidationFeedback = ref(false);
    const userEmail = ref('');

    const emailInvalid = computed(() => !validateEmail(userEmail.value));

    function validateEmailData() {
      showValidationFeedback.value = true;

      if (!userEmail.value) {
        return false;
      }

      return validateEmail(userEmail.value);
    }

    function requestPasswordReset() {
      axios.post('auth/request-password-reset', {
        email: userEmail.value,
      }).then((response) => {
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
      showValidationFeedback,
      userEmail,
      emailIcon,
      handleResetPasswordRequest,
      emailInvalid,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1em;
  font-weight: normal;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all .3s;
  background-color: rgba(39, 42, 54, .6);
  padding: 100px 20px;
  border-radius: 20px;
  position: relative;

  .hidden-input {
      display: none;
  }
}
</style>
