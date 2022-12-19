<template>
  <n-config-provider :theme="$store.state.settings.theme === 'dark' ? darkTheme : lightTheme" abstract>
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
import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider, darkTheme, lightTheme } from "naive-ui";

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
      lightTheme,
    }
  }
};
</script>

<style lang="scss">

</style>
