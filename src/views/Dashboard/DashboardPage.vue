<template>
  <section
    class="app-page"
    id="dashboard-page"
  >
    <CustomHorizontalMenu
      :links="links"
      class="horizontal-menu"
    ></CustomHorizontalMenu>
    <SideMenu
      :links="links"
      class="side-menu"
    />
    <router-view></router-view>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { v4 as uuidv4 } from "uuid";
import SideMenu from "@/components/SideMenu.vue";
import CustomHorizontalMenu from "@/components/CustomHorizontalMenu.vue";

export default {
  name: "DashboardPage",
  components: {
    SideMenu,
    CustomHorizontalMenu,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const links = [
      // {
      //   id: uuidv4(),
      //   toName: "summaryView",
      //   iconClass: "ph-table-light",
      //   text: t("dashboard.sideMenu.summary"),
      // },
      {
        id: uuidv4(),
        toName: "appointmentsManagement",
        iconClass: "ph-bookmarks-light",
        text: t("dashboard.sideMenu.appointments"),
      },
      {
        id: uuidv4(),
        toName: "servicesManagement",
        iconClass: "ph-scissors-light",
        text: t("dashboard.sideMenu.services"),
      },
      {
        id: uuidv4(),
        toName: "usersManagement",
        iconClass: "ph-users-light",
        text: t("dashboard.sideMenu.users"),
      },
      {
        id: uuidv4(),
        toName: "workHoursManagement",
        iconClass: "ph-clock-light",
        text: t("dashboard.sideMenu.workHours"),
      },
      // {
      //   id: uuidv4(),
      //   toName: "statsView",
      //   iconClass: "ph-chart-line-light",
      //   text: t("dashboard.sideMenu.statistics"),
      // },
      // {
      //   id: uuidv4(),
      //   toName: "serviceSettings",
      //   iconClass: "ph-gear-six-light",
      //   text: t("dashboard.sideMenu.settings"),
      // },
    ];

    return {
      links,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
#dashboard-page {
  .horizontal-menu {
    width: 92vw;
    display: none;
    @media only screen and (max-width: $xs) {
      display: block;
    }
  }
}
@media only screen and (max-width: $xs) {
  .side-menu {
    display: none;
  }
}
</style>
