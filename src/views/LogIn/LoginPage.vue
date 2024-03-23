<template>
  <section class="app-page form-page login-page">
    <div class="form-wrapper">
      <h1>{{ t("logIn.heading") }}</h1>
      <h3>{{ t("logIn.subtitle") }}</h3>

      <div
        class="state-message"
        v-if="emailConfirmed"
      >
        <h4>{{ t("logIn.emailConfirmed") }}</h4>
        <h4>{{ t("logIn.allowLogin") }}</h4>
      </div>

      <div
        class="state-message"
        v-if="accountCreated"
      >
        <h4>{{ t("logIn.accountCreated") }}</h4>
        <h4>{{ t("logIn.allowLogin") }}</h4>
      </div>

      <form
        @submit.prevent="handleSubmit"
        novalidate
      >
        <div class="inputs">
          <CustomInput
            :label="t('shared.email')"
            iconClass="ph-envelope-simple-light"
            type="email"
            autocomplete="email"
            v-model:value="userData.email"
            :forceValidate="forceValidate"
            :invalid="emailInvalid"
            :required="true"
            :messageEmpty="t('shared.emailEmpty')"
            :messageInvalid="t('shared.emailInvalid')"
            class="input"
          />

          <CustomInput
            class="current-password input"
            :label="t('shared.password')"
            autocomplete="current-password"
            type="password-login"
            v-model:value="userData.password"
            :invalid="!userData.password"
            :forceValidate="forceValidate"
            :required="true"
            :messageEmpty="t('logIn.currentPasswordField.messageEmpty')"
            :messageInvalid="t('logIn.currentPasswordField.messageInvalid')"
          />
        </div>

        <div class="under-inputs-section">
          <CustomCheckbox v-model:checked="saveUser">{{ t("logIn.saveUser") }}</CustomCheckbox>

          <router-link
            to="/password-reset"
            tabindex="-1"
            >{{ t("logIn.forgotPasswordBtn") }}</router-link
          >
        </div>

        <CustomButton
          class="btn"
          v-if="!loading"
          >{{ t("shared.login") }}</CustomButton
        >

        <CustomLoader
          class="loader"
          v-else
        />
      </form>
      <div class="under-form-section">
        <span>{{ t("logIn.dontHaveAnAccount") }}</span>
        <router-link to="/sign-up">{{ t("shared.signUp") }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import { validateEmail, createRequestErrorMessage } from "@/utils";
import CustomLoader from "@/components/CustomLoader.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import { useMessage } from "naive-ui";

export default {
  name: "LoginPage",
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
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n({ useScope: "global" });
    const message = useMessage();

    const userData = ref({
      email: "",
      password: "",
    });

    const saveUser = computed({
      get() {
        return store.state.auth.rememberUser;
      },
      set(newValue) {
        store.commit("setRememberUser", newValue);
      },
    });

    const loading = ref(false);

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
        .dispatch("login", userData.value)
        .then(() => {
          loading.value = false;
          message.success(t("snackBars.login"));
          if (
            store.state.user.permissionLevel.includes("owner") ||
            store.state.user.permissionLevel.includes("admin")
          ) {
            router.push("/dashboard");
          } else {
            router.push("/appointments");
          }
        })
        .catch((error) => {
          message.error(`${t("snackBars.loginError")} - ${createRequestErrorMessage(error)}`);
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

<style lang="scss"></style>
