<template>
  <section
    class="app-page"
    id="home-page"
  >
    <ServicesList
      :scrolledToServices="scrolledToServices"
      v-model:selectedServiceId="selectedServiceId"
    />

    <AvailableSlotsList :selectedServiceId="selectedServiceId" />

    <ImageGallery :photos="photos" />

    <section class="mobile-app-section">
      <h4 class="app-header">Aplikacja mobilna</h4>

      <div class="mobile-app-banner">
        <div class="cta">
          <p class="primary">{{ t("home.appHeading") }}</p>
          <p class="description">
            {{ t("home.appDescription") }}
          </p>
          <p class="secondary">
            {{ t("home.appDescriptionSecondary") }}
          </p>
          <div class="download-links">
            <a
              href="https://apps.apple.com/pl/app/zo%C5%82za-hairstyles/id1628563055"
              target="_blank"
            >
              <img
                class="app-store-badge"
                src="@/assets/app-store-badge.svg"
                alt="Pobierz z App Store"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=pl.zolzahairstyles.app"
              target="_blank"
            >
              <img
                class="gp-badge"
                src="https://www-growth.scdn.co/static/badges/svgs/google/badge-pl.svg"
                alt="Pobierz w Google Play"
              />
            </a>
          </div>
        </div>

        <div class="banner">
          <div class="app-showcase-container">
            <div class="wrapper">
              <img
                class="iphone"
                src="@/assets/iphone-13-pro-max.png"
                alt=""
              />
              <video
                class="app-showcase"
                src="@/assets/appDemo.mp4"
                muted
                loop
                webkit-playsinline
                playsinline
                autoplay
              >
                <track kind="captions" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ImageGallery from "@/components/ImageGallery/ImageGallery.vue";
import ServicesList from "@/components/Home/ServicesList.vue";
import AvailableSlotsList from "@/components/Home/AvailableSlotsList.vue";
import { v4 as uuidv4 } from "uuid";

import photo1 from "@/assets/work-photos/1.jpg";
import photo2 from "@/assets/work-photos/2.jpg";
import photo3 from "@/assets/work-photos/3.jpg";
import photo4 from "@/assets/work-photos/4.jpg";
import photo5 from "@/assets/work-photos/5.jpg";
import photo6 from "@/assets/work-photos/6.jpg";
import photo7 from "@/assets/work-photos/7.jpg";
import photo8 from "@/assets/work-photos/8.jpg";
import photo9 from "@/assets/work-photos/9.jpg";
import photo10 from "@/assets/work-photos/10.jpg";
import photo11 from "@/assets/work-photos/11.jpg";
import photo12 from "@/assets/work-photos/12.jpg";
import photo13 from "@/assets/work-photos/13.jpg";
import photo14 from "@/assets/work-photos/14.jpg";
import photo15 from "@/assets/work-photos/15.jpg";
import photo16 from "@/assets/work-photos/16.jpg";
import photo17 from "@/assets/work-photos/17.jpg";
import photo18 from "@/assets/work-photos/18.jpg";
import photo19 from "@/assets/work-photos/19.jpg";
import photo20 from "@/assets/work-photos/20.jpg";
import photo21 from "@/assets/work-photos/21.jpg";

export default {
  name: "HomePage",
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
    const { t } = useI18n({ useScope: "global" });

    const photos = ref([
      {
        id: uuidv4(),
        path: photo1,
      },
      {
        id: uuidv4(),
        path: photo2,
      },
      {
        id: uuidv4(),
        path: photo3,
      },
      {
        id: uuidv4(),
        path: photo4,
      },
      {
        id: uuidv4(),
        path: photo5,
      },
      {
        id: uuidv4(),
        path: photo6,
      },
      {
        id: uuidv4(),
        path: photo7,
      },
      {
        id: uuidv4(),
        path: photo8,
      },
      {
        id: uuidv4(),
        path: photo9,
      },
      {
        id: uuidv4(),
        path: photo10,
      },
      {
        id: uuidv4(),
        path: photo11,
      },
      {
        id: uuidv4(),
        path: photo12,
      },
      {
        id: uuidv4(),
        path: photo13,
      },
      {
        id: uuidv4(),
        path: photo14,
      },
      {
        id: uuidv4(),
        path: photo15,
      },
      {
        id: uuidv4(),
        path: photo16,
      },
      {
        id: uuidv4(),
        path: photo17,
      },
      {
        id: uuidv4(),
        path: photo18,
      },
      {
        id: uuidv4(),
        path: photo19,
      },
      {
        id: uuidv4(),
        path: photo20,
      },
      {
        id: uuidv4(),
        path: photo21,
      },
    ]);

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

  .mobile-app-section {
    margin-top: 1.5rem;
    width: 100%;
    background-color: $secondary-color;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
    align-items: center;

    .app-header {
      font-size: 2.5rem;
      color: $secondary-text-color;
    }
  }

  .mobile-app-banner {
    background-image: url("@/assets/app-baner-background.png");
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
          content: "";
          display: block;
          width: 1.75rem;
          height: 0.625rem;
          background-color: $accent-color;
          margin-right: 0.75rem;
          border-radius: 0.75rem;
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
        padding-top: 0.75rem;

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

@media only screen and (max-width: $xs) {
  #home-page {
    .mobile-app-banner {
      background-image: none;

      .cta {
        width: 95%;

        .download-links {
          flex-direction: column;
        }
      }

      .banner {
        display: none;
      }
    }
  }
}
</style>
