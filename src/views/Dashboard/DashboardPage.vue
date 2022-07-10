<template>
  <section class="app-page" id="dashboard-page">
      <DasboardNavigation class='dashboard-navigation'/>
      <router-view></router-view>
  </section>
</template>

<script>
import DasboardNavigation from '@/views/Dashboard/DasboardNavigation.vue';

export default {
  name: 'DashboardPage',
  components: {
    DasboardNavigation,
  },
};
</script>

<style lang="scss">
#dashboard-page {
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: stretch;
  background-color: $secondary-color;
}
</style>
