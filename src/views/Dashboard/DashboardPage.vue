<template>
  <section class="app-page" id="dashboard-page">
      <DasboardNavigation class='dashboard-navigation'/>
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

<style lang="scss" scoped>
#dashboard-page {
  justify-content: flex-start;

  .dashboard-navigation {
    width: 100%;
  }
}
</style>
