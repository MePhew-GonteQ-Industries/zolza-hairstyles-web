<template>
  <section class="app-page" id="recover-password-page">
    <div class="recovery-wrapper">
      <template v-if='!resetToken'>
        <h2>Enter your email address and we will send you a password reset link</h2>
        <form @submit.prevent='handleResetPasswordRequest' novalidate>
        <CustomInput label='Email' :iconSrc='emailIcon' inputType='email'
        autocomplete="email" v-model:value="userEmail"
        :invalid="showValidationFeedback && emailInvalid"/>
        <CustomButton class="reset-password-btn" content="Reset password"/>
        </form>
      </template>
      <template v-if='resetToken'>
        <h2>Enter your new password below</h2>
        <form @submit.prevent='handlePasswordReset' novalidate>
          <input class="hidden-input" type="text" autocomplete="username">
          <CustomPasswordInput autocomplete="new-password"
          v-model:password="newPassword"
          :invalid="showValidationFeedback && (
            !newPasswordRepeat || newPasswordRepeat !== newPassword)"
            label='New Password'/>
          <div class="password-strength-feedback" v-if="newPassword">
            <span>{{ newPasswordStrength }}  {{ newPasswordScore }}</span>
            <password-meter :password="newPassword" @score="onScore"/>
          </div>
          <CustomPasswordInput autocomplete="new-password" label="Repeat password"
          v-model:password="newPasswordRepeat"
          :invalid="showValidationFeedback && (
            !newPasswordRepeat || newPasswordRepeat !== newPassword)"
          />
          <CustomButton class="reset-password-btn" content="Change password"/>
        </form>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import PasswordMeter from 'vue-simple-password-meter';
import validateEmail from '@/utils';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import emailIcon from '@/assets/email.svg';

export default {
  name: 'RecoverPassword',
  components: {
    CustomInput,
    CustomButton,
    PasswordMeter,
    CustomPasswordInput,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const showValidationFeedback = ref(false);
    const userEmail = ref('');
    const newPassword = ref('');
    const newPasswordRepeat = ref('');

    const newPasswordScore = ref(null);
    const newPasswordStrength = ref(null);

    const emailInvalid = computed(() => validateEmail(userEmail));

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

    const resetToken = ref(null);

    onMounted(() => {
      const { query } = route;
      if (query) {
        const { token } = query;
        if (token) {
          resetToken.value = token;
        }
      }
    });

    function resetPassword() {
      showValidationFeedback.value = false;
      axios.put('auth/reset-password', {
        reset_token: resetToken.value,
        new_password: newPassword.value,
      })
        .then((response) => {
          if (response.status === 200) {
            const { email } = response.data;
            console.log(email);
            router.push({ name: 'Login', params: { email } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function handleResetPasswordRequest() {
      if (validateEmailData()) {
        requestPasswordReset();
      }
    }

    function validatePasswordData() {
      showValidationFeedback.value = true;

      if (!newPassword.value) {
        return false;
      }

      if (!newPasswordRepeat.value) {
        return false;
      }

      if (!newPassword.value === newPasswordRepeat.value) {
        return false;
      }

      if (newPasswordScore.value < 3) {
        return false;
      }

      return true;
    }

    function handlePasswordReset() {
      if (validatePasswordData()) {
        resetPassword();
      }
    }

    function onScore(payload) {
      newPasswordScore.value = payload.score;
      newPasswordStrength.value = payload.strength;
    }

    return {
      showValidationFeedback,
      userEmail,
      emailIcon,
      handleResetPasswordRequest,
      emailInvalid,
      resetPassword,
      resetToken,
      newPassword,
      newPasswordRepeat,
      handlePasswordReset,
      newPasswordScore,
      newPasswordStrength,
      onScore,
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
