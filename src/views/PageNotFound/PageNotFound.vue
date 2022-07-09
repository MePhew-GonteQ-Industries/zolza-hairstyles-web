<template>
  <section class="app-page" id="page-not-found">
    <img src="@/assets/notfound.svg" alt="404">
    <h3>{{ t('pageNotFound.heading') }}</h3>
    <router-link to="/">{{ t('pageNotFound.button') }}</router-link>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'NotFoundPage',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return {
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
  #page-not-found{
    justify-content: space-around;
    img{
      height: 40vh;
      filter: $mobile-menu-icon-filter;
    }
    h3{
      font-size: 8em;
      color: $primary-fg-color;
      font-family: 'Poppins', sans-serif;
    }
    a{
      display: flex;
      height: 60px;
      width: 200px;
      border-radius: 30px;
      border: 2px solid transparent;
      background-color: #1A92F0;
      color: $primary-fg-color;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      cursor: pointer;
    }
  }

  @media only screen and(max-width: 1024px){
    #page-not-found{
      img{
        height: 15vh;
      }
      h3{
        font-size: 2em;
      }
    }
  }
</style>
