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
      :invalid="showValidationFeedback && emailInvalid"/>
      <CustomPasswordInput autocomplete="current-password"
      v-model:password="userData.password"
      :invalid="showValidationFeedback && !userData.password" />
      <router-link class="forgot-password-link" to="/reset-password"
      tabindex="-1">
      Forgot password?</router-link>
      <CustomButton class="login-btn" content="Log In" v-if='!loading'/>
      <CustomLoader class='loader' v-else />
    </form>
    <p>{{message}}</p>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import emailIcon from '@/assets/email.svg';
import validateEmail from '@/utils';
import CustomLoader from '@/components/CustomLoader.vue';

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
    const store = useStore();

    const loading = ref(false);

    const message = ref('');

    const showValidationFeedback = ref(false);

    const emailInvalid = computed(() => !validateEmail(userData.value.email));

    function validateData() {
      showValidationFeedback.value = true;

      if (!validateEmail(userData.value.email)) {
        return false;
      }

      if (!userData.value.password) {
        return false;
      }

      return true;
    }

    function loginUser() {
      loading.value = true;
      store.dispatch('login', userData.value).then(() => {
        loading.value = false;
        // router.push();
      }).catch((err) => {
        message.value = err;
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
      emailIcon,
      showValidationFeedback,
      validateData,
      handleSubmit,
      emailInvalid,
      loading,
    };
  },
  components: {
    CustomButton,
    CustomInput,
    CustomPasswordInput,
    CustomLoader,
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

    .login-btn, .loader {
      margin-top: 50px;
    }
  }
</style>
