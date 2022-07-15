<template>
  <nav class="dashboard-navigation">
    <router-link :to='{ name: "summaryView" }'>
      <span><i class="ph-table-light"></i>Podsumowanie</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "appointmentsManagement" }'>
      <span><i class="ph-bookmarks-light"></i>Wizyty</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "servicesManagement" }'>
      <span><i class="ph-scissors-light"></i>Usługi</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "usersManagement" }'>
      <span><i class="ph-users-light"></i>Użytkownicy</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "workHoursManagement" }'>
      <span><i class="ph-clock-light"></i>Godziny pracy</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "statsView" }'>
      <span><i class="ph-chart-line-light"></i>Statystyki</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>

    <router-link :to='{ name: "serviceSettings" }'>
      <span><i class="ph-gear-six-light"></i>Ustawienia</span>
      <div class="edge top"></div>
      <div class="edge bottom"></div>
    </router-link>
    <div class="active-tab-indicator"></div>
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
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  justify-content: center;
  height: calc(100vh - 6rem);
  width: 100%;
  position: relative;

  $offset: 88px;

  & a:nth-child(1).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 0));
  }

  & a:nth-child(2).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 1));
  }

  & a:nth-child(3).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 2));
  }

  & a:nth-child(4).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 3));
  }

  & a:nth-child(5).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 4));
  }

  & a:nth-child(6).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 5));
  }

  & a:nth-child(7).router-link-exact-active  ~ .active-tab-indicator {
      transform: translateY(calc($offset * 6));
  }

  .active-tab-indicator {
    height: 15px;
    width: 15px;
    position: absolute;
    top: 138px;
    left: -8px;
    border-radius: 100%;
    background-color: $accent-color;
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
    margin-bottom: 1rem;

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

    span {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 200px;
      font-family: 'Open Sans', sans-serif;
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
