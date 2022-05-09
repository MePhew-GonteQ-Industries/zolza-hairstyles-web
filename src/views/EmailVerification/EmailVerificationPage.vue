<template>
  <section class="app-page" id="verification-page">
    <div class="verification-wrapper">
    </div>
  </section>
</template>

<script>
export default {
  name: 'EmailVerification',
  mounted() {
    const { query } = this.$route;
    if (query) {
      const { token } = query;
      if (token) {
        this.axios.put('users/verify-email', {
          verification_token: token,
        })
          .then((response) => {
            if (response.status === 200) {
              // this.$router.push('/login');
              const { email } = response.data;
              this.$router.replace({ name: 'Login', params: { email } });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
};
</script>

<style>
</style>
