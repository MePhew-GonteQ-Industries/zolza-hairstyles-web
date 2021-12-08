<template>
  <div id="nav">
      <navbar />
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
</style>
