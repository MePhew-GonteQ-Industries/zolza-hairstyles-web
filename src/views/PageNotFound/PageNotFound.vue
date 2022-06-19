<template>
  <section class="app-page" id="page-not-found">
    <h1>404</h1>
    <h3>{{ t('pageNotFound.notFound') }}</h3>
    <CustomButton content="t('pageNotFound.homeRedirection')"/>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import CustomButton from '@/components/CustomButton.vue';

export default {
  name: 'NotFoundPage',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return {
      t,
    };
  },
  components: {
    CustomButton,
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
  #page-not-found{
    background-image: url('~@/assets/blob-background.svg');
    background-size: cover;
    justify-content: center;
    h1{
      font-size: 30em;
      font-family: 'Exo 2', sans-serif;
    }
    h3{
      font-size: 8em;
    }
  }
</style>>
