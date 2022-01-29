<template>
  <section class="app-page" id="sign-up-page">
      <div class="sign-up">
      <h1>{{$t('signUp.heading')}}</h1>
      <CustomInput :label="$t('signUp.eMailFieldLabel')" @submit.prevent="" @keyup="console.log()"/>
      <CustomInput :label="$t('signUp.passwordFieldLabel')"/>
      <CustomButton/>
    </div>
  </section>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';

export default {
  name: 'SignUpPage',
  components: {
    CustomInput,
    CustomButton,
  },
};
</script>

<style lang='scss' scoped>
  .sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: #222;
    width: 70%;
    padding: 250px 50px;
    border-radius: 10px;
  }
</style>
