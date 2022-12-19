<template>
  <n-config-provider :theme="darkTheme" abstract>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <AppContainer />
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { onMounted } from 'vue';
import AppContainer from '@/views/AppContainer.vue';
import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider, darkTheme } from "naive-ui";
import { getToken } from "firebase/messaging";
import messaging from '@/firebase.js';
import { requestNotificationsPermission } from "@/utils.js";

export default {
  components: {
    AppContainer,
    NConfigProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
  },
  setup() {
    onMounted(async () => {
      if (requestNotificationsPermission()) {
        try {
          const currentToken = await getToken(messaging, { vapidKey: "BLMpEz50igRN6b0EZE5G_k02ua5eX-HU4H-CREyINg1pbgy73k0ith1QH4xTWtiYnZFe-fnjC0pke4ilErVRC0I" });
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken);
          } else {
            console.error('An error occurred while retrieving token.', 'The getToken function did not return a token')
          }
        } catch (err) {
          console.error('An error occurred while retrieving token.', err)
        }
      } else {
        // disable notifications for current user
      }
    });

    return {
      darkTheme,
    }
  }
};
</script>

<style lang="scss">

</style>
