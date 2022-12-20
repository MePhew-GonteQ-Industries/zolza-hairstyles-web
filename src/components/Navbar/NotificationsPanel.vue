<template>
  <div class="notifications-wrapper" ref="notificationsWrapper">
    <i class="bell-icon" :class="notificationsPanelExpanded ? 'ph-bell-fill' : 'ph-bell-light'"
      @click="toggleNotificationsPanel" @keyup.enter="toggleNotificationsPanel" v-ripple></i>
    <NBadge class="unread-notifications-count" color="var(--accent-color)" :max="9" :value="2" />
    <div class="notifications-panel" v-show="notificationsPanelExpanded" ref="notificationsPanel">
      <div class="panel-header">
        <h3>Notifications</h3>
        <router-link to="/settings/notifications" @click="collapseNotificationsPanel">
          <i class="ph-gear-six-light notification-settings"></i>
        </router-link>
      </div>
      <div class="tab-selector">
        <button class="tab" :class="{ active: currentTabIndex === 0 }" @click="switchTab(0)">
          Events
        </button>
        <button class="tab" :class="{ active: currentTabIndex === 1 }" @click="switchTab(1)">
          My account
        </button>
        <button class="tab" :class="{ active: currentTabIndex === 2 }" @click="switchTab(2)">
          What's new
        </button>
        <div class="active-tab-indicator"></div>
      </div>
      <div class="no-notifications-info" v-if="notifications[currentTabIndex].length === 0">
        <p>There aren't any notifications yet</p>
      </div>
      <div class="notifications" v-if="currentTabIndex === 0" ref="notificationsList">
        <ComposedNotification v-for="(notification, index) in notifications[0]" :key="index"
          :title="notification.title" />
      </div>
      <div class="notifications" v-else-if="currentTabIndex === 1" ref="notificationsList">
        <ComposedNotification v-for="(notification, index) in notifications[1]" :key="index"
          :title="notification.title" />
      </div>
      <div class="notifications" v-else-if="currentTabIndex === 2" ref="notificationsList">
        <ComposedNotification v-for="(notification, index) in notifications[2]" :key="index"
          :title="notification.title" />
      </div>
      <div class="panel-footer">
        <p class="notifications-count">3 notifications</p>
        <CustomButton class="clear-notifications" @click="clearNotifications">Clear all
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { onClickOutside, useMouseInElement } from "@vueuse/core";
import ComposedNotification from "@/components/Navbar/ComposedNotification.vue";
import CustomButton from "@/components/CustomButton.vue";
import { NBadge } from 'naive-ui';

