<template>
  <section class="app-page" id="home-page">
    <div class="home-page-content">
      <h1>Witamy w Zołza Hairstyles - umów się na wizytę już niebawem! (mam nadzieję)</h1>
      <h3>Tutaj kilka moich prac</h3>
      <div class="images">
        <img src="@/assets/homePagePhotos/firstPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/secondPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/thirdPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/fourthPhoto.jpg" alt="moje prace">
      </div>
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
  // a {
  //   color: white;
  //   font-size: 4rem;
  // }

  // h1 {
  //   font-size: 25vw;
  // }

  // h1::selection {
  //   background-color: $primary-fg-color;
  // }
  #home-page{
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .home-page-content{
      margin-top: 5vh;
      display: flex;
      text-align: center;
      flex-flow: column;
      padding: 0 5vw;
      h1{
        font-family: 'Poppins', sans-serif;
        font-size: 40px;
      }
      h3{
        margin-top: 5vh;
        font-family: 'Poppins', sans-serif;
        font-size: 28px;
      }
      .images{
        img{
        margin: 0 .5vw;
        height: 675px;
        width: 540px;
        border: 2px solid black;
        }
      }
    }
    .app-container{
      height: 85vh;
      display: flex;
      flex-flow: column;
      padding: 5vh 5vw;
      h3{
        padding: 5vh 0;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
      }
      video{
      height: 50vh;
      }
      .stores-container{
        display: flex;
        padding: 2vh 0;
        justify-content: center;
      }
    }
  }
</style>
