<template>
  <div class="notifications-wrapper" ref="notificationsPanel">
        <img class="prof-icon"
        :src="notificationsPanelExpanded ? bellFill: bellOutline"
        alt="bell-notification-icon" @click='toggleNotificationsPanel'>
        <span class="unread-notifications-count">2</span>
        <div class="notifications-panel" v-show="notificationsPanelExpanded">
          <div class="panel-header">
            <h3>Notifications</h3>
            <router-link to="/notification-settings" @click="collapseNotificationsPanel">
              <img class="notification-settings" src="@/assets/settings.svg" alt="settings-icon">
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
import bellFill from '@/assets/bell-fill.svg';
import bellOutline from '@/assets/bell-outline.svg';

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
        { title: 'Notification Test' },
      ],
      [
        { title: 'New feature: appointment history' },
        { title: 'Notification Test 2' },
        { title: 'Notification Test 2' },
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
      bellFill,
      bellOutline,
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

  .prof-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .unread-notifications-count {
    background-color: #CD0700;
    color: white;
    padding: 4px;
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    right: -10px;
    top: -5px;
    font-size: .6rem;
    border: 2px solid $accent-bg-color;
    font-weight: 600;
  }

  .notifications-panel {
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #363b41;
    height: 50vh;
    width: 50vw;
    min-height: 450px;
    max-height: 500px;
    min-width: 400px;
    max-width: 500px;
    background-color: #202427;
    position: absolute;
    top: 30px;
    right: 0;
    border-radius: 0 0 5px 5px;
    color: white;

    h3 {
      font-weight: 600;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 0 20px;

      .notification-settings {
        height: 25px;
        width: 25px;
        cursor: pointer;
      }
    }

    .tab-selector {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding: 20px;
      border-bottom: 1px solid #363b41;

      .tab {
        font-size: 1rem;
        background-color: transparent;
        border: none;
        color: grey;
        cursor: pointer;
        position: relative;

        &.active {
          color: white
        }

        &.active::after {
          content: '';
          position: absolute;
          bottom: -21px;
          height: 1px;
          width: 100%;
          background-color: #43C2FC;
          left: 0;
          transition: transform 500ms;
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
        background-color: #43C2FC;
        cursor: pointer;
        outline: none;
        border: none;
        border: 2px solid transparent;
        transition: border-color 600ms;

        &:hover {
          border-color: white;
        }
      }
    }
  }
}
</style>