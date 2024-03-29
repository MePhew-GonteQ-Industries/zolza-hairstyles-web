<template>
  <section class="app-page form-page">
    <div class="form-wrapper">
      <h1>{{ t("signUp.heading") }}</h1>
      <h3>{{ t("signUp.subtitle") }}</h3>

      <form
        @submit.prevent="handleSubmit"
        novalidate
      >
        <div class="inputs">
          <input
            id="sign-up-hidden-username-input"
            class="hidden-input"
            type="text"
            autocomplete="username"
          />
          <label for="sign-up-hidden-username-input"></label>

          <div class="names">
            <CustomInput
              :label="t('shared.name')"
              iconClass="ph-identification-card-light"
              autocomplete="given-name"
              type="name"
              :required="true"
              :messageEmpty="t('signUp.nameField.messageEmpty')"
              :messageInvalid="t('signUp.nameField.messageInvalid')"
              v-model:value="userData.name"
              :forceValidate="forceValidate"
              :invalid="!userData.name"
            />

            <CustomInput
              :label="t('shared.surname')"
              iconClass="ph-identification-card-light"
              autocomplete="family-name"
              type="name"
              v-model:value="userData.surname"
              :required="true"
              :messageEmpty="t('signUp.surnameField.messageEmpty')"
              :messageInvalid="t('signUp.surnameField.messageInvalid')"
              :invalid="!userData.surname"
              :forceValidate="forceValidate"
            />
          </div>

          <CustomInput
            :label="t('shared.email')"
            iconClass="ph-envelope-simple-light"
            autocomplete="email"
            type="email"
            v-model:value="userData.email"
            :required="true"
            :messageEmpty="t('shared.emailEmpty')"
            :messageInvalid="t('shared.emailInvalid')"
            :invalid="emailInvalid"
            :forceValidate="forceValidate"
          />

          <CustomSelect
            :header="t('shared.gender')"
            iconClass="ph-gender-intersex-light"
            :options="genderOptions"
            v-model:selected-value="userData.gender"
            :required="true"
            :messageEmpty="t('signUp.genderField.messageEmpty')"
            :messageInvalid="t('signUp.genderField.messageInvalid')"
            :invalid="!userData.gender"
            :forceValidate="forceValidate"
          />

          <CustomInput
            :label="t('shared.password')"
            autocomplete="new-password"
            type="password"
            v-model:value="userData.password"
            :invalid="!passwordRepeat || passwordRepeat !== userData.password"
            :forceValidate="forceValidate"
            :required="true"
            :messageEmpty="t('signUp.passwordField.messageEmpty')"
            :messageInvalid="t('signUp.passwordField.messageInvalid')"
          />

          <CustomInput
            :label="t('signUp.repeatPasswordField.label')"
            autocomplete="new-password"
            type="password"
            v-model:value="passwordRepeat"
            :invalid="!passwordRepeat || passwordRepeat !== userData.password"
            :forceValidate="forceValidate"
            :required="true"
            :messageEmpty="t('signUp.repeatPasswordField.messageEmpty')"
            :messageInvalid="t('signUp.repeatPasswordField.messageInvalid')"
          />
        </div>

        <div class="under-inputs-section">
          <CustomCheckbox
            v-model:checked="termsAccepted"
            :forceValidate="forceValidate"
            :messageUnchecked="t('signUp.checkbox.messageUnchecked')"
          >
            {{ t("signUp.checkbox.label") }}
            <router-link to="/terms-of-use">
              {{ t("signUp.checkbox.termsOfServices") }}
            </router-link>
            {{ t("signUp.checkbox.separator") }}
            <router-link to="/privacy-policy">
              {{ t("signUp.checkbox.privacyPolicy") }}
            </router-link>
          </CustomCheckbox>
        </div>

        <CustomButton class="btn">Utwórz konto</CustomButton>
      </form>
      <div class="under-form-section">
        <span>Masz już konto?</span>
        <router-link to="/login">Zaloguj się</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useI18n } from "vue-i18n";
import CustomButton from "@/components/CustomButton.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomInput from "@/components/CustomInput.vue";
import { validateEmail, createRequestErrorMessage } from "@/utils";
import { useStore } from "vuex";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import { useMessage } from "naive-ui";

export default {
  name: "SignUpPage",
  components: {
    CustomButton,
    CustomSelect,
    CustomInput,
    CustomCheckbox,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const router = useRouter();
    const store = useStore();
    const message = useMessage();

    const userData = ref({
      name: "",
      surname: "",
      email: "",
      gender: "",
      password: "",
    });
    const passwordRepeat = ref("");

    const emailInvalid = computed(() => !validateEmail(userData.value.email));

    const termsAccepted = ref(false);

    const forceValidate = ref(false);

    function validateData() {
      forceValidate.value = true;

      if (!userData.value.name) {
        return false;
      }

      if (userData.value.name.length > 50) {
        return false;
      }

      if (userData.value.surname.length > 50) {
        return false;
      }

      if (!userData.value.surname) {
        return false;
      }

      if (!userData.value.email) {
        return false;
      }

      if (!validateEmail(userData.value.email)) {
        return false;
      }

      if (!userData.value.gender) {
        return false;
      }

      if (!userData.value.password) {
        return false;
      }

      // if () {
      //   return false; // todo: validate password
      // }

      if (userData.value.password !== passwordRepeat.value) {
        return false;
      }

      if (!termsAccepted.value) {
        return false;
      }

      return true;
    }

    function signUpUser() {
      axios
        .post("users/register", userData.value, {
          headers: {
            "content-language": store.state.settings.language,
            "preferred-theme": "dark",
          },
        })
        .then((response) => {
          const { email } = response.data;
          message.success(t("snackBars.accountCreated"));
          router.push({
            name: "login",
            params: { email, accountCreated: true },
          });
        })
        .catch((error) => {
          message.error(
            `${t("snackBars.accountCreatedError")} - ${createRequestErrorMessage(error)}`,
          );
        });
    }

    function handleSubmit() {
      if (validateData()) {
        signUpUser();
      }
    }

    const genderOptions = [
      {
        title: t("shared.male"),
        value: "male",
        iconClass: "ph-gender-male-light",
        iconAlt: "male gender icon",
      },
      {
        title: t("shared.female"),
        value: "female",
        iconClass: "ph-gender-female-light",
        iconAlt: "female gender icon",
      },
      {
        title: t("shared.other"),
        value: "other",
        iconClass: "ph-gender-neuter-light",
        iconAlt: "other gender icon",
      },
    ];

    // todo: autoscroll

    return {
      t,
      userData,
      signUpUser,
      passwordRepeat,
      genderOptions,
      handleSubmit,
      validateEmail,
      emailInvalid,
      forceValidate,
      termsAccepted,
      message,
    };
  },
};
</script>

<style lang="scss" scoped></style>
