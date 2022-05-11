<template>
  <section class="app-page" id="login-page">
    <h1>Log In to Zołza Hairstyles</h1>
    <div class="state-message" v-if="emailConfirmed">
        <h4>Email address has been confirmed successfully</h4>
        <h4>You can now login to your account</h4>
    </div>
    <div class="state-message" v-if="accountCreated">
        <h4>Account created successfully</h4>
        <h4>You can now login</h4>
    </div>
    <form class="login-form" @submit.prevent="handleSubmit" novalidate>
      <CustomInput label='Email' :iconSrc='emailIcon' inputType='email'
      autocomplete="email" v-model:value="userData.email"
      :invalid="showValidationFeedback && !userData.email"/>
      <CustomPasswordInput autocomplete="current-password"
      v-model:password="userData.password"
      :invalid="showValidationFeedback && !userData.password" />
      <router-link class="forgot-password-link" to="/recover-password"
      tabindex="-1">
      Forgot password?</router-link>
      <CustomButton class="login-btn" content="Log In"/>
    </form>
    <p>{{message}}</p>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CustomButton from '../../components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import emailIcon from '@/assets/email.svg';

export default {
  name: 'LoginPage',
  props: {
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    accountCreated: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: '',
    },
  },
  setup(props) {
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

    onMounted(() => {
      if (props.email) {
        userData.value.email = props.email;
      }
    });

    return {
      userData,
      loginUser,
      message,
      showPassword,
      passwordHidden,
      emailIcon,
      showValidationFeedback,
      validateData,
      handleSubmit,
    };
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

  .state-message {
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
    padding: 100px 20px;
    border-radius: 20px;
    position: relative;

    .forgot-password-link {
      color: #00A2E8;
      font-size: 1em;
      position: absolute;
      top: 260px;
      left: 20px;

      &:hover {
        text-decoration: underline;
      }
    }

    .login-btn {
      margin-top: 50px;
    }
  }
</style>
