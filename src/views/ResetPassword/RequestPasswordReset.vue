<template>
  <div class="recovery-wrapper">
    <h1>{{t('resetPassword.requestPasswordReset.heading')}}</h1>
    <div class="description">
      <h2>{{t('resetPassword.requestPasswordReset.description[0]')}}</h2>
      <h2>{{t('resetPassword.requestPasswordReset.description[1]')}}</h2>
    </div>

    <form @submit.prevent='handleResetPasswordRequest' novalidate>

    <CustomInput :label="t('resetPassword.requestPasswordReset.emailField.label')"
    :iconSrc='emailIcon' inputType='email'
    autocomplete="email" v-model:value="userEmail"
    :invalid="emailInvalid" :forceValidate="forceValidate" :required='true'
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
      userEmail,
      emailIcon,
      handleResetPasswordRequest,
      emailInvalid,
      forceValidate,
    };
  },
};
</script>

<style lang="scss" scoped>
.recovery-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 600px;

      h2 {
      font-size: 1em;
      font-weight: normal;
    }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 1em;
      font-weight: normal;
    }
  }

  h1 {
    font-size: 3rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all .3s;
    padding: 100px 20px;
    max-width: 420px;
    position: relative;
    box-sizing: content-box;
  }
}
</style>
