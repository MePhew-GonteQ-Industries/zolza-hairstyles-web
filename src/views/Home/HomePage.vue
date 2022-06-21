<template>
  <section class="app-page" id="home-page">
    <div class="home-page-content">
      <h1>Witamy w Zołza Hairstyles - umów się na wizytę już niebawem! (mam nadzieję)</h1>
      <h3>Tutaj kilka moich prac</h3>
      <!-- <div class="images">
        <img src="@/assets/homePagePhotos/firstPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/secondPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/thirdPhoto.jpg" alt="moje prace">
        <img src="@/assets/homePagePhotos/fourthPhoto.jpg" alt="moje prace">
      </div> -->
      <CarouselComponent :photos="photos"/>
    </div>
    <div class="app-container">
      <h3>
        Umawiaj się na wizyty za pomocą dedykowanej aplikacji na twoim telefonie
      </h3>
      <video src="@/assets/appDemo.mp4" mute loop webkit-playsinline playsinline autoplay></video>
      <div class="stores-container">
        <img src="@/assets/appstore-pl-light.svg" alt="pobierz w appstore">
        <img src="@/assets/appstore-pl-light.svg" alt="pobierz w appstore">
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import CarouselComponent from '../../components/Carousel/CarouselComponent.vue';

export default {
  name: 'HomePage',
  components: { CarouselComponent },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const photos = [
      'https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/265204289_135882692147549_3467058761421552543_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=K-niABnEn60AX9jjbm5&_nc_ht=scontent-frt3-2.xx&oh=00_AT-Km7JZSp6D3jAxmBlhKPR9PVpUn_yDquRvg00QKCl8-Q&oe=62B7CFC0',
      'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/275437525_154644380271380_465131973084948337_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=cBzHSg09eB4AX-VTq2W&_nc_ht=scontent-frt3-1.xx&oh=00_AT-ipXY21DH3r_AsZloV5aXiVf_0_IU-ckweMWboaW0o1Q&oe=62B61BA1',
      'https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/274138307_150315877370897_5239666480900220736_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=QWFYr5S5cfgAX-nr1Lw&_nc_ht=scontent-frt3-2.xx&oh=00_AT-hAKVpQpX3p67IaRQE6CS3uSVIeTEnqBNrV2MPFltDJw&oe=62B6CA94',
      'https://scontent-frx5-2.xx.fbcdn.net/v/t39.30808-6/278126410_161520982917053_1046650583473762398_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=VJOjYFKlt-IAX__aXkC&_nc_ht=scontent-frx5-2.xx&oh=00_AT-45U9326Ko3sqIg5B0uQriwAX8I6Vvr5HRLu0wqGymgA&oe=62B6E43C',
    ];

    return {
      t,
      photos,
    };
  },
};
</script>

<style lang="scss" scoped>
  #home-page {
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .home-page-content{
      a {
        color: $primary-text-color;
        font-size: 4rem;
      }

      margin-top: 5vh;
      display: flex;
      text-align: center;
      flex-flow: column;
      padding: 0 5vw;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 40px;
      }

      h3 {
        margin-top: 5vh;
        font-family: 'Poppins', sans-serif;
        font-size: 28px;
      }

      .images {
        img {
        margin: 0 .5vw;
        height: 675px;
        width: 540px;
        border: 2px solid black;
        }
      }
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
