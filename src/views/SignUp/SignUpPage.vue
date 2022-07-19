<template>
  <section class="app-page form-page">
    <div class="form-wrapper">
      <h1>{{ t("signUp.heading") }}</h1>
      <h3>{{ t("signUp.subtitle") }}</h3>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="inputs">
          <input class="hidden-input" type="text" autocomplete="username" />

          <div class="names">
            <CustomInput
              :label="t('signUp.nameField.label')"
              iconClass="ph-identification-card-light"
              autocomplete="given-name"
              :required="true"
              :messageEmpty="t('signUp.nameField.messageEmpty')"
              :messageInvalid="t('signUp.nameField.messageInvalid')"
              v-model:value="userData.name"
              :forceValidate="forceValidate"
              :invalid="!userData.name"
            />

            <CustomInput
              :label="t('signUp.surnameField.label')"
              iconClass="ph-identification-card-light"
              autocomplete="family-name"
              v-model:value="userData.surname"
              :required="true"
              :messageEmpty="t('signUp.surnameField.messageEmpty')"
              :messageInvalid="t('signUp.surnameField.messageInvalid')"
              :invalid="!userData.surname"
              :forceValidate="forceValidate"
            />
          </div>

          <CustomInput
            :label="t('signUp.emailField.label')"
            iconClass="ph-envelope-simple-light"
            autocomplete="email"
            inputType="email"
            v-model:value="userData.email"
            :required="true"
            :messageEmpty="t('signUp.emailField.messageEmpty')"
            :messageInvalid="t('signUp.emailField.messageInvalid')"
            :invalid="emailInvalid"
            :forceValidate="forceValidate"
          />

          <CustomSelect
            class="select"
            :header="t('signUp.genderField.header')"
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
            :label="t('signUp.passwordField.label')"
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
          <CustomCheckbox v-model:checked="termsAccepted"
            >Akceptuję
            <router-link to="/terms-of-use"> regulamin serwisu </router-link>
            i
            <router-link to="/privacy-policy">
              politykę prywatności
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import CustomButton from '@/components/CustomButton.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomInput from '@/components/CustomInput.vue';
import { validateEmail } from '@/utils';
import CustomCheckbox from '../../components/CustomCheckbox.vue';

export default {
  name: 'SignUpPage',
  components: {
    CustomButton,
    CustomSelect,
    CustomInput,
    CustomCheckbox,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();

    const userData = ref({
      name: '',
      surname: '',
      email: '',
      gender: '',
      password: '',
    });
    const passwordRepeat = ref('');

    const passwordScore = ref(null);

    const emailInvalid = computed(() => !validateEmail(userData.value.email));

    const termsAccepted = ref(false);

    function onScore(payload) {
      passwordScore.value = payload.score;
    }

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

      if (passwordScore.value < 3) {
        return false;
      }

      if (userData.value.password !== passwordRepeat.value) {
        return false;
      }

      return true;
    }

    function signUpUser() {
      axios
        .post('users/register', userData.value, {
          headers: {
            'content-language': navigator.language,
            'preferred-theme': 'dark',
          },
        })
        .then((response) => {
          const { email } = response.data;
          router.push({
            name: 'Login',
            params: { email, accountCreated: true },
          });
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
              case 404: {
                // message.value = 'Incorrect user data';
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

    function handleSubmit() {
      if (validateData()) {
        signUpUser();
      }
    }

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

    // todo: autoscroll

    return {
      t,
      userData,
      signUpUser,
      passwordRepeat,
      genderOptions,
      handleSubmit,
      validateEmail,
      onScore,
      passwordScore,
      emailInvalid,
      forceValidate,
      termsAccepted,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
