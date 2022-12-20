<template>
  <div class="form-wrapper">
    <div class="icon-header">
      <h1>{{ t("resetPassword.requestPasswordReset.heading") }}</h1>
      <i class="ph-lock-key-bold"></i>
    </div>
    <h3>{{ t("resetPassword.requestPasswordReset.subtitle") }}</h3>

    <form @submit.prevent="handleResetPasswordRequest" novalidate>
      <div class="inputs">
        <CustomInput :label="t('shared.email')" iconClass="ph-envelope-simple-light" inputType="email"
          autocomplete="email" v-model:value="userEmail" :invalid="emailInvalid" :forceValidate="forceValidate"
          :required="true" :messageEmpty="t('shared.emailEmpty')" :messageInvalid="t('shared.emailInvalid')" />
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
import { ref, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { validateEmail, handleRequestError } from "@/utils";
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import { useMessage } from 'naive-ui';

export default {
  name: "RequestPasswordReset",
  components: {
    CustomInput,
    CustomButton,
  },
  setup() {
    const { t } = useI18n();
    const message = useMessage();

    const userEmail = ref("");

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
        .post("auth/request-password-reset", {
          email: userEmail.value,
        })
        .then(() => {
          message.success(t('snackBars.passwordReset'));
        })
        .catch((error) => {
          const response = handleRequestError(error);
          message.error(`${t('snackBars.passwordResetError')} ${response.status}, ${response.data.detail}`);
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
      message,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
