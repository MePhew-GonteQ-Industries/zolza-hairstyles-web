<template>
  <section class="app-page" id="home-page">
    <div class="home-page-content">
      Witamy w Zołza Hairstyles - umów się na wizytę już niebawem! (mam nadzieję)
    </div>
    <div class="app-container">
      <h3>
        Umawiaj się na wizyty za pomocą dedykowanej aplikacji na twoim telefonie
      </h3>
      <video src="@/assets/appDemo.mp4" autoplay mute loop webkit-playsinline playsinline></video>
      <div class="stores-container">
        <img src="@/assets/appstore-pl-light.svg" alt="pobierz w appstore">
        <img src="@/assets/appstore-pl-light.svg" alt="pobierz w appstore">
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'HomePage',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
};
</script>

<style lang="scss" scoped>
  #home-page {
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    a {
      color: $primary-text-color;
      font-size: 4rem;
    }

    .home-page-content {
      padding: 0 5vw;
    }

    .app-container {
      height: 85vh;
      display: flex;
      flex-flow: column;
      padding: 5vh 5vw;

      h3 {
        padding: 5vh 0;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
      }

      video {
      height: 50vh;
      }

      .stores-container {
        display: flex;
        padding: 2vh 0;
        justify-content: center;
      }
    }
  }
</style>