export default {
  name: "NotificationsPanel",
  components: {
    ComposedNotification,
    CustomButton,
    NBadge,
  },
  setup() {
    const notificationsPanelExpanded = ref(false);
    const currentTabIndex = ref(0);
    const notifications = ref([
      [
        { title: "You have an upcoming visit" },
        { title: "NOTification" },
        { title: "NOTification" },
        { title: "NOTification" },
      ],
      [
        { title: "Password Updated" },
        { title: "Two Factor Authentication Enabled" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "Notification Test" },
        { title: "KEKW" },
      ],
      [{ title: "New feature: appointment history" }, { title: "Notification Test 2" }],
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

    const notificationsWrapper = ref(null);

    onClickOutside(notificationsWrapper, () => {
      collapseNotificationsPanel();
    });

    function clearNotifications() {
      notifications.value[currentTabIndex.value] = [];
    }

    const notificationsPanel = ref(null);

    const mouseIsOutsideNotificationsPanel = useMouseInElement(notificationsPanel).isOutside;

    const notificationsList = ref(null);

    const notificationsListOverflows = computed(
      () => notificationsList.value.clientHeight < notificationsList.value.scrollHeight
    );

    const scrollHandler = (e) => {
      if (!notificationsPanelExpanded.value) {
        document.removeEventListener("wheel", scrollHandler);
        return;
      }

      if (mouseIsOutsideNotificationsPanel.value) {
        collapseNotificationsPanel();
      } else if (!notificationsListOverflows.value) {
        e.preventDefault();
      } else if (
        (notificationsList.value.scrollTop === 0 && e.deltaY < 0) ||
        (notificationsList.value.scrollTop ===
          notificationsList.value.scrollHeight - notificationsList.value.offsetHeight &&
          e.deltaY > 0)
      ) {
        e.preventDefault();
      }
    };

    watch(notificationsPanelExpanded, (newValue) => {
      if (newValue) {
        document.addEventListener("wheel", scrollHandler, { passive: false });
        return;
      }

      document.removeEventListener("wheel", scrollHandler);
    });

    return {
      notificationsPanelExpanded,
      toggleNotificationsPanel,
      currentTabIndex,
      switchTab,
      notificationsWrapper,
      notificationsPanel,
      collapseNotificationsPanel,
      clearNotifications,
      notifications,
      notificationsList,
    };
  },
};
</script>

<style lang="scss" scoped>
.notifications-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 500;

  .bell-icon {
    font-size: 25px;
    cursor: pointer;
    box-sizing: content-box;
    padding: 1rem;
    border-radius: 50%;
    border: 0.1px solid transparent;
  }

  .unread-notifications-count {
    position: absolute;
    top: 12.5px;
    right: 10px;
    cursor: pointer;
    pointer-events: none;
  }

  .notifications-panel {
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: $secondary-color;
    min-height: 50vh;
    max-height: 90vh;
    width: 50vw;
    min-width: 400px;
    max-width: 500px;
    background-color: $primary-color;
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 0 0 5px 5px;
    color: $primary-text-color;

    @media only screen and (max-width: $xs) {
      min-width: 350px;
      min-height: 0;
      right: -70px;
    }

    h3 {
      font-weight: 600;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 0 20px;

      @media only screen and (max-width: $xs) {
        font-size: 1rem;
      }

      .notification-settings {
        font-size: 2rem;
        cursor: pointer;
        color: $primary-text-color;

        @media only screen and (max-width: $xs) {
          font-size: 1rem;
        }
      }
    }

    .tab-selector {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.625rem 2rem;
      border-bottom: 1px solid $secondary-color;
      position: relative;

      @media only screen and (max-width: $xs) {
        font-size: 0.9rem;
      }

      $offset: 158px;

      & .tab:nth-child(1).active~.active-tab-indicator {
        transform: translateX(calc($offset * 0));
      }

      & .tab:nth-child(2).active~.active-tab-indicator {
        transform: translateX(calc($offset * 1));
      }

      & .tab:nth-child(3).active~.active-tab-indicator {
        transform: translateX(calc($offset * 2));
      }

      .active-tab-indicator {
        position: absolute;
        bottom: 0;
        left: 2rem;
        height: 1px;
        width: 120px;
        background-color: $accent-color;
      }

      .tab {
        font-size: 1rem;
        background-color: transparent;
        border: none;
        color: $primary-text-color;
        cursor: pointer;
        position: relative;
        height: 40px;
        width: 120px;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &.active {
          color: $secondary-text-color;
        }
      }
    }

    .no-notifications-info {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;

      @media only screen and (max-width: $xs) {
        font-size: 0.8rem;
      }
    }

    .notifications {
      padding: 0.5rem 20px 0.5rem 20px;
      max-height: 65vh;
      overflow-y: hidden;

      @media only screen and (max-width: $xs) {
        padding: 0;
        font-size: 0.8rem;
      }

      &:hover {
        overflow-y: auto;
      }
    }

    .panel-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;

      .notifications-count {
        color: grey;
        font-size: 0.9rem;

        @media only screen and (max-width: $xs) {
          font-size: 0.7rem;
        }
      }

      .clear-notifications {
        width: 100px;
        text-transform: none;
      }
    }
  }
}
</style>
