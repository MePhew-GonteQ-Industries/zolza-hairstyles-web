<template>
  <div class="dashboard-page appointment-view">
    <div
      class="appointment elevated-card"
      v-if="appointment"
    >
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
            <h2>{{ appointment.service.name }}</h2>
            <p>
              Przewidziany czas:
              {{ appointment.service.average_time_minutes }} min
            </p>
            <template v-if="appointment.service.min_price === appointment.service.max_price">
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
        <CustomButton
          type="error"
          class="cancel-appointment-button"
          v-if="!appointment.archival && !appointment.canceled"
          @click="cancelAppointmentModalOpen = true"
          >Odwołaj
        </CustomButton>
        <CustomModal v-model:open="cancelAppointmentModalOpen">
          <template #title> Napewno chcesz anulować wizytę? </template>
          <div class="cancel-appointment-wrapper">
            <MessageBox type="warning">
              <template #title>Uwaga</template>
              <template #subtitle>Akcja jest nieodwracalna</template>
            </MessageBox>
            <div class="buttons-wrapper">
              <CustomButton
                type="error"
                @click="cancelAppointment"
                >Odwołaj wizytę</CustomButton
              >
              <CustomButton
                type="secondary"
                @click="cancelAppointmentModalOpen = false"
                >Zamknij
              </CustomButton>
            </div>
          </div>
        </CustomModal>
        <CustomButton
          type="info"
          class="change-appointment-date"
          v-if="!appointment.archival && !appointment.canceled"
          @click="changeAppointmentDateModalOpen = true"
        >
          Zmień termin</CustomButton
        >
        <CustomModal v-model:open="changeAppointmentDateModalOpen">
          <template #title> Zmiana daty wizyty </template>
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
                :min-date="new Date()"
                :max-date="maxDate"
              />
              <div class="hours">
                <CustomLoader v-if="loading"></CustomLoader>
                <div
                  class="slots-wrapper"
                  v-if="validatedSlots.length && !loading"
                >
                  <div
                    class="single-hour"
                    v-for="availableSlot in validatedSlots"
                    :key="availableSlot.id"
                    @click="selectAppointmentHour(availableSlot)"
                    :class="{ selected: availableSlot.id === selectedSlotId }"
                  >
                    {{
                      new Date(`${availableSlot.start_time}`).toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </div>
                </div>
                <div
                  class="no-slots"
                  v-if="!validatedSlots.length && !loading"
                >
                  Brak wolnych miejsc
                </div>
              </div>
            </div>
            <div class="buttons-wrapper">
              <CustomButton
                type="info"
                @click="changeAppointmentDate"
                >Zmień termin</CustomButton
              >
              <CustomButton
                type="secondary"
                @click="closeChangeAppointmentDateModal"
                >Zamknij
              </CustomButton>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import axios, { AxiosError } from "axios";
import { createRequestErrorMessage } from "@/utils";
import CustomButton from "@/components/CustomButton.vue";
import { DatePicker } from "v-calendar";
import CustomModal from "@/components/CustomModal.vue";
import MessageBox from "@/components/MessageBox.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import { useMessage } from "naive-ui";
import "v-calendar/dist/style.css";

export default {
  name: "AppointmentView",
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
    const router = useRouter();
    const { t } = useI18n({ useScope: "global" });
    const locale = store.state.settings.language;

    const appointmentData = ref(null);
    const selectedDate = ref(new Date());
    const loading = ref(false);
    const availableSlots = ref([]);
    const selectedSlotId = ref(null);
    const message = useMessage();

    const maxDate = ref(new Date());
    maxDate.value.setDate(maxDate.value.getDate() + 30);

    const selectedDateFormatted = computed(() => selectedDate.value.toISOString().split("T")[0]);

    const validatedSlots = computed(() => {
      const requiredSlots = appointmentData.value.service.required_slots;

      const slots = [];

      for (let i = 0; i < availableSlots.value.length; i++) {
        let slot = availableSlots.value[i];
        let currentSlotFits = 0;

        if (i + requiredSlots <= availableSlots.value.length) {
          for (let j = i; j < i + requiredSlots; j++) {
            let innerSlot = availableSlots.value[j];

            if (innerSlot.occupied) break;
            if (innerSlot.reserved) break;
            if (innerSlot.holiday) break;
            if (innerSlot.sunday) break;
            if (innerSlot.break_time) break;
            if (currentSlotFits === requiredSlots) break;
            currentSlotFits++;
          }
          if (currentSlotFits === requiredSlots) {
            slots.push(slot);
          }
        }
      }
      return slots;
    });

    const loadAvailableTimeSlots = async (date) => {
      try {
        const response = await axios.get(`appointments/slots?date=${date}`);
        availableSlots.value = response.data;
        loading.value = false;
      } catch (error) {
        message.error(
          `Nie udało się pobrać dostępnych slotów - ${createRequestErrorMessage(error)}`,
        );
      }
    };

    const selectAppointmentHour = (availableSlot) => {
      selectedSlotId.value = availableSlot.id;
    };

    const changeAppointmentDate = async () => {
      try {
        await axios.put(`appointments/any/${route.params.id}`, {
          first_slot_id: selectedSlotId.value,
        });
        message.success(t("snackBars.appointmentDateChange"));

        store.dispatch("deleteAppointments");
        selectedSlotId.value = null;
        selectedDate.value = new Date();
        changeAppointmentDateModalOpen.value = false;
        router.push({ name: "appointmentsManagement" });
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error;
        }

        message.error(
          `${t("snackBars.appointmentDateChangeError")} - ${createRequestErrorMessage(error)}`,
        );
      }
    };

    const cancelAppointment = async () => {
      try {
        await axios.post(`appointments/any/${route.params.id}`);
        message.success(t("snackBars.appointmentCancel"));

        store.dispatch("deleteAppointments");
        selectedSlotId.value = null;
        selectedDate.value = new Date();
        cancelAppointmentModalOpen.value = false;
        router.push({ name: "appointmentsManagement" });
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error;
        }

        message.error(
          `${t("snackBars.appointmentCancelError")} - ${createRequestErrorMessage(error)}`,
        );
      }
    };

    const closeChangeAppointmentDateModal = () => {
      selectedDate.value = new Date();
      selectedSlotId.value = null;
      changeAppointmentDateModalOpen.value = false;
    };

    watch(selectedDateFormatted, async (newDate) => {
      loading.value = true;
      await loadAvailableTimeSlots(newDate);
    });

    onMounted(async () => {
      loading.value = true;
      const storedAppointment = store.getters.getAppointmentById(route.params.id);
      if (storedAppointment) {
        appointmentData.value = storedAppointment;
      } else {
        try {
          const response = await axios.get(`appointments/any/${route.params.id}`);
          appointmentData.value = response.data;
        } catch (error) {
          message.error(`Nie udało się pobrać danych wizyty - ${createRequestErrorMessage(error)}`);
        }
      }
      await loadAvailableTimeSlots(selectedDateFormatted.value);
    });

    const cancelAppointmentModalOpen = ref(false);
    const changeAppointmentDateModalOpen = ref(false);

    const appointment = computed(() => {
      if (!appointmentData.value) return null;

      const startTime = new Date(`${appointmentData.value.start_slot.start_time}`);
      const endTime = new Date(`${appointmentData.value.end_slot.end_time}`);

      const appointmentTemp = JSON.parse(JSON.stringify(appointmentData.value));

      const locale = store.state.settings.language;

      appointmentTemp.start_slot.start_time_str = startTime.toLocaleTimeString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      appointmentTemp.end_slot.end_time_str = endTime.toLocaleTimeString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      appointmentTemp.shortId = appointmentData.value.id.substr(0, 4);

      if (appointmentData.value.archival) {
        appointmentTemp.status = "Archiwalna";
        appointmentTemp.icon_class = "ph-archive";
      } else if (appointmentData.value.canceled) {
        appointmentTemp.status = "Odwołana";
        appointmentTemp.icon_class = "ph-calendar-x";
      } else {
        appointmentTemp.status = "Nadchodząca";
        appointmentTemp.icon_class = "ph-arrow-square-up-right";
      }

      appointmentTemp.icon_class += "-light";

      if (appointmentData.value.user.gender === "female") {
        appointmentTemp.user.gender_icon_class = "ph-gender-female";
        appointmentTemp.user.gender = "Żeńska";
      } else if (appointmentData.value.gender === "male") {
        appointmentTemp.user.gender_icon_class = "ph-gender-male";
        appointmentTemp.user.gender = "Męska";
      } else {
        appointmentTemp.user.gender_icon_class = "ph-gender-neuter";
        appointmentTemp.user.gender = "Inna";
      }

      if (appointmentData.value.user.permission_level.includes("owner")) {
        appointmentTemp.user.permission_level_icon_class = "ph-user-gear";
        appointmentTemp.user.permission_level = "Właściciel";
      } else if (appointmentData.value.user.permission_level.includes("admin")) {
        appointmentTemp.user.permission_level_icon_class = "ph-wrench";
        appointmentTemp.user.permission_level = "Administrator";
      } else {
        appointmentTemp.user.permission_level_icon_class = "ph-user";
        appointmentTemp.user.permission_level = "Użytkownik";
      }
      appointmentTemp.user.permission_level_icon_class += "-light";

      appointmentTemp.user.gender_icon_class += "-light";

      return appointmentTemp;
    });

    return {
      appointment,
      cancelAppointmentModalOpen,
      changeAppointmentDateModalOpen,
      selectedDate,
      loading,
      selectedDateFormatted,
      loadAvailableTimeSlots,
      availableSlots,
      validatedSlots,
      locale,
      changeAppointmentDate,
      selectedSlotId,
      selectAppointmentHour,
      cancelAppointment,
      message,
      t,
      closeChangeAppointmentDateModal,
      maxDate,
    };
  },
};
</script>

<style lang="scss">
.vc-header button {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
</style>

<style lang="scss" scoped>
.appointment-view {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-appointment-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }
}

.change-appointment-date-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }

  .date-picker-wrapper {
    display: flex;

    @media only screen and (max-width: $sm) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .hours {
      margin-left: 10px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;

      .slots-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;

        @media only screen and (max-width: $sm) {
          grid-template-columns: repeat(3, 1fr);
        }

        .single-hour {
          padding: 25px;
          display: flex;
          flex-direction: column;
          border: 1px solid $secondary-color;
          width: 90px;
          border-radius: 12px;
          cursor: pointer;

          &:hover {
            color: $accent-color;
            background-color: $background-accent-low;
          }

          &:active,
          &.selected {
            color: $accent-color;
            border-color: $accent-color;
          }
        }
      }

      .no-slots {
        color: $error-color;
      }
    }
  }
}

.elevated-card {
  @media only screen and (max-width: $xs) {
    flex-direction: column;
  }
}

.appointment {
  grid-template-columns: 3fr 1.2fr;

  .cards {
    display: flex;
    gap: 1rem;

    @media only screen and (max-width: $xs) {
      flex-direction: column;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
