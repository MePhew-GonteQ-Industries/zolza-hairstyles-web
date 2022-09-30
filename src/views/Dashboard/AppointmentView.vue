<template>
  <div class="dashboard-page appointment-view">
    <div class="appointment elevated-card" v-if="appointment">
      <div class="left">
        <h1>Wizyta #{{ appointment.id }}</h1>
        <p><i :class="appointment.icon_class"></i> {{ appointment.status }}</p>
        <p>Utworzona: {{ appointment.created_at }}</p>
        <p>Czas rozpoczęcia: {{ appointment.start_slot.start_time_str }}</p>
        <p>Czas zakończenia: {{ appointment.end_slot.end_time_str }}</p>
        <div class="cards">
          <div class="elevated-card">
            <h2>
              {{ appointment.user.name }}
              {{ appointment.user.surname }}
            </h2>
            <p>{{ appointment.user.email }}</p>
            {{ appointment.user.permission_level }}
            <i :class="appointment.user.permission_level_icon_class"></i>
            <p>
              Płeć: {{ appointment.user.gender }}
              <i :class="appointment.user.gender_icon_class"></i>
            </p>
          </div>
          <div class="elevated-card">
            <h2>Strzyżenie męskie</h2>
            <p>
              Przewidziany czas:
              {{ appointment.service.average_time_minutes }} min
            </p>
            <template
              v-if="
                appointment.service.min_price === appointment.service.max_price
              "
            >
              <p>Cena: {{ appointment.service.min_price }} zł</p>
            </template>
            <template v-else>
              <p>Najniższa cena: {{ appointment.service.min_price }} zł</p>
              <p>Najwyższa cena: {{ appointment.service.max_price }} zł</p>
            </template>
          </div>
        </div>
      </div>
      <div class="right">
        <CustomButton type="error">Odwołaj</CustomButton>
        <CustomButton type="info">Zmień termin</CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import CustomButton from '@/components/CustomButton.vue';

export default {
  name: 'AppointmentView',
  components: {
    CustomButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const appointmentData = ref(null);

    onMounted(async () => {
      const storedAppointment = store.getters.getAppointmentById(
        route.params.id,
      );

      if (storedAppointment) {
        appointmentData.value = storedAppointment;
      } else {
        try {
          const response = await axios.get(
            `appointments/any/${route.params.id}`,
          );
          appointmentData.value = response.data;
        } catch (error) {
          handleRequestError(error);
        }
      }
    });

    const appointment = computed(() => {
      if (!appointmentData.value) return null;

      const startTime = new Date(
        `${appointmentData.value.start_slot.start_time}Z`,
      );
      const endTime = new Date(`${appointmentData.value.end_slot.end_time}Z`);

      const appointmentTemp = appointmentData.value;

      const locale = store.state.settings.language;

      appointmentTemp.start_slot.start_time_str = startTime.toLocaleTimeString(
        locale,
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );

      appointmentTemp.end_slot.end_time_str = endTime.toLocaleTimeString(
        locale,
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );

      appointmentTemp.shortId = appointmentData.value.id.substr(0, 4);

      if (appointmentData.value.archival) {
        appointmentTemp.status = 'Archiwalna';
        appointmentTemp.icon_class = 'ph-archive';
      } else if (appointmentData.value.canceled) {
        appointmentTemp.status = 'Odwołana';
        appointmentTemp.icon_class = 'ph-calendar-x';
      } else {
        appointmentTemp.status = 'Nadchodząca';
        appointmentTemp.icon_class = 'ph-arrow-square-up-right';
      }

      appointmentTemp.icon_class += '-light';

      if (appointmentData.value.user.gender === 'female') {
        appointmentTemp.user.gender_icon_class = 'ph-gender-female';
        appointmentTemp.user.gender = 'Żeńska';
      } else if (appointmentData.value.gender === 'male') {
        appointmentTemp.user.gender_icon_class = 'ph-gender-male';
        appointmentTemp.user.gender = 'Męska';
      } else {
        appointmentTemp.user.gender_icon_class = 'ph-gender-neuter';
        appointmentTemp.user.gender = 'Inna';
      }

      if (appointmentData.value.user.permission_level.includes('owner')) {
        appointmentTemp.user.permission_level_icon_class = 'ph-user-gear';
        appointmentTemp.user.permission_level = 'Właściciel';
      } else if (appointmentData.value.permission_level.includes('admin')) {
        appointmentTemp.user.permission_level_icon_class = 'ph-wrench';
        appointmentTemp.user.permission_level = 'Administrator';
      } else {
        appointmentTemp.user.permission_level_icon_class = 'ph-user';
        appointmentTemp.user.permission_level = 'Użytkownik';
      }
      appointmentTemp.user.permission_level_icon_class += '-light';

      appointmentTemp.user.gender_icon_class += '-light';

      return appointmentTemp;
    });

    return {
      appointment,
    };
  },
};
</script>

<style lang='scss' scoped>
.appointment {
  grid-template-columns: 3fr 1.2fr;

  .cards {
    display: flex;
    gap: 1rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
