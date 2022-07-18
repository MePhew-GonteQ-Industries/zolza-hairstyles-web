<template>
  <section class="app-page form-page">
    <div class="form-wrapper">
      <h1>{{ t("logIn.heading") }}</h1>
      <h3>{{ t("logIn.subtitle") }}</h3>

      <div class="state-message" v-if="emailConfirmed">
        <h4>Email address has been confirmed successfully</h4>
        <h4>You can now login to your account</h4>
      </div>

      <div class="state-message" v-if="accountCreated">
        <h4>Account created successfully</h4>
        <h4>You can now login</h4>
      </div>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="inputs">
          <CustomInput
            :label="t('logIn.emailField.label')"
            iconClass="ph-envelope-simple-light"
            inputType="email"
            autocomplete="email"
            v-model:value="userData.email"
            :forceValidate="forceValidate"
            :invalid="emailInvalid"
            :required="true"
            :messageEmpty="t('logIn.emailField.messageEmpty')"
            :messageInvalid="t('logIn.emailField.messageInvalid')"
            class="input"
          />

          <CustomInput
            class="current-password input"
            :label="t('logIn.currentPasswordField.label')"
            autocomplete="new-password"
            type="password"
            v-model:value="userData.password"
            :invalid="!userData.password"
            :forceValidate="forceValidate"
            :required="true"
            :messageEmpty="t('logIn.currentPasswordField.messageEmpty')"
            :messageInvalid="t('logIn.currentPasswordField.messageInvalid')"
          />
        </div>

        <div class="under-inputs-section">
          <CustomCheckbox v-model:checked="saveUser"
            >Zapamiętaj mnie</CustomCheckbox
          >

          <router-link to="/password-reset" tabindex="-1">{{
            t("logIn.forgotPasswordBtn")
          }}</router-link>
        </div>

        <CustomButton class="btn" v-if="!loading">Zaloguj się</CustomButton>

        <CustomLoader class="loader" v-else />
      </form>
      <div class="under-form-section">
        <span>Nie masz jeszcze konta?</span>
        <router-link to="/">Utwórz konto</router-link>
      </div>
      <p>{{ message }}</p>
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
import validateEmail from '@/utils';
import CustomLoader from '@/components/CustomLoader.vue';
import CustomCheckbox from '../../components/CustomCheckbox.vue';

export default {
  name: 'LoginPage',
  components: {
    CustomButton,
    CustomInput,
    CustomLoader,
    CustomCheckbox,
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

    const saveUser = ref(false);

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
      store
        .dispatch('login', userData.value)
        .then(() => {
          loading.value = false;
          router.push('/');
        })
        .catch((err) => {
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
      saveUser,
    };
  },
};
</script>

<style lang='scss'>
</style>
