<template>
  <section class="app-page" id="verification-page">
    <div class="verification-wrapper">
      <h1>Kliknij przycisk poniżej, aby zweryfikować swój adres e-mail</h1>
      <button @click="verifyEmail">Zweryfikuj</button>
      <h6>{{info}}</h6>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EmailVerification',
  data() {
    return {
      info: null,
    };
  },
  methods: {
    verifyEmail() {
      this.axios.post('/users/email-verification', { verification_token: this.$route.query.token })
        .then((res) => this.updateUi(res))
        .catch((err) => console.error(err));
    },
    updateUi(res) {
      this.info = res;
    },
  },
};
</script>

<style>
</style>
