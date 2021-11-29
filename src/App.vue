<template>
  <body>
    <div id="content">
      <div id="nav">
          <navbar />
      </div>
        <router-view class="router-view"/>
        <footer>
          <contactSection />
        </footer>
    </div>
  </body>
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
  #app {
      height: 100vh;
  }

  #nav {
      position: sticky;
      top: 0;
      height: 10%;
      z-index: 10;
  }
</style>
