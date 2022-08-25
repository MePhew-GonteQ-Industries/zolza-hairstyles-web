<template>
  <div class="settings-page">
    <div class="elevated-card">
      <h1>Ustawienia powiadomień</h1>
      <ul class="notification-settings">
        <li>
          <p class="title">Przypomnienia o nadchodzących wizytach</p>
          <ul>
            <li>
              <CustomCheckbox
                appearance="switch"
                v-model:checked="upcomingAppointmentsEmailNotificationsEnabled"
              >
                Powiadomienia push
              </CustomCheckbox>
            </li>
            <li>
              <CustomCheckbox
                appearance="switch"
                v-model:checked="upcomingAppointmentsEmailNotificationsEnabled"
              >
                Powiadomienia e-mail
              </CustomCheckbox>
            </li>
          </ul>
        </li>
        <li>
          <p class="title">Powiadomienia o dostępności nowych funkcji</p>
          <ul>
            <li>
              <CustomCheckbox
                appearance="switch"
                v-model:checked="upcomingAppointmentsEmailNotificationsEnabled"
              >
                Powiadomienia push
              </CustomCheckbox>
            </li>
            <li>
              <CustomCheckbox
                appearance="switch"
                v-model:checked="upcomingAppointmentsEmailNotificationsEnabled"
              >
                Powiadomienia e-mail
              </CustomCheckbox>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomCheckbox from '@/components/CustomCheckbox.vue';

export default {
  name: 'NotificationsSettings',
  components: {
    CustomCheckbox,
  },
  setup() {
    const upcomingAppointmentsPushNotificationsEnabled = ref(false);
    const upcomingAppointmentsEmailNotificationsEnabled = ref(false);

    return {
      upcomingAppointmentsPushNotificationsEnabled,
      upcomingAppointmentsEmailNotificationsEnabled,
    };
  },
};
</script>

<style lang='scss' scoped>
.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

ul ul li {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 1.188rem;
  font-weight: 600;
  margin-bottom: 0.313rem;
}
</style>
