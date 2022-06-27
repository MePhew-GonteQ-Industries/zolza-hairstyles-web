<template>
  <div id="app-wrapper" :data-theme="state.theme">

    <main>
      <div class="wrapper">
        <div id="nav">
          <navbarSection :data-theme="state.theme" @theme-toggled="toggleTheme"/>
        </div>

        <section class="hero">
          <img class="wordmark" src="@/assets/wordmark.svg" alt="">
          <h1 class="description">Profesjonalny salon fryzjerski. Golenie brzytwą,
            stryżenie włosów, fryzury ślubne, oraz okolicznosciowe.
            Zapraszamy do zapoznania się z naszą ofertą, oraz
            prezentacją wykonanych przez nas fryzur.</h1>
        </section>
        <i class="ph-caret-down-light" @click="scrollToServices"></i>

        <div class="divider">
          <img src="@/assets/custom-divider.svg" alt="">
        </div>
      </div>
    </main>

    <router-view :scrolledToServices="scrolledToServices"
      @scrollingFinished="scrollingFinished" class="router-view"/>

    <footer>
      <contactSection />
    </footer>

  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, onMounted, ref } from 'vue';
import navbarSection from '@/components/Navbar/NavbarSection.vue';
import contactSection from '@/views/Contact/ContactSection.vue';

export default {
  components: {
    navbarSection,
    contactSection,
  },
  setup() {
    const store = useStore();

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme;

    if (prefersDarkMode) {
      theme = 'dark';
    } else {
      theme = 'light';
    }

    const state = reactive({
      theme,
    });

    function toggleTheme() {
      switch (state.theme) {
        case 'light':
          state.theme = 'dark';
          break;
        case 'dark':
          state.theme = 'light';
          break;
        default:
          console.error('Theme was in an incorrect state');
      }
    }

    onMounted(() => {
      store.dispatch('loadUser');
    });

    const scrolledToServices = ref(false);

    const scrollToServices = () => {
      scrolledToServices.value = true;
    };

    const scrollingFinished = () => {
      scrolledToServices.value = false;
    };

    return {
      state,
      toggleTheme,
      scrollToServices,
      scrolledToServices,
      scrollingFinished,
    };
  },
};

</script>

<style lang="scss">
  #app {

    #app-wrapper {
      height: 100vh;

      .router-view {
        min-height: 85%;
      }

      main {
        position: relative;
        height: 77vh;
        background-image: url('@/assets/hero-img.jpg');
        background-size: cover;
        background-position: 0 40%;

        .wrapper {
          height: 100%;
          background-color: rgba(33, 33, 33, .6);
          display: flex;
          flex-direction: column;
        }

        #nav {
          top: 0;
          height: 8%;
          min-height: 50px;
          max-height: 75px;
          width: 100%;
          z-index: 10;
        }

        .ph-caret-down-light {
            color: white;
            font-size: 2rem;
            margin-bottom: 4%;

            &:hover {
              cursor: pointer;
            }
          }

        .hero {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10%;
          justify-content: center;

          .description {
            color: white;
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            margin-top: .75rem;
            max-width: 45vw;
            font-weight: 400;
          }

          .wordmark {
            height: 5rem;
            filter: invert(1);
          }
        }

        footer {
          height: 7%;
        }
      }

      .divider {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        line-height: 0;
        transform: rotate(180deg);

        img {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 61px;
        }
      }
    }
  }
</style>
