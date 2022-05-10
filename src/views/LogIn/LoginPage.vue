<template>
  <section class="app-page" id="login-page">
    <h1>Log In to Zołza Hairstyles</h1>
    <div class="email-confirmation-message" v-if="emailConfirmationMessageShown">
        <h4>Email address has been confirmed successfully</h4>
        <h4>You can now login to your account</h4>
    </div>
    <form class="login-form" @submit.prevent="handleSubmit">
      <CustomInput label='Email' :iconSrc='emailIcon'
      autocomplete="email" :invalid="showValidationFeedback && !userData.email"/>
      <CustomPasswordInput autocomplete="current-password"
      :invalid="showValidationFeedback && !userData.password" />
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
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import emailIcon from '@/assets/email.svg';

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

    const showValidationFeedback = ref(false);

    function validateData() {
      showValidationFeedback.value = true;

      if (!userData.value.email) {
        return false;
      }

      if (!userData.value.password) {
        return false;
      }

      return true;
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

    function handleSubmit() {
      if (validateData()) {
        loginUser();
      }
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
      emailIcon,
      showValidationFeedback,
      validateData,
      handleSubmit,
    };
  },
  mounted() {
    if (this.email) {
      this.userData.email = this.email;
      this.showEmailConfirmationMessage();
    }
  },
  components: {
    CustomButton,
    CustomInput,
    CustomPasswordInput,
  },
};
</script>

<style lang='scss' scoped>
  #login-page {
    background-image: url('~@/assets/blob-background.svg');
    background-size: cover;
    justify-content: flex-start;

    h1 {
      font-size: 2rem;
      font-weight: 300;
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
  }
</style>
