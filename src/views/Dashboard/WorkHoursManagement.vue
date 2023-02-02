<template>
  <section class="dashboard-page">
    <div class=" work-hours-page">
      <div class="reserving-slots-wrapper">
        <n-button tertiary type="primary" @click="openReservingSlotsModal = true">Zarezerwuj sloty</n-button>
        <CustomModal v-model:open="openReservingSlotsModal">
          <template #title>Zarezerwuj godziny</template>
          <div class="reserving-slots-modal-wrapper">
            <div class="date-picker-wrapper">
              <DatePicker :is-dark="$store.state.settings.theme === 'dark'" is-required color="green" mode="date"
                v-model="selectedDate"></DatePicker>
              <div class="hours">
                <CustomLoader v-if="loading" />
                <div class="slots-wrapper" v-if="validatedSlots.length && !loading">
                  <div class="single-hour" v-for="availableSlot in validatedSlots" :key="availableSlot.id"
                    @click="toggleSlot(availableSlot)"
                    :class="{ 'selected': selectedSlotsId.includes(availableSlot.id) }">
                    {{
                      new Date(`${availableSlot.start_time}`).toLocaleTimeString(locale, {
                        hour: "2-digit", minute:
                          "2-digit",
                      })
                    }}
                  </div>
                </div>
                <div class="no-slots" v-if="!validatedSlots.length && !loading">
                  Brak wolnych miejsc
                </div>
              </div>
            </div>
            <div class="buttons-wrapper">
              <CustomButton type="info" @click="openReservingReassuranceModal">Zarezerwuj</CustomButton>
              <CustomButton type="secondary" @click="closeReserveSlotsModal">Zamknij</CustomButton>
            </div>
          </div>
          <CustomModal v-model:open="openReservingSlotsReassuranceModal">
            <template #title>Oto sloty które zostaną zarezerwowane</template>
            <div class="reserving-reassurance-modal-wrapper">
              <MessageBox type="warning">
                <template #title>
                  Sprawdź poprawność zaznaczonych slotów
                </template>
                <template #subtitle>
                  Jeśli przez przypadek zaznaczono sloty które nie powinny zostać zarezerwowane kliknij przycisk ZMIEŃ
                </template>
              </MessageBox>
              <div class="list-selected-slots">
                <div class="single-slot-to-reserve" v-for="selectedSlot in selectedSlots" :key="selectedSlot.id">
                  <p>Od: {{
                    new Date(`${selectedSlot.start_time}`).toLocaleTimeString(locale, {
                      hour: "2-digit", minute:
                        "2-digit",
                    })
                  }} Do: {{
  new Date(`${selectedSlot.end_time}`).toLocaleTimeString(locale, {
    hour: "2-digit", minute:
      "2-digit",
  })
}} Dnia: {{ selectedSlot.date }}</p>
                </div>
              </div>
              <div class="buttons-wrapper">
                <CustomButton type="info" @click="reserveSlots">Zarezerwuj</CustomButton>
                <CustomButton type="secondary" @click="openReservingSlotsReassuranceModal = false">Zmień
                </CustomButton>
              </div>
            </div>
          </CustomModal>
        </CustomModal>
      </div>
      <n-divider vertical></n-divider>
      <div class="changing-work-hours-wrapper"></div>
    </div>
  </section>
</template>

<script>
import { NButton, NDivider } from 'naive-ui';
import { ref, computed, onMounted, watch } from 'vue';
import CustomModal from '../../components/CustomModal.vue';
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import { useStore } from "vuex";
import { handleRequestError } from '@/utils';
import axios from 'axios';
import { useMessage } from 'naive-ui';
import CustomLoader from "@/components/CustomLoader.vue";
import CustomButton from "@/components/CustomButton.vue";
import { useRouter } from 'vue-router';
import MessageBox from '../../components/MessageBox.vue';

