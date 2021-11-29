<template>
  <body>
    <div id="content">
      <div id="nav">
          <navbar />
      </div>
      <div id="middle">
        <login />
      </div>
        <!--<router-view id="router-view"/>-->
        <footer>
          <contactSection />
        </footer>
    </div>
  </body>
</template>

<script>
import navbar from '@/components/navbar.vue';
import contactSection from '@/components/contactSection.vue';
import login from '@/views/Login.vue';

export default {
  components: {
    navbar,
    contactSection,
    login,
  },
};

</script>

<style lang="scss">
  #app {
    height: 100vh;
    overflow: hidden;
  }
  #content{
    height: 100%;
    width: 100%;
  }
  #middle{
    height: calc(100vh - 95.5px - 70px - 75px);
    width: 100%;
  }
  #nav {
      position: sticky;
      top: 0;
      height: 80px;
      z-index: 10;
  }
</style>
