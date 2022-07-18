<template>
  <section class="app-page" id="sign-up-page">
    <div class="sign-up-wrapper">
      <h1>{{t('signUp.heading')}}</h1>

      <form class="sing-up-form" @submit.prevent="handleSubmit" novalidate>
        <input class="hidden-input" type="text" autocomplete="username">

        <div class="inputs">
          <CustomInput :label="t('signUp.nameField.label')"
          iconClass='ph-identification-card-light' autocomplete="given-name"
          :required='true' :messageEmpty="t('signUp.nameField.messageEmpty')"
          :messageInvalid="t('signUp.nameField.messageInvalid')"
          v-model:value="userData.name"
          :forceValidate="forceValidate" :invalid="!userData.name"/>

          <CustomInput :label="t('signUp.surnameField.label')"
          iconClass='ph-identification-card-light'
          autocomplete="family-name"
          v-model:value="userData.surname"
          :required='true' :messageEmpty="t('signUp.surnameField.messageEmpty')"
          :messageInvalid="t('signUp.surnameField.messageInvalid')"
          :invalid="!userData.surname" :forceValidate="forceValidate"/>

          <CustomInput :label="t('signUp.emailField.label')"
          iconClass='ph-envelope-simple-light'
          autocomplete="email" inputType='email'
          v-model:value="userData.email"
          :required='true' :messageEmpty="t('signUp.emailField.messageEmpty')"
          :messageInvalid="t('signUp.emailField.messageInvalid')"
          :invalid="emailInvalid" :forceValidate="forceValidate"/>

          <CustomSelect class="selector"
          :header="t('signUp.genderField.header')"
          iconClass="ph-gender-intersex-light"
          :options="genderOptions"
          v-model:selected-value="userData.gender"
          :required='true' :messageEmpty="t('signUp.genderField.messageEmpty')"
          :messageInvalid="t('signUp.genderField.messageInvalid')"
          :invalid="!userData.gender" :forceValidate="forceValidate"/>

          <CustomInput :label="t('signUp.passwordField.label')"
          autocomplete="new-password"
          type='password'
          v-model:value="userData.password"
          :invalid="!passwordRepeat || passwordRepeat !== userData.password"
          :forceValidate="forceValidate"
          :required='true' :messageEmpty="t('signUp.passwordField.messageEmpty')"
          :messageInvalid="t('signUp.passwordField.messageInvalid')"/>

          <CustomInput :label="t('signUp.repeatPasswordField.label')"
          autocomplete="new-password"
          type='password'
          v-model:value="passwordRepeat"
          :invalid="!passwordRepeat || passwordRepeat !== userData.password"
          :forceValidate="forceValidate"
          :required='true' :messageEmpty="t('signUp.repeatPasswordField.messageEmpty')"
          :messageInvalid="t('signUp.repeatPasswordField.messageInvalid')"/>
        </div>

        <div class="under-form-section">
          <CustomCheckbox>Akceptuję
            <router-link to="/">
              regulamin serwisu
            </router-link>
            i
            <router-link to="/">
              politykę prywatności
            </router-link>
          </CustomCheckbox>
        </div>

        <CustomButton class="sign-up-button">Utwórz konto</CustomButton>
      </form>
      <div class="login-redirection">
        <h3>Masz już konto?</h3>
        <router-link to="/">Zaloguj się</router-link>
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
import validateEmail from '@/utils';
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
      axios.post('users/register',
        userData.value,
        {
          headers: {
            'content-language': navigator.language,
            'preferred-theme': 'dark',
          },
        }).then((response) => {
        const { email } = response.data;
        router.push({ name: 'Login', params: { email, accountCreated: true } });
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
    };
  },
};
</script>

<style lang='scss' scoped>
#sign-up-page {

  .sign-up-wrapper{
    text-align: center;
    background-color: $secondary-color;
    border-radius: .375rem;
    box-shadow: 0 0 8px -2px $box-shadow-color;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: .9375rem .875rem;
    h1 {
      font-size: 1.5rem;
    }
    h4{
      font-size: .875rem;
    }

    .sing-up-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 20px 0 20px;

      .inputs{
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .under-form-section{
        margin-top: 10px;
        width: 100%;
        font-size: 1em;
        display: flex;
        align-items: flex-start;
        a{
          font-size: 1em;
          color: $accent-color;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .sign-up-button{
        margin: 30px 0;
      }

      .hidden-input {
        display: none;
      }
    }
    .login-redirection{
      font-size: .8rem;
      display: flex;
      align-items: center;
      a{
        color: $accent-color;
        font-size: .8rem;
      }
    }
  }
}
</style>
