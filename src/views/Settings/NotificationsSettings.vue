<template>
<div class="settings-page">
  {{  t("settings.notificationsSettings.pageName") }}
</div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'NotificationsSettings',

  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return {
      t,
    };
  },

};
</script>

<style lang='scss' scoped>
</style>
