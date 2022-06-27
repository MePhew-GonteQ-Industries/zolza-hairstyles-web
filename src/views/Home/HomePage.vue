<template>
  <section class="app-page" id="home-page">
    <div class="services">

      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="40"
        :priceMin="25"
        :priceMax="50"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="40"
        :priceMin="25"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="80"
        :priceMin="25"
        :priceMax="90"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="40"
        :priceMin="25"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="90"
        :availability="40"
        :priceMin="120"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="40"
        :priceMin="25"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="80"
        :priceMin="25"/>
      <ServiceTile name="Strzyżenie męskie"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="20"
        :availability="40"
        :priceMin="25"/>

    </div>

    <div class="available-dates">
      <AvailableDateTile day="Dzisiaj" time="15:30"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
      <AvailableDateTile day="Kiedyś" time="21:37"/>
    </div>

    <ImageGallery :photos="photos"/>

    <div class="mobile-app-banner">

      <div class="cta">
        <p class="primary">Jedna aplikacja wiele możliwości</p>
        <p class="description">W aplikacji mobilnej na telefon możesz przeglądać wolne terminy,
          umawiać się na wizytę, oraz kontrolować swoje wszystkie wizyty w naszym salonie.</p>
        <p class="secondary">
          Aplikacja dostępna jest na urządzeniach z systemem Android, oraz IOS.
        </p>
        <div class="download-links">
          <a href=""><img src="@/assets/app-store-badge.svg" alt="Pobierz z App Store"></a>
          <a href=""><img src='@/assets/google-play-badge.png' alt='Pobierz z Google Play'/></a>
        </div>
      </div>

      <div class="banner">
        <video class="app-showcase"
          src="@/assets/appDemo.mp4" mute loop webkit-playsinline playsinline autoplay>
          </video>
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import ImageGallery from '@/components/ImageGallery/ImageGallery.vue';
import ServiceTile from '@/components/ServiceTile.vue';
import AvailableDateTile from '@/components/AvailableDateTile.vue';
import Photo1 from '@/assets/work-photos/1.jpg';
import Photo2 from '@/assets/work-photos/2.jpg';
import Photo3 from '@/assets/work-photos/3.jpg';
import Photo4 from '@/assets/work-photos/4.jpg';
import Photo5 from '@/assets/work-photos/5.jpg';
import Photo6 from '@/assets/work-photos/6.jpg';
import Photo7 from '@/assets/work-photos/7.jpg';
import Photo8 from '@/assets/work-photos/8.jpg';
import Photo9 from '@/assets/work-photos/9.jpg';
import Photo10 from '@/assets/work-photos/10.jpg';
import Photo11 from '@/assets/work-photos/11.jpg';
import Photo12 from '@/assets/work-photos/12.jpg';
import Photo13 from '@/assets/work-photos/13.jpg';
import Photo14 from '@/assets/work-photos/14.jpg';
import Photo15 from '@/assets/work-photos/15.jpg';
import Photo16 from '@/assets/work-photos/16.jpg';
import Photo17 from '@/assets/work-photos/17.jpg';
import Photo18 from '@/assets/work-photos/18.jpg';
import Photo19 from '@/assets/work-photos/19.jpg';
import Photo20 from '@/assets/work-photos/20.jpg';
import Photo21 from '@/assets/work-photos/21.jpg';

export default {
  name: 'HomePage',
  components: {
    ImageGallery,
    ServiceTile,
    AvailableDateTile,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const photos = [
      Photo1,
      Photo2,
      Photo3,
      Photo4,
      Photo5,
      Photo6,
      Photo7,
      Photo8,
      Photo9,
      Photo10,
      Photo11,
      Photo12,
      Photo13,
      Photo14,
      Photo15,
      Photo16,
      Photo17,
      Photo18,
      Photo19,
      Photo20,
      Photo21,
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
    background-color: white;
    color: white;

    .services {
      grid-template-columns: repeat(2, 1fr);
    }

    .services, .available-dates {
      min-height: 20vh;
      margin-top: 2.5rem;
      padding: 0 10%;
      color: black;
      width: 100%;
      display: grid;
      row-gap: 2rem;
    }

    .available-dates {
      background-color: #f2f2f2;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      padding: 3.5rem 10% 2.5rem 10%;
    }

    .mobile-app-banner {
      margin-top: 1.5rem;
      width: 100%;
      color: black;
      background-image: url('@/assets/app-baner-background.png');
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-position: 50vw;
      background-size: 70%;
      background-repeat: no-repeat;
      background-color: #f2f2f2;
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
            background-color: #fec92c;
            margin-right: .75rem;
            border-radius: .75rem;
          }
        }

        .secondary {
          padding-top: 1.5rem;
        }

        .download-links {
          display: flex;
          gap: 2rem;

          img {
            height: 70px;
            padding-top: .75rem;
            box-sizing: content-box;
          }
        }
      }

      .banner {
        .app-showcase {
          height: 75vh;
          padding: 5vh 0;
        }
      }
    }
  }
</style>
