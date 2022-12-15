<template>
  <n-config-provider :theme="darkTheme" abstract>
    <n-loading-bar-provider>
      <n-message-provider placement="top">
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
import AppContainer from '@/views/AppContainer.vue';
import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider, darkTheme, } from "naive-ui";

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
    return {
      darkTheme,
    }
  }
};
</script>

<style lang="scss">

</style>
