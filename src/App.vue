<template>
  <div id="nav">
      <navbar />
      <hr>
  </div>
    <router-view class="router-view"/>
    <footer>
      <contactSection />
    </footer>
</template>

<script>
import navbar from '@/components/navbar.vue';
import contactSection from '@/components/contactSection.vue';

export default {
  components: {
    navbar,
    contactSection,
  },
};

</script>

<style lang="scss">
  body {
    background-color: #F2F2F2;
    height: 100%;

    #app {

      #nav {
        height: 8vh;
        z-index: 10; // TODO: FIX
        padding-bottom: 5px;
      }

      .router-view {
        height: 83vh;
        padding: 30px;
      }

      footer {
        height: 9vh;
        width: 100vw;
        padding: 5px 10% 0 10%;

        @media only screen and (max-width: 400px) {
          & {
            padding: 5px 5% 0 5%;
          }
        }
      }
    }
  }
</style>
