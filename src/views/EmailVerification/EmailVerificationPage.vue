<template>
  <section class="app-page" id="verification-page">
    <div class="verification-wrapper">
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'EmailVerification',
  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      const { query } = route;
      if (query) {
        const { token } = query;
        if (token) {
          axios.put('users/verify-email', {
            verification_token: token,
          })
            .then((response) => {
              if (response.status === 200) {
                const { email } = response.data;
                router.push({ name: 'Login', params: { email } });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  },
};
</script>

<style>
</style>
