<template>
  <section class="app-page" id="sign-up-page">
    <h1>Create an account</h1>
    <form class="sing-up-form" @submit.prevent="signUpUser">
      <CustomInput label='Name' :iconSrc='contactIcon' autocomplete="given-name"
      v-model:value="userData.name"/>
      <CustomInput label='Surname' :iconSrc='contactIcon' autocomplete="family-name"
      v-model:value="userData.surname"/>
      <CustomInput label='Email' :iconSrc='emailIcon' autocomplete="email"
      v-model:value="userData.email"/>
      <CustomSelect class="selector"
      header="Gender"
      :iconSrc="selectGenderIcon"
      placeholder='Select your gender'
      :options="genderOptions"
      v-model:selected-value="userData.gender"/>
      <CustomPasswordInput autocomplete="new-password"
      v-model:password="userData.password"/>
      <div class="password-strength-feedback" v-if="userData.password">
        <span>Secure</span>
        <password-meter :password="userData.password"/>
      </div>
      <CustomPasswordInput autocomplete="new-password" label="Repeat password"
      v-model:password="passwordRepeat"/>
      <CustomButton content="Sign up"/>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import PasswordMeter from 'vue-simple-password-meter';
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
    const userData = ref({
      name: '',
      surname: '',
      email: '',
      gender: '',
      password: '',
    });
    const passwordRepeat = ref('');

    function validateData() {
      console.log(userData.value);
      console.log(passwordRepeat.value);
      return false;

      // if (userData.value.password !== passwordRepeat.value) {
      //   return false;
      // }

      // return true;
    }

    function sendSignUpRequest() {
      axios.post('/auth/register',
        userData.value,
        {
          headers: {
            'content-language': navigator.language,
            'preferred-theme': 'dark',
          },
        }).then((response) => {
        console.log(response);
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

    function signUpUser() {
      if (validateData()) {
        sendSignUpRequest();
      } else {
        console.error('Panie z czym do ludzi');
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
      {
        title: 'Apache Attack Helicopter',
        value: 'other',
        iconSrc: otherGenderIcon,
        iconAlt: 'other gender icon',
      },
      {
        title: 'Apache Attack Helicopter',
        value: 'other',
        iconSrc: otherGenderIcon,
        iconAlt: 'other gender icon',
      },
      {
        title: 'Apache Attack Helicopter',
        value: 'other',
        iconSrc: otherGenderIcon,
        iconAlt: 'other gender icon',
      },
      {
        title: 'Apache Attack Helicopter',
        value: 'other',
        iconSrc: otherGenderIcon,
        iconAlt: 'other gender icon',
      },
      {
        title: 'Apache Attack Helicopter',
        value: 'other',
        iconSrc: otherGenderIcon,
        iconAlt: 'other gender icon',
      },
    ];

    return {
      userData,
      signUpUser,
      passwordRepeat,
      genderOptions,
      selectGenderIcon,
      emailIcon,
      contactIcon,
    };
  },
};
</script>

<style>
.po-password-strength-bar {
    border-radius: 5px;
    transition: all 0.2s linear;
}

.po-password-strength-bar.risky {
    background-color: #f95e68;
    width: 10%;
}

.po-password-strength-bar.guessable {
    background-color: #fb964d;
    width: 32.5%;
}

.po-password-strength-bar.weak {
    background-color: #fdd244;
    width: 55%;
}

.po-password-strength-bar.safe {
    background-color: #b0dc53;
    width: 77.5%;
}

.po-password-strength-bar.secure {
    background-color: #35cc62;
    width: 100%;
}
</style>

<style lang='scss' scoped>
#sign-up-page {
  background-image: url("~@/assets/blob-background2.svg");
  background-size: cover;
  justify-content: flex-start;
  gap: 5px;

  h1 {
    font-size: 2rem;
  }

  .password-strength-feedback {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .sing-up-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all 0.3s;
    background-color: rgba(39, 42, 54, 0.6);
    padding: 20px 0;
    border-radius: 20px;
  }
}
</style>
