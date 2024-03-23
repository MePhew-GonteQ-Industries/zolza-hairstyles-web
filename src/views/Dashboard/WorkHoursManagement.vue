<template>
  <section class="dashboard-page">
    <div class="work-hours-page">
      <div class="reserving-slots-wrapper">
        <CustomButton @click="openReservingSlotsModal = true">Zarezerwuj sloty</CustomButton>
        <CustomModal v-model:open="openReservingSlotsModal">
          <template #title>Zarezerwuj godziny</template>
          <div class="reserving-slots-modal-wrapper">
            <div class="date-picker-wrapper">
              <DatePicker
                :is-dark="$store.state.settings.theme === 'dark'"
                is-required
                color="green"
                mode="date"
                v-model="selectedDate"
              ></DatePicker>
              <div class="hours">
                <CustomLoader v-if="loadingSlots" />
                <div class="slots-wrapper" v-if="validatedSlots.length && !loadingSlots">
                  <div
                    class="single-hour"
                    v-for="availableSlot in validatedSlots"
                    :key="availableSlot.id"
                    @click="toggleSlot(availableSlot)"
                    :class="{ selected: selectedSlotsId.includes(availableSlot.id) }"
                  >
                    {{
                      new Date(`${availableSlot.start_time}`).toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </div>
                </div>
                <div class="no-slots" v-if="!validatedSlots.length && !loadingSlots">
                  Brak wolnych miejsc
                </div>
              </div>
            </div>
            <div class="buttons-wrapper">
              <CustomButton type="info" @click="openReservingReassuranceModal"
                >Zarezerwuj</CustomButton
              >
              <CustomButton type="secondary" @click="closeReserveSlotsModal">Zamknij</CustomButton>
            </div>
          </div>
          <CustomModal v-model:open="openReservingSlotsReassuranceModal">
            <template #title>Oto sloty które zostaną zarezerwowane</template>
            <div class="reserving-reassurance-modal-wrapper">
              <MessageBox type="warning">
                <template #title> Sprawdź poprawność zaznaczonych slotów </template>
                <template #subtitle>
                  Jeśli przez przypadek zaznaczono sloty które nie powinny zostać zarezerwowane
                  kliknij przycisk ZMIEŃ
                </template>
              </MessageBox>
              <div class="list-selected-slots">
                <div
                  class="single-slot-to-reserve"
                  v-for="selectedSlot in selectedSlots"
                  :key="selectedSlot.id"
                >
                  <p>
                    Od:
                    {{
                      new Date(`${selectedSlot.start_time}`).toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                    Do:
                    {{
                      new Date(`${selectedSlot.end_time}`).toLocaleTimeString(locale, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                    Dnia: {{ selectedSlot.date }}
                  </p>
                </div>
              </div>
              <div class="buttons-wrapper">
                <CustomButton type="info" @click="reserveSlots">Zarezerwuj</CustomButton>
                <CustomButton type="secondary" @click="openReservingSlotsReassuranceModal = false"
                  >Zmień
                </CustomButton>
              </div>
            </div>
          </CustomModal>
        </CustomModal>
        <div class="reserved-slots-list">
          <table>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <th>
                <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="id">
                  #id
                </SortedHeader>
              </th>
              <th>
                <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="startDate">
                  Od
                </SortedHeader>
              </th>
              <th>
                <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="endDate">
                  Do
                </SortedHeader>
              </th>
              <th>
                <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="date">
                  Dnia
                </SortedHeader>
              </th>
            </thead>
            <tbody>
              <template v-for="slot in reservedSlotsFiltered" :key="slot.id">
                <UnreserveSlotItem :appointmentSlot="slot" @slotUnreserved="loadReservedSlots" />
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <n-divider vertical></n-divider>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import CustomModal from "@/components/CustomModal.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import { useStore } from "vuex";
import { createRequestErrorMessage } from "@/utils";
import axios from "axios";
import { useMessage } from "naive-ui";
import CustomLoader from "@/components/CustomLoader.vue";
import CustomButton from "@/components/CustomButton.vue";
import { useRouter } from "vue-router";
import MessageBox from "@/components/MessageBox.vue";
import SortedHeader from "@/components/SortedHeader.vue";
import UnreserveSlotItem from "@/components/UnreserveSlotItem.vue";

export default {
  name: "WorkHoursManagement",
  components: {
    CustomModal,
    DatePicker,
    CustomLoader,
    CustomButton,
    MessageBox,
    SortedHeader,
    UnreserveSlotItem,
  },
  setup() {
    const store = useStore();
    const openReservingSlotsModal = ref(false);
    const selectedDate = ref(new Date());
    const selectedDateFormatted = computed(() => selectedDate.value.toISOString().split("T")[0]);
    const loading = ref(true);
    const loadingSlots = ref(true);
    const availableSlots = ref([]);
    const selectedSlotsId = ref([]);
    const message = useMessage();
    const locale = store.state.settings.language;
    const openReservingSlotsReassuranceModal = ref(false);
    const router = useRouter();
    const selectedSlots = ref([]);
    const reservedSlots = ref([]);

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
        loadingSlots.value = false;
      } catch (error) {
        message.error(`Nie udało się załadować slotów - ${createRequestErrorMessage(error)}`);
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
    };

    const closeReserveSlotsModal = () => {
      selectedSlotsId.value = [];
      selectedSlots.value = [];
      selectedDate.value = new Date();
      loadingSlots.value = true;
      openReservingSlotsModal.value = false;
    };

    const reserveSlots = () => {
      try {
        axios.post("appointments/reserve_slots", {
          slots: selectedSlotsId.value,
        });
        selectedSlotsId.value = [];
        selectedSlots.value = [];
        selectedDate.value = new Date();
        openReservingSlotsReassuranceModal.value = false;
        openReservingSlotsModal.value = false;
        loadReservedSlots();
        message.success("Pomyślnie zarezerwowano sloty");
        router.push({ name: "workHoursManagement" });
      } catch (error) {
        message.error(`Nie udało się zarezerwować slotów - ${createRequestErrorMessage(error)}`);
      }
    };

    watch(selectedDateFormatted, async (newDate) => {
      loading.value = true;
      await loadAvailableTimeSlots(newDate);
    });

    const loadReservedSlots = async () => {
      loading.value = true;
      try {
        const response = await axios.get("appointments/slots");
        reservedSlots.value = response.data;
        loading.value = false;
      } catch (error) {
        message.error(
          `Nie udało się pobrać zarezerwowanych slotów - ${createRequestErrorMessage(error)}`
        );
      }
    };

    const reservedSlotsFiltered = computed(() => {
      const slots = [];

      for (let i = 0; i < reservedSlots.value.length; i++) {
        let slot = reservedSlots.value[i];

        if (slot.reserved) {
          slots.push(slot);
        } else {
          continue;
        }
      }

      return slots;
    });

    const sortBy = ref("date");
    const sortAscending = ref(false);

    onMounted(async () => {
      loading.value = true;
      loadingSlots.value = true;
      await loadReservedSlots();
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
      loadReservedSlots,
      reservedSlots,
      loadingSlots,
      reservedSlotsFiltered,
      sortBy,
      sortAscending
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

    .reserved-slots-list {
      table {
        border-spacing: 0;
        box-shadow: 0 0 8px -2px $box-shadow-color;

        @media only screen and (max-width: $sm) {
          display: block;
        }

        thead {
          position: sticky;
          top: 0;

          @media only screen and (max-width: $sm) {
            display: block;
            margin-bottom: 15px;
          }
        }

        th {
          padding: 0 1rem;
          text-transform: uppercase;
          background-color: $background-accent-high;
          height: 3.375rem;
          font-size: 0.75rem;
          color: $secondary-text-color;
          border-width: thin 0 thin 0;
          border-style: solid;
          border-color: $secondary-color;
          letter-spacing: 1px;
          text-align: left;

          @media only screen and (max-width: $sm) {
            display: flex;
            align-items: center;
          }
        }

        tr {
          @media only screen and (max-width: $sm) {
            display: block;
            border: thin solid $primary-text-color;
          }
        }

        tbody {
          @media only screen and (max-width: $sm) {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        }

        th:first-child {
          border-radius: 0.5rem 0 0 0;
        }

        th:last-child {
          border-radius: 0 0.5rem 0 0;
        }

        tr:last-child td:first-child {
          border-radius: 0 0 0 0.5rem;
        }

        tr:last-child td:last-child {
          border-radius: 0 0 0.5rem 0;
        }

        tr:hover > td {
          background-color: $background-accent-medium;
        }

        td {
          padding: 1rem;
          font-size: 0.875rem;
          height: 3.125rem;
          background-color: $background-accent-low;
          transition: none;
          border-bottom: thin solid $secondary-color;

          @media only screen and (max-width: $sm) {
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: flex-start;
          }

          font-weight: 500;
          color: $secondary-text-color;

          &:first-child:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
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

.reserving-reassurance-modal-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .list-selected-slots {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

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
