<template v-if='resetToken'>
  <div class="form-wrapper">
    <div class="icon-header">
      <h1>{{ t("resetPassword.changePassword.heading") }}</h1>
      <i class="ph-lock-key-bold"></i>
    </div>
    <h3>{{ t("resetPassword.changePassword.subtitle") }}</h3>

    <form @submit.prevent="handlePasswordReset" novalidate>
      <div class="inputs">
        <input class="hidden-input" type="text" autocomplete="username" />

        <CustomInput
          :label="t('resetPassword.changePassword.newPasswordField.label')"
          autocomplete="new-password"
          type="password"
          v-model:value="newPassword"
          :invalid="!newPasswordRepeat || newPasswordRepeat !== newPassword"
          :forceValidate="forceValidate"
          :required="true"
          :messageEmpty="
            t('resetPassword.changePassword.newPasswordField.messageEmpty')
          "
          :messageInvalid="
            t('resetPassword.changePassword.newPasswordField.messageInvalid')
          "
          @focus="passwordInputFocused = true"
          @blur="passwordInputFocused = false"
        />

        <CustomInput
          :label="
            t('resetPassword.changePassword.repeatNewPasswordField.label')
          "
          autocomplete="new-password"
          type="password"
          v-model:value="newPasswordRepeat"
          :invalid="!newPasswordRepeat || newPasswordRepeat !== newPassword"
          :forceValidate="forceValidate"
          :required="true"
          :messageEmpty="
            t(
              'resetPassword.changePassword.repeatNewPasswordField.messageEmpty'
            )
          "
          :messageInvalid="
            t(
              'resetPassword.changePassword.repeatNewPasswordField.messageInvalid'
            )
          "
        />
      </div>

      <CustomButton class="btn">
        {{ t("resetPassword.changePassword.changePasswordBtn") }}
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
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';

export default {
  name: 'ChangePassword',
  components: {
    CustomInput,
    CustomButton,
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
      axios
        .put('auth/reset-password', {
          reset_token: resetToken.value,
          new_password: newPassword.value,
        })
        .then((response) => {
          if (response.status === 200) {
            const { email } = response.data;
            console.log(email);
            router.push({ name: 'login', params: { email } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const forceValidate = ref(false);

    function validatePasswordData() {
      forceValidate.value = true;

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
      passwordInputFocused,
      forceValidate,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
