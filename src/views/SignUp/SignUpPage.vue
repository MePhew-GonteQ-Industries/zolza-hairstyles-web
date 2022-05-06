<template>
  <section class="app-page" id="sign-up-page">
    <h1>Sign up</h1>
    <form class="sing-up-form" @submit.prevent="signUpUser">
      <div class="input-wrapper">
        <input class="name-input" type="text" name="name"
        placeholder="Name" v-model="userData.name">
        <label class="name-label" for="name">Name</label>
        <img class="contact-icon" src="@/assets/contact.svg" alt="">
      </div>
      <div class="input-wrapper">
        <input class="surname-input" type="text" name="surname"
        placeholder="Surname" v-model="userData.surname">
        <label class="surname-label" for="email">Surname</label>
        <img class="contact-icon" src="@/assets/contact.svg" alt="">
      </div>
      <div class="gender-select">
        <span>Gender</span>
        <img class="genders-icon" src="@/assets/genders-icon.svg" alt="">
      </div>
      <div class="input-wrapper">
        <input class="email-input" type="text" name="email"
        placeholder="Email" v-model="userData.email">
        <label class="email-label" for="email">Email</label>
        <img class="email-icon" src="@/assets/footer/email.svg" alt="">
      </div>
      <div class="input-wrapper">
        <input class="password-input" :type="passwordHidden ? 'password' : 'text'" name="password"
         placeholder="Password" v-model="userData.password">
        <label class="password-label" for="password">Password</label>
        <div class="show-password" @click="showPassword">
            <img class="eye-icon" :class="{ hide: !passwordHidden }"
            src="@/assets/eye-crossed-out.svg" alt="show-password-icon">
            <img class="eye-icon" :class="{ hide: passwordHidden }"
            src="@/assets/eye.svg" alt="hide-password-icon">
        </div>
      </div>
      <div class="input-wrapper">
        <input class="password-repeat-input" :type="passwordHiddenRepeat ? 'password' : 'text'"
         name="password-repeat"
         placeholder="Password" v-model="passwordRepeat">
        <label class="password-repeat-label" for="password-repeat">Repeat Password</label>
        <div class="show-password-repeat" @click="showPasswordRepeat">
            <img class="eye-icon" :class="{ hide: !passwordHiddenRepeat }"
            src="@/assets/eye-crossed-out.svg" alt="show-password-icon">
            <img class="eye-icon" :class="{ hide: passwordHiddenRepeat }"
            src="@/assets/eye.svg" alt="hide-password-icon">
        </div>
      </div>
      <CustomButton content="Sign up"/>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import CustomButton from '../../components/CustomButton.vue';

export default {
  name: 'SignUpPage',
  setup() {
    const userData = ref({
      name: '',
      surname: '',
      gender: '',
      email: '',
      password: '',
    });
    const passwordRepeat = ref('');
    const passwordHidden = ref('false');
    const passwordHiddenRepeat = ref('false');

    function showPassword() {
      passwordHidden.value = !passwordHidden.value;
    }

    function showPasswordRepeat() {
      passwordHiddenRepeat.value = !passwordHiddenRepeat.value;
    }

    function signUpUser() {
      axios.post('/auth/register', {
        name: userData.value.name,
        surname: userData.value.surname,
        gender: userData.value.gender,
        email: userData.value.email,
        password: userData.value.password,
      },
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

    return {
      userData,
      signUpUser,
      passwordRepeat,
      passwordHidden,
      passwordHiddenRepeat,
      showPassword,
      showPasswordRepeat,
    };
  },
  components: {
    CustomButton,
  },
};
</script>

<style lang='scss' scoped>

.gender-select {
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 55px;
  outline: none;
  border: none;
  border: 2px solid transparent;
  background-color: #323644;
  color: #84868f;
  height: 65px;
  width: 420px;
  border-radius: 15px;
  box-shadow: none;
  transition: all 0.3s;
  cursor: default;

  .genders-icon {
    position: absolute;
    transform: translateX(17.6em);
  }
}

#sign-up-page {
  background-image: url("~@/assets/blob-background2.svg");
  background-size: cover;
  justify-content: flex-start;
  gap: 5px;

  .hide {
    display: none;
  }

  h1 {
    font-size: 5rem;
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

    label {
      color: #84868f;
      position: absolute;
      transform-origin: 0 0;
      transform: translateX(-8.9em);
      transition: all 0.5s;
      pointer-events: none;
      backface-visibility: hidden;
    }

    .name-label {
      transform: translateX(-9.8em);
    }

    .surname-label {
      transform: translateX(-9em);
    }

    .email-label {
      transform: translateX(-9.9em);
    }

    .password-repeat-label {
      transform: translateX(-7.2em);
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
        height: 30px;
        transform-origin: 0 0;
        position: absolute;
        transform: translateX(11em);
      }

      .show-password,
      .show-password-repeat {
        position: absolute;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(175px);
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;

        &:hover {
          background-color: #2b2d33;
        }

        &:active {
          background-color: #55575e;
        }

        .eye-icon {
          transform: none;
          width: 30px;
          height: 30px;
        }
      }

      .password-input,
      .password-repeat-input {
        transition: letter-spacing 0.6s;
      }

      .password-input[type="password"],
      .password-repeat-input[type="password"] {
        letter-spacing: 4px;
      }

      input {
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 55px;
        border: 2px solid transparent;
        background-color: #323644;
        color: white;
        height: 65px;
        width: 420px;
        border-radius: 15px;
        box-shadow: none;
        transition: all 0.3s;

        &:focus {
          border-color: #3e83ba;
          background-color: #3d4049;
          box-shadow: 0 0 0px 3px #274b6d;
          outline: none;
        }

        &:focus + label {
          color: #00a2e8;
        }

        &:focus + .password-repeat-label,
        &:not(:placeholder-shown) + .password-repeat-label {
          transform: translateX(-7.2em) translateY(-0.6em) scale(0.8);
        }

        &:focus + .password-label,
        &:not(:placeholder-shown) + .password-label {
          transform: translateX(-8.9em) translateY(-0.6em) scale(0.8);
        }

        &:focus + .name-label,
        &:not(:placeholder-shown) + .name-label {
          transform: translateX(-9.8em) translateY(-0.6em) scale(0.8);
        }

        &:focus + .surname-label,
        &:not(:placeholder-shown) + .surname-label {
          transform: translateX(-9em) translateY(-0.6em) scale(0.8);
        }

        &:focus + .email-label,
        &:not(:placeholder-shown) + .email-label {
          transform: translateX(-9.9em) translateY(-0.6em) scale(0.8);
        }

        &::placeholder {
          color: transparent;
          user-select: none;
        }
      }
    }
  }
}
</style>
