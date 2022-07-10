<template>
  <nav class="dashboard-navigation">
    <ul>
      <li>
        <router-link :to='{ name: "summaryView" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-table-light"></i>Podsumowanie</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "appointmentsManagement" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-bookmarks-light"></i>Wizyty</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "servicesManagement" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-scissors-light"></i>Usługi</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "usersManagement" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-users-light"></i>Użytkownicy</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "workHoursManagement" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-clock-light"></i>Godziny pracy</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "statsView" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-chart-line-light"></i>Statystyki</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
      <li>
        <router-link :to='{ name: "serviceSettings" }'>
          <div class="selection-indicator"></div>
          <span><i class="ph-gear-six-light"></i>Ustawienia</span>
          <div class="edge top"></div>
          <div class="edge bottom"></div></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'DashboardNavigation',
};
</script>

<style lang="scss" scoped>
.dashboard-navigation {
  background-color: $secondary-color;
  color: $accent-text-color;

  ul {
    display: flex;
    flex-direction: column;
    justify-items: stretch;
    justify-content: center;
    height: calc(100vh - 6rem);
    width: 100%;
    position: relative;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  a {
    color: $accent-text-color;
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1rem;
    transition: none;

    &.router-link-exact-active{

      .selection-indicator {
        background-color: $accent-color;
      }
    }

    &:hover, &.router-link-exact-active {
      background-color: $primary-color;

      i {
        background-color: $secondary-color;
      }

      .edge {
        content: '';
        height: 30px;
        width: 30px;
        position: absolute;
        bottom: -28px;
        right: -2px;
        overflow: hidden;

        &::after {
          content: "";
          position:absolute;
          bottom: -12px;
          left: -12px;
          width: 40px;
          height: 40px;
          box-shadow: 0 0 0 250px $primary-color;
          border-radius: 30%;
        }

        &.top {
          top: -28px;

          &::after {
            top: -12px;
          }
        }
      }
    }

    &.router-link-exact-active {
      color: $accent-color;
    }

    * {
      transition: none;
    }

    .selection-indicator {
      height: 15px;
      width: 15px;
      position: absolute;
      left: -10px;
      border-radius: 100%;
    }

    span {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 200px;
    }

    i {
      font-size: 1.5rem;
      background-color: $primary-color;
      padding: .5rem;
      border-radius: 35%;
    }
  }
}
</style>>
