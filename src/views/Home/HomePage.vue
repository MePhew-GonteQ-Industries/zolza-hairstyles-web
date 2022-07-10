<template>
  <section class="app-page" id="home-page">
    <ServicesList :scrolledToServices="scrolledToServices"
      v-model:selectedServiceId="selectedServiceId" />

    <AvailableSlotsList :selectedServiceId="selectedServiceId"/>

    <ImageGallery :photos="photos"/>

    <div class="mobile-app-banner">

      <div class="cta">
        <p class="primary">Jedna aplikacja wiele możliwości</p>
        <p class="description">W aplikacji mobilnej na telefon możesz przeglądać wolne terminy,
          umawiać się na wizytę oraz kontrolować wszystkie swoje wizyty w naszym salonie.</p>
        <p class="secondary">
          Aplikacja dostępna jest na urządzeniach z systemem Android oraz IOS.
        </p>
        <div class="download-links">
          <a href="">
            <img class="app-store-badge"
             src="@/assets/app-store-badge.svg" alt="Pobierz z App Store">
          </a>
          <a href="">
            <img class="gp-badge" src="https://www-growth.scdn.co/static/badges/svgs/google/badge-pl.svg" alt="Pobierz w Google Play">
          </a>
        </div>
      </div>

      <div class="banner">
        <div class="app-showcase-container">
          <div class="wrapper">
            <img class="iphone" src="@/assets/iphone-13-pro-max.png" alt="">
            <video class="app-showcase"
              src="@/assets/appDemo.mp4" mute loop webkit-playsinline playsinline autoplay>
            </video>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ImageGallery from '@/components/ImageGallery/ImageGallery.vue';
import ServicesList from '@/components/Home/ServicesList.vue';
import AvailableSlotsList from '@/components/Home/AvailableSlotsList.vue';

export default {
  name: 'HomePage',
  components: {
    ImageGallery,
    ServicesList,
    AvailableSlotsList,
  },
  props: {
    scrolledToServices: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const photos = [];

    for (let i = 1; i <= 21; i += 1) {
      const photo = require(`@/assets/work-photos/${i}.jpg`); // eslint-disable-line
      photos.push({
        id: i,
        path: photo,
      });
    }

    const selectedServiceId = ref(null);

    return {
      t,
      photos,
      selectedServiceId,
    };
  },
};
</script>

<style lang="scss" scoped>
  #home-page {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    background-color: $primary-color;

    .mobile-app-banner {
      margin-top: 1.5rem;
      width: 100%;
      background-image: url('@/assets/app-baner-background.png');
      background-color: $secondary-color;
      color: $secondary-text-color;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-position: 50vw;
      background-size: 70%;
      background-repeat: no-repeat;
      padding: 0 10%;

      .cta {
        width: 45%;

        .primary {
          font-size: 1.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            display: block;
            width: 1.75rem;
            height: .625rem;
            background-color: $accent-color;
            margin-right: .75rem;
            border-radius: .75rem;
          }
        }

        .description {
          margin-top: 1rem;
        }

        .secondary {
          padding-top: 1.5rem;
        }

        .download-links {
          display: flex;
          align-items: center;
          padding-top: .75rem;

          a {
            padding: 0;
          }

          .app-store-badge {
            height: 65px;
          }

          .gp-badge {
            height: 95px;
          }
        }
      }

      .banner {
        .app-showcase-container {
          padding: 5vh 0;
        }

        .wrapper {
          position: relative;

          .iphone {
            height: 746px;
            width: 372px;
          }

          .app-showcase {
            position: absolute;
            top: 18px;
            width: 89%;
            border-radius: 20px;
          }
        }
      }
    }
  }
</style>
