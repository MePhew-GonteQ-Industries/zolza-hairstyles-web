<template>
  <div id="app-wrapper" :data-theme="state.theme">

    <main ref='main' :class="{collapsed: !onHomePage}">
      <div id="nav" ref="navbar"
        :class="{ fixed: navbarFixed && onHomePage,
        'static-outside-viewport': !navbarFixed && !navbarVisible }">
        <navbarSection :data-theme="state.theme" @theme-toggled="toggleTheme"/>
      </div>
      <div class="wrapper" v-if="onHomePage">
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

    <router-view :scrolledToServices="scrolledToServices" class="router-view"/>

    <footer>
      <contactSection />
    </footer>

  </div>
</template>

<script>
import { useStore } from 'vuex';
import {
  reactive, onMounted, ref, watch, computed,
} from 'vue';
import { useElementVisibility, useWindowScroll } from '@vueuse/core';
import navbarSection from '@/components/Navbar/NavbarSection.vue';
import contactSection from '@/views/Contact/ContactSection.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    navbarSection,
    contactSection,
  },
  setup() {
    const router = useRouter();

    const onHomePage = computed(() => router.currentRoute.value.name === 'Home');

    const store = useStore();

    // const prefersDarkMode =
    // window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = 'light';

    // if (prefersDarkMode) {
    //   theme = 'dark';
    // } else {
    //   theme = 'light';
    // }

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
      scrolledToServices.value = !scrolledToServices.value;
    };

    const { y } = useWindowScroll();

    const navbar = ref(null);

    const navbarHeight = ref(null);

    const navbarVisible = computed(() => y.value <= navbarHeight.value);

    onMounted(() => {
      navbarHeight.value = navbar.value.offsetHeight;
    });

    const main = ref(null);

    const mainSectionVisible = useElementVisibility(main);

    const navbarFixed = ref(false);

    watch(mainSectionVisible, (newValue) => {
      navbarFixed.value = !newValue;
    });

    return {
      state,
      toggleTheme,
      scrollToServices,
      scrolledToServices,
      navbarFixed,
      main,
      navbarVisible,
      onHomePage,
      navbar,
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
        color: white;

        &.collapsed {
          height: 80px;
          background-image: none;
          color: black;

          #nav {
            background-color: white;
          }

          .wordmark {
            filter: none;
          }
        }

        a:not(.router-link-active) {
          color: inherit;
        }

        .wrapper {
          height: 100%;
          background-color: rgba(33, 33, 33, .6);
          display: flex;
          flex-direction: column;
        }

        #nav {
          position: fixed;
          top: 0;
          height: 5rem;
          min-height: 40px;
          max-height: 80px;
          width: 100%;
          z-index: 10;
          transform: translateY(0);
          transition: all .6s;

          &.static-outside-viewport {
            position: fixed;
            top: -150px;
          }

          &.fixed {
            position: fixed;
            top: -150px;
            background-color: rgba(33, 33, 33, .6);
            transform: translateY(150px);
          }
        }

        .ph-caret-down-light {
            color: white;
            font-size: 2rem;
            margin-bottom: 4%;
            cursor: pointer;
            animation-name: bounceArrow;
            animation-duration: 4s;
            animation-iteration-count: infinite;
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
  @keyframes bounceArrow{
    0%{
      margin-bottom: 4%;
    }
    50%{
      margin-bottom: 2%;
    }
    100%{
      margin-bottom: 4%;
    }
  }
</style>
