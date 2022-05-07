<template>
  <section class="app-page" id="login-page">
    <h1>Login</h1>
    <div class="email-confirmation-message" :class="{ hide: !emailConfirmationMessageShown }">
        <h4>Email address has been confirmed successfully</h4>
        <h4>You can now login to your account</h4>
    </div>
    <form class="login-form" @submit.prevent="loginUser">
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
      <router-link class="forgot-password-link" to="/recover-password">
        Forgot password?</router-link>
      <CustomButton content="Login"/>
    </form>
    <p>{{message}}</p>
  </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import CustomButton from '../../components/CustomButton.vue';

export default {
  name: 'LoginPage',
  props: {
    email: String,
  },
  setup() {
    const userData = ref({
      email: '',
      password: '',
    });
    const message = ref('');
    const passwordHidden = ref(true);
    function showPassword() {
      passwordHidden.value = !passwordHidden.value;
    }
    function loginUser() {
      axios.post('/auth/login', new URLSearchParams({
        grant_type: 'password',
        username: userData.value.email,
        password: userData.value.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
                message.value = 'Incorrect user data';
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

    const emailConfirmationMessageShown = ref(false);

    function showEmailConfirmationMessage() {
      emailConfirmationMessageShown.value = !emailConfirmationMessageShown.value;
    }

    return {
      userData,
      loginUser,
      message,
      showPassword,
      passwordHidden,
      showEmailConfirmationMessage,
      emailConfirmationMessageShown,
    };
  },
  mounted() {
    if (this.email) {
      this.userData.email = this.email;
      this.showEmailConfirmationMessage();
    }
  },
  components: { CustomButton },
};
</script>

<style lang='scss' scoped>
  #login-page {
    background-image: url('~@/assets/blob-background.svg');
    background-size: cover;
    justify-content: flex-start;

    h1 {
      font-size: 5rem;
    }
  }

  .forgot-password-link {
    color: #00A2E8;
    font-size: 1em;
    position: relative;
    left: -130px;

    &:hover {
      text-decoration: underline;
    }
  }

  .email-confirmation-message {
    margin-top: 70px;
    margin-bottom: 5px;
    background-color: rgba(24, 25, 27, 0.6);
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #4F8A10;
    background-color: #DFF2BF;
  }

  .hide {
    display: none;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all .3s;
    background-color: rgba(39, 42, 54, .6);
    padding: 100px 0 100px 0;
    border-radius: 20px;

    label {
        color: #84868F;
        position: absolute;
        transform-origin: 0 0;
        transform: translateX(-8.9em);
        transition: all .5s;
        pointer-events: none;
      }

    .email-label {
      transform: translateX(-9.9em);
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .email-icon {
        position: absolute;
        transform: translateX(11em);
        height: 30px;
        width: 30px;
      }

      .show-password {
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
          width: 30px;
          height: 30px;
        }
      }
    }

    .password-input {
      transition: letter-spacing .6s;
    }

    .password-input[type='password'] {
      letter-spacing: 4px;
    }

    input {
      padding-left: 30px;
      padding-right: 55px;
      outline: none;
      border: none;
      border: 2px solid transparent;
      background-color: #323644;
      color: white;
      height: 65px;
      width: 420px;
      border-radius: 15px;
      box-shadow: none;
      transition: all .3s;
      font-weight: bolder;
      font-size: .9rem;
      padding-top: 20px;

      &:focus {
        border-color: #3E83BA;
        background-color: #3D4049;
        box-shadow: 0 0 0px 3px #274B6D;
        outline: none;
        }

      &:focus + label {
        color: #00A2E8;
      }

      &:focus + .password-label,
      &:not(:placeholder-shown) + .password-label {
        transform: translateX(-8.9em) translateY(-.6em) scale(.8);
      }

      &:focus + .email-label,
      &:not(:placeholder-shown) + .email-label {
        transform: translateX(-9.9em) translateY(-.6em) scale(.8);
      }

      &::placeholder {
        color: transparent;
        user-select: none;
        }
    }
  }
</style>
