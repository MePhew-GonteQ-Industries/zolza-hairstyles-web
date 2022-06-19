<template>
  <section class="app-page" id="sign-up-page">

    <h1>{{t('signUp.heading')}}</h1>

    <form class="sing-up-form" @submit.prevent="handleSubmit" novalidate>
      <input class="hidden-input" type="text" autocomplete="username">

      <CustomInput :label="t('signUp.nameField.label')"
      :iconSrc='contactIcon' autocomplete="given-name"
      :required='true' :messageEmpty="t('signUp.nameField.messageEmpty')"
      :messageInvalid="t('signUp.nameField.messageInvalid')"
      v-model:value="userData.name" :invalid="showValidationFeedback && !userData.name"/>

      <CustomInput :label="t('signUp.surnameField.label')" :iconSrc='contactIcon'
      autocomplete="family-name"
      v-model:value="userData.surname" :invalid="showValidationFeedback && !userData.surname"
      :required='true' :messageEmpty="t('signUp.surnameField.messageEmpty')"
      :messageInvalid="t('signUp.surnameField.messageInvalid')"/>

      <CustomInput :label="t('signUp.emailField.label')" :iconSrc='emailIcon'
      autocomplete="email" inputType='email'
      v-model:value="userData.email" :invalid="showValidationFeedback && emailInvalid"
      :required='true' :messageEmpty="t('signUp.emailField.messageEmpty')"
      :messageInvalid="t('signUp.emailField.messageInvalid')"/>

      <CustomSelect class="selector"
      :header="t('signUp.genderField.header')"
      :iconSrc="selectGenderIcon"
      :options="genderOptions"
      v-model:selected-value="userData.gender"
      :invalid="showValidationFeedback && !userData.gender"
      :required='true' :messageEmpty="t('signUp.genderField.messageEmpty')"
      :messageInvalid="t('signUp.genderField.messageInvalid')"/>

      <CustomPasswordInput autocomplete="new-password"
      :label="t('signUp.passwordField.label')"
      v-model:password="userData.password"
      :invalid="showValidationFeedback && (!passwordRepeat || passwordRepeat !== userData.password)"
      :required='true' :messageEmpty="t('signUp.passwordField.messageEmpty')"
      :messageInvalid="t('signUp.passwordField.messageInvalid')"/>

      <div class="password-strength-feedback">
        <password-meter :password="userData.password" @score="onScore"/>
        <p>Hasło musi składać się z co najmniej 8 znaków i
        zawierać przynajmniej jedną cyfrę lub znak specjalny</p>
      </div>

      <CustomPasswordInput autocomplete="new-password"
      :label="t('signUp.repeatPasswordField.label')"
      v-model:password="passwordRepeat"
      :invalid="showValidationFeedback && (!passwordRepeat || passwordRepeat !== userData.password)"
      :required='true' :messageEmpty="t('signUp.repeatPasswordField.messageEmpty')"
      :messageInvalid="t('signUp.repeatPasswordField.messageInvalid')"/>

      <CustomButton content="Sign up"/>
    </form>
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PasswordMeter from 'vue-simple-password-meter';
import { useI18n } from 'vue-i18n';
import CustomButton from '@/components/CustomButton.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import maleIcon from '@/assets/male.svg';
import femaleIcon from '@/assets/female.svg';
import otherGenderIcon from '@/assets/other-gender.svg';
import selectGenderIcon from '@/assets/genders-icon.svg';
import emailIcon from '@/assets/email.svg';
import contactIcon from '@/assets/contact.svg';
import validateEmail from '@/utils';

export default {
  name: 'SignUpPage',
  components: {
    CustomButton,
    CustomSelect,
    CustomInput,
    CustomPasswordInput,
    PasswordMeter,
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
    const passwordStrength = ref(null);

    const emailInvalid = computed(() => !validateEmail(userData.value.email));

    function onScore(payload) {
      passwordScore.value = payload.score;
      passwordStrength.value = payload.strength;
    }

    const showValidationFeedback = ref(false);

    function validateData() {
      showValidationFeedback.value = true;

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
        iconSrc: maleIcon,
        iconAlt: 'male gender icon',
      },
      {
        title: 'Female',
        value: 'female',
        iconSrc: femaleIcon,
        iconAlt: 'female gender icon',
      },
      {
        title: 'Other',
        value: 'other',
        iconSrc: otherGenderIcon,
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
      selectGenderIcon,
      emailIcon,
      contactIcon,
      showValidationFeedback,
      handleSubmit,
      validateEmail,
      onScore,
      passwordScore,
      passwordStrength,
      emailInvalid,
    };
  },
};
</script>

<style>
.po-password-strength-bar {
  position: relative;
  border-radius: 5px;
  transition: all 600ms linear !important;
  height: 10px;
  width: 100%;
  background-color: #f95e68;
}

.po-password-strength-bar.risky {
    background-color: #f95e68;
    /* width: 10%; */
    width: 100%;
}

.po-password-strength-bar.guessable {
    background-color: #fb964d;
    /* width: 32.5%; */
    width: 77.5%;
}

.po-password-strength-bar.weak {
    background-color: #fdd244;
    /* width: 55%; */
    width: 55%;
}

.po-password-strength-bar.safe {
    background-color: #b0dc53;
    /* width: 77.5%; */
    width: 25%;
}

.po-password-strength-bar.secure {
    /* background-color: #35cc62; */
    background-color: transparent;
    width: 0;
}
.po-password-strength-bar::before {
  transition: all 600ms linear;
}
.po-password-strength-bar.secure::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "\2713";
    color: #35cc62;
    font-size: 40px;
}
</style>

<style lang='scss' scoped>
#sign-up-page {
  justify-content: flex-start;
  gap: 5px;

  h1 {
    font-size: 2rem;
  }

  .password-strength-feedback {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 25px;
    color: #F95249;
  }

  .sing-up-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all 0.3s;
    padding: 50px 20px;
    max-width: 420px;

    .hidden-input {
      display: none;
    }
  }
}
</style>
