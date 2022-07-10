<template>
  <div class="notifications-wrapper" ref="notificationsPanel">
    <i class="bell-icon"
    :class="notificationsPanelExpanded ? 'ph-bell-fill': 'ph-bell-light'"
    @click='toggleNotificationsPanel'></i>
    <span class="unread-notifications-count"
    @click='toggleNotificationsPanel'>2</span>
    <div class="notifications-panel" v-show="notificationsPanelExpanded">
      <div class="panel-header">
        <h3>Notifications</h3>
        <router-link to="/notification-settings" @click="collapseNotificationsPanel">
          <i class="ph-gear-six-light notification-settings"></i>
        </router-link>
      </div>
      <div class="tab-selector">
        <button class="tab" :class='{ active: currentTabIndex === 0 }'
          @click="switchTab(0)">Events</button>
        <button class="tab" :class='{ active: currentTabIndex === 1 }'
          @click="switchTab(1)">My account</button>
        <button class="tab" :class='{ active: currentTabIndex === 2 }'
          @click="switchTab(2)">What's new</button>
      </div>
      <div class="no-notifications-info" v-if="notifications[currentTabIndex].length === 0">
        <p>There aren't any notifications yet</p>
      </div>
      <div class="notifications" v-if="currentTabIndex === 0">
        <ComposedNotification v-for="(notification, index) in notifications[0]"
        :key="index" :title="notification.title"/>
      </div>
      <div class="notifications" v-else-if="currentTabIndex === 1">
        <ComposedNotification v-for="(notification, index) in notifications[1]"
        :key="index" :title="notification.title"/>

      </div>
      <div class="notifications" v-else-if="currentTabIndex === 2">
        <ComposedNotification v-for="(notification, index) in notifications[2]"
        :key="index" :title="notification.title"/>
      </div>
      <div class="panel-footer">
        <p class="notifications-count">3 notifications</p>
        <button class="clear-notifications" @click="clearNotifications">
          Clear all</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ComposedNotification from '@/components/Navbar/ComposedNotification.vue';

export default {
  name: 'NotificationsPanel',
  components: {
    ComposedNotification,
  },
  setup() {
    const notificationsPanelExpanded = ref(false);
    const currentTabIndex = ref(0);
    const notifications = ref([
      [
        { title: 'You have an upcoming visit' },
        { title: 'NOTification' },
        { title: 'NOTification' },
        { title: 'NOTification' },
      ],
      [
        { title: 'Password Updated' },
        { title: 'Two Factor Authentication Enabled' },
        { title: 'Notification Test' },
      ],
      [
        { title: 'New feature: appointment history' },
        { title: 'Notification Test 2' },
      ],
    ]);

    function toggleNotificationsPanel() {
      notificationsPanelExpanded.value = !notificationsPanelExpanded.value;
    }

    function collapseNotificationsPanel() {
      notificationsPanelExpanded.value = false;
    }

    function switchTab(index) {
      currentTabIndex.value = index;
    }

    const notificationsPanel = ref(null);

    onClickOutside(notificationsPanel, () => {
      collapseNotificationsPanel();
    });

    function clearNotifications() {
      notifications.value[currentTabIndex.value] = [];
    }

    return {
      notificationsPanelExpanded,
      toggleNotificationsPanel,
      currentTabIndex,
      switchTab,
      notificationsPanel,
      collapseNotificationsPanel,
      clearNotifications,
      notifications,
    };
  },
};

</script>

<style lang='scss' scoped>
.notifications-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .bell-icon {
    font-size: 25px;
    cursor: pointer;
    box-sizing: content-box;
    padding: 1rem;
    border-radius: 50%;
    border: .1px solid transparent;

    &:active {
      background-color: $secondary-color;
    }
  }

  .unread-notifications-count {
    background-color: $accent-color;
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: .688rem;
    font-weight: 600;
    cursor: pointer;
  }

  .notifications-panel {
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: $secondary-color;
    height: 50vh;
    width: 50vw;
    min-height: 450px;
    max-height: 500px;
    min-width: 400px;
    max-width: 500px;
    background-color: $primary-color;
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 0 0 5px 5px;
    color: $primary-text-color;
    z-index: 10;

    h3 {
      font-weight: 600;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 0 20px;

      .notification-settings {
        font-size: 2rem;
        cursor: pointer;
        color: $primary-text-color;
      }
    }

    .tab-selector {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding: 20px;
      border-bottom: 1px solid $secondary-color;

      .tab {
        font-size: 1rem;
        background-color: transparent;
        border: none;
        color: $primary-text-color;
        cursor: pointer;
        position: relative;

        &.active {
          color: $secondary-text-color
        }

        &.active::after {
          content: '';
          position: absolute;
          bottom: -21px;
          height: 1px;
          width: 100%;
          background-color: $accent-color;
          left: 0;
        }
      }
    }

    .no-notifications-info {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;
    }

    .notifications {
      padding: 0 10px 10px 10px;
    }

    .panel-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;

      .notifications-count {
        color: grey;
        font-size: .9rem;
      }

      .clear-notifications {
        padding: 10px 20px;
        border-radius: 5px;
        background-color: $accent-color;
        cursor: pointer;
        outline: none;
        border: none;
        border: 2px solid transparent;

        &:hover {
          border-color: $accent-color;
        }
      }
    }
  }
}
</style>
