<template>
  <section class="app-page" id="login-page">
    <div class="login-wrapper">
      <h1>{{ t('logIn.heading') }}</h1>

      <div class="state-message" v-if="emailConfirmed">
          <h4>Email address has been confirmed successfully</h4>
          <h4>You can now login to your account</h4>
      </div>

      <div class="state-message" v-if="accountCreated">
          <h4>Account created successfully</h4>
          <h4>You can now login</h4>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit" novalidate>
        <CustomInput :label="t('logIn.emailField.label')"
        iconClass='ph-envelope-simple-light' inputType='email'
        autocomplete="email" v-model:value="userData.email"
        :forceValidate="forceValidate"
        :invalid="emailInvalid"
        :required='true' :messageEmpty="t('logIn.emailField.messageEmpty')"
        :messageInvalid="t('logIn.emailField.messageInvalid')"/>

        <CustomPasswordInput class='current-password' autocomplete="current-password"
        v-model:password="userData.password"
        :forceValidate="forceValidate"
        :invalid="!userData.password"
        :label="t('logIn.currentPasswordField.label')"
        :required='true' :messageEmpty="t('logIn.currentPasswordField.messageEmpty')"
        :messageInvalid="t('logIn.currentPasswordField.messageInvalid')"/>

        <router-link class="forgot-password-link" to="/password-reset"
        tabindex="-1">{{t('logIn.forgotPasswordBtn')}}</router-link>

        <CustomButton class="login-btn" content="Log In" v-if='!loading'/>

        <CustomLoader class='loader' v-else />
      </form>

      <p>{{message}}</p>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import validateEmail from '@/utils';
import CustomLoader from '@/components/CustomLoader.vue';

export default {
  name: 'LoginPage',
  components: {
    CustomButton,
    CustomInput,
    CustomPasswordInput,
    CustomLoader,
  },
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
    const router = useRouter();

    const { t } = useI18n();
    const store = useStore();

    const userData = ref({
      email: 'matib0029@gmaila.com',
      password: 'Kwakwa5!',
    });

    const loading = ref(false);

    const message = ref('');

    const emailInvalid = computed(() => !validateEmail(userData.value.email));

    const forceValidate = ref(false);

    function validateData() {
      forceValidate.value = true;

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
        router.push('/');
      }).catch((err) => {
        message.value = err;
        loading.value = false;
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
      t,
      userData,
      loginUser,
      message,
      validateData,
      handleSubmit,
      emailInvalid,
      loading,
      forceValidate,
    };
  },
};
</script>

<style lang='scss' scoped>
  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 3rem;
    }

    .state-message {
      margin-top: 70px;
      margin-bottom: 5px;
      background-color: $secondary-color;
      padding: 20px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $accent-color;
      background-color: $secondary-color;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100px 20px;
      position: relative;
      max-width: 420px;

      .forgot-password-link {
        color: $accent-color;
        font-size: 1em;
        position: absolute;
        top: 60%;
        left: 0;

        &:hover {
          text-decoration: underline;
        }
      }

      .login-btn, .loader {
        margin-top: 50px;
      }
    }
  }
</style>
