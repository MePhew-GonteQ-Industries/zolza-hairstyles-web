<template>
  <section class="app-page" id="verification-page">
    <CustomLoader v-if="loading" />
    <MessageBox
      type="error"
      v-if="!$route.query | !$route.query.token | verificationFailed"
    >
      <template #title>Adres e-mail nie został zweryfikowany</template>
      <template #subtitle
        >Przepraszamy, ale Twój link służący do weryfikacji adresu e-mail jest
        błędny, utracił ważność lub został już wykorzystany.</template
      >
    </MessageBox>
    <MessageBox type="success" v-else-if="!loading">
      <template #title>Adres e-mail został zweryfikowany</template>
      <template #subtitle
        >Adres e-mail został pomyślnie zweryfikowany. Dziękujemy!</template
      >
    </MessageBox>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import MessageBox from '@/components/MessageBox.vue';
import CustomLoader from '@/components/CustomLoader.vue';

export default {
  name: 'EmailVerification',
  components: {
    MessageBox,
    CustomLoader,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const route = useRoute();

    const loading = ref(true);
    const verificationFailed = ref(false);

    onMounted(() => {
      const { query } = route;

      if (query) {
        const { token } = query;
        if (token) {
          axios
            .put('users/verify-email', {
              verification_token: token,
            })
            .then((response) => {
              if (response.status === 200) {
                loading.value = false;
                // const { email } = response.data;
                // router.push({ name: 'Login', params: { email } });
              }
            })
            .catch((error) => {
              verificationFailed.value = true;
              loading.value = false;
              handleRequestError(error);
            });
        }
      }
    });

    return {
      t,
      verificationFailed,
      loading,
    };
  },
};
</script>

<style>
#verification-page {
  justify-content: center;
}
</style>
