<template>
  <section class="app-page" id="dashboard-page">
    <SideMenu :links="links"/>
    <router-view></router-view>
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'DashboardPage',
  components: {
    SideMenu,
  },
  setup() {
    const links = [
      {
        id: uuidv4(),
        toName: 'summaryView',
        iconClass: 'ph-table-light',
        text: 'Podsumowanie',
      },
      {
        id: uuidv4(),
        toName: 'appointmentsManagement',
        iconClass: 'ph-bookmarks-light',
        text: 'Wizyty',
      },
      {
        id: uuidv4(),
        toName: 'servicesManagement',
        iconClass: 'ph-scissors-light',
        text: 'Usługi',
      },
      {
        id: uuidv4(),
        toName: 'usersManagement',
        iconClass: 'ph-users-light',
        text: 'Użytkownicy',
      },
      {
        id: uuidv4(),
        toName: 'workHoursManagement',
        iconClass: 'ph-clock-light',
        text: 'Godziny pracy',
      },
      {
        id: uuidv4(),
        toName: 'statsView',
        iconClass: 'ph-chart-line-light',
        text: 'Statystyki',
      },
      {
        id: uuidv4(),
        toName: 'serviceSettings',
        iconClass: 'ph-gear-six-light',
        text: 'Ustawienia',
      },
    ];

    return {
      links,
    };
  },
};
</script>

<style lang="scss">
</style>