export default {
  name: "WorkHoursManagement",
  components: {
    NButton,
    NDivider,
    CustomModal,
    DatePicker,
    CustomLoader,
    CustomButton,
    MessageBox,
  },
  setup() {
    const store = useStore();
    const openReservingSlotsModal = ref(false);
    const selectedDate = ref(new Date);
    const selectedDateFormatted = computed(() => selectedDate.value.toISOString().split("T")[0]);
    const loading = ref(true);
    const availableSlots = ref([]);
    const selectedSlotsId = ref([]);
    const message = useMessage();
    const locale = store.state.settings.language;
    const openReservingSlotsReassuranceModal = ref(false);
    const router = useRouter();
    const selectedSlots = ref([]);

    const validatedSlots = computed(() => {
      const slots = [];
      for (let i = 0; i < availableSlots.value.length; i++) {
        let slot = availableSlots.value[i];
        if (slot.occupied) continue;
        if (slot.reserved) continue;
        if (slot.holiday) continue;
        if (slot.sunday) continue;
        if (slot.break_time) continue;
        slots.push(slot);
      }
      return slots;
    });

    const loadAvailableTimeSlots = async (date) => {
      try {
        const response = await axios.get(`appointments/slots?date=${date}`);
        availableSlots.value = response.data;
        loading.value = false;
      } catch (error) {
        handleRequestError(error);
      }
    };

    const toggleSlot = (availableSlot) => {
      let existingIndex = selectedSlotsId.value.indexOf(availableSlot.id);
      let existingSlotIndex = selectedSlots.value.indexOf(availableSlot);
      if (existingIndex >= 0) {
        selectedSlotsId.value.splice(existingIndex, 1);
        selectedSlots.value.splice(existingSlotIndex, 1);
      } else {
        selectedSlotsId.value.push(availableSlot.id);
        selectedSlots.value.push(availableSlot);
      }
    };

    const openReservingReassuranceModal = () => {
      if (selectedSlots.value.length < 1) {
        message.error("Aby zarezerwować sloty najpierw należy je zaznaczyć");
      } else {
        openReservingSlotsReassuranceModal.value = true;
      }
    }

    const closeReserveSlotsModal = () => {
      selectedSlotsId.value = [];
      selectedSlots.value = [];
      selectedDate.value = new Date;
      openReservingSlotsModal.value = false;
    }

    const reserveSlots = () => {
      try {
        axios.post('appointments/reserve_slots', {
          slots: selectedSlotsId.value,
        });
        message.success('Pomyślnie zarezerwowano sloty');
        selectedSlotsId.value = [];
        selectedSlots.value = [];
        selectedDate.value = new Date;
        openReservingSlotsReassuranceModal.value = false;
        openReservingSlotsModal.value = false;
        router.push({ name: 'workHoursManagement' });
      }
      catch (error) {
        message.error(`Nie udał się zarezerwować slotów, ${error.message}`);
        handleRequestError(error);
      }
    }

    watch(selectedDateFormatted, async (newDate) => {
      loading.value = true;
      await loadAvailableTimeSlots(newDate);
    });

    onMounted(async () => {
      loading.value = true;
      try {
        // const response = await axios.get('appointments/any/')
      } catch (error) {
        handleRequestError(error);
      }
      await loadAvailableTimeSlots(selectedDateFormatted.value);
    });

    return {
      openReservingSlotsModal,
      store,
      selectedDate,
      selectedDateFormatted,
      loadAvailableTimeSlots,
      loading,
      availableSlots,
      selectedSlotsId,
      message,
      locale,
      validatedSlots,
      toggleSlot,
      closeReserveSlotsModal,
      reserveSlots,
      openReservingSlotsReassuranceModal,
      openReservingReassuranceModal,
      selectedSlots,
    }
  }
};
</script>

<style lang="scss" scoped>
.work-hours-page {
  display: flex;
  width: 75vw;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .reserving-slots-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.reserving-slots-modal-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
        gap: .5rem;

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

.reserving-reassurance-modal-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .list-selected-slots {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    .single-slot-to-reserve {
      border: 1px solid $secondary-color;

      p {
        padding: 2px 10px;
      }
    }
  }
}

.buttons-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}
</style>
