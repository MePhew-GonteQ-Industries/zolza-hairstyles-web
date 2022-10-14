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
        <CustomButton type="error"
        class="cancel-appointment-button"
        @click="cancelAppointmentModalOpen = true"
        >Odwołaj</CustomButton>
        <CustomModal v-model:open="cancelAppointmentModalOpen">
          <template #title>
            Napewno chcesz anulować wizytę?
          </template>
            <div class="cancel-appointment-wrapper">
              <MessageBox type="warning">
                <template #title>Uwaga</template>
                <template #subtitle>Akcja jest nieodwracalna</template>
              </MessageBox>
              <div class="buttons-wrapper">
                <CustomButton type="error">Anuluj wizytę</CustomButton>
                <CustomButton type="secondary"
                @click="cancelAppointmentModalOpen = false">Zamknij</CustomButton>
              </div>
            </div>
        </CustomModal>
        <CustomButton type="info"
        class="change-appointment-date"
        @click="changeAppointmentDateModalOpen = true">
          Zmień termin</CustomButton>
          <CustomModal v-model:open="changeAppointmentDateModalOpen">
            <template #title>
              Zmiana daty wizyty
            </template>
            <div class="change-appointment-date-wrapper">
              <MessageBox type="info">
                <template #title>Obecny slot wizyty zwolni się</template>
                <template #subtitle>
                  Bieżący slot na którym była umówiona wizyta będzie mógł ponownie zostać zajęty.
                </template>
              </MessageBox>
              <div class="date-picker-wrapper">
                <DatePicker
                :is-dark="$store.state.settings.theme === 'dark'"
                is-required
                color="green"
                mode="date"
                v-model="selectedDate"
                />
                <div class="loader">
                  <CustomLoader></CustomLoader>
                </div>
              </div>
              <div class="buttons-wrapper">
                <CustomButton type="info">Zmień termin</CustomButton>
                <CustomButton type="secondary"
                @click="changeAppointmentDateModalOpen = false">Zamknij</CustomButton>
              </div>
            </div>
          </CustomModal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, onMounted, computed, watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import CustomButton from '@/components/CustomButton.vue';
import { DatePicker } from 'v-calendar';
import CustomModal from '../../components/CustomModal.vue';
import MessageBox from '../../components/MessageBox.vue';
import CustomLoader from '../../components/CustomLoader.vue';

export default {
  name: 'AppointmentView',
  components: {
    CustomButton,
    CustomModal,
    MessageBox,
    DatePicker,
    CustomLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const appointmentData = ref(null);
    const selectedDate = ref(new Date());

    watch(selectedDate, (newDate) => {
      console.log(newDate.toISOString().split('T')[0]);
    });

    onMounted(async () => {
      console.log(selectedDate.value.toISOString().split('T')[0]);
      // try{
      //   const awailableSlots = await axios.get()
      // } catch (error) {
      //   handleRequestError(error);
      // }
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

    const cancelAppointmentModalOpen = ref(false);
    const changeAppointmentDateModalOpen = ref(false);

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
      cancelAppointmentModalOpen,
      changeAppointmentDateModalOpen,
      selectedDate,
    };
  },
};
</script>

<style lang='scss' scoped>
.cancel-appointment-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .buttons-wrapper{
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }
}
.change-appointment-date-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .buttons-wrapper{
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }
  .date-picker-wrapper{
    display: flex;
    .loader{
      width: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
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
