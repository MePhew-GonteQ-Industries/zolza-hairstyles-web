<template v-if='resetToken'>
  <div class="wrapper">
    <h1>{{t('resetPassword.changePassword.heading')}}</h1>
    <form @submit.prevent='handlePasswordReset' novalidate>
      <input class="hidden-input" type="text" autocomplete="username">

      <CustomPasswordInput autocomplete="new-password"
      v-model:password="newPassword"
      :invalid="showValidationFeedback && (
      !newPasswordRepeat || newPasswordRepeat !== newPassword)"
      :label="t('resetPassword.changePassword.newPasswordField.label')"
      :required='true'
      :messageEmpty="t('resetPassword.changePassword.newPasswordField.messageEmpty')"
      :messageInvalid="t('resetPassword.changePassword.newPasswordField.messageInvalid')"
      @focus='passwordInputFocused = true'
      @blur='passwordInputFocused = false'/>

      <PasswordStrengthFeedback :password="newPassword" :show="passwordInputFocused"
      @score="onScore"/>

      <CustomPasswordInput autocomplete="new-password"
      :label="t('resetPassword.changePassword.repeatNewPasswordField.label')"
      v-model:password="newPasswordRepeat"
      :invalid="showValidationFeedback && (
      !newPasswordRepeat || newPasswordRepeat !== newPassword)"
      :required='true  '
      :messageEmpty="t('resetPassword.changePassword.repeatNewPasswordField.messageEmpty')"
      :messageInvalid="t('resetPassword.changePassword.repeatNewPasswordField.messageInvalid')"/>

      <CustomButton class="reset-password-btn"
      :content="t('resetPassword.changePassword.changePasswordBtn')"/>
    </form>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import CustomButton from '@/components/CustomButton.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import PasswordStrengthFeedback from '@/components/PasswordStrengthFeedback.vue';

export default {
  name: 'ChangePassword',
  components: {
    CustomButton,
    PasswordStrengthFeedback,
    CustomPasswordInput,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();

    const newPassword = ref('');
    const newPasswordRepeat = ref('');

    const newPasswordScore = ref(null);
    const newPasswordStrength = ref(null);

    const resetToken = ref(null);

    const showValidationFeedback = ref(false);

    const passwordInputFocused = false;

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
      t,
      resetPassword,
      resetToken,
      newPassword,
      newPasswordRepeat,
      handlePasswordReset,
      newPasswordScore,
      newPasswordStrength,
      onScore,
      showValidationFeedback,
      passwordInputFocused,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

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
    position: relative;
    max-width: 420px;
    box-sizing: content-box;

    .hidden-input {
        display: none;
    }
  }
}
</style>