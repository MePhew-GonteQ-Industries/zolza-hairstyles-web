<template>
  <div
    class="available-slots-wrapper"
    v-if="selectedServiceId"
  >
    <CustomLoader
      class="loader"
      v-if="loading"
    />

    <div
      class="available-dates"
      v-if="!loading"
    >
      <MessageBox
        type="info"
        class="appointment-cancellation-info"
      >
        <template #title> Uwaga! </template>
        <template #subtitle>
          {{ $t("userAppointmentsView.makeAnAppointment.adminCancel") }}
        </template>
      </MessageBox>

      <template
        v-for="slot in availableSlots"
        :key="slot.id"
      >
        <AvailableSlotTile
          :id="slot.id"
          :day="slot.day"
          :time="slot.time"
          :serviceId="selectedServiceId"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AvailableSlotTile from "@/components/Home/AvailableSlotTile.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import MessageBox from "@/components/MessageBox.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { createRequestErrorMessage } from "@/utils";
import { useMessage } from "naive-ui";

export default {
  name: "availableSlotsList",
  components: {
    AvailableSlotTile,
    CustomLoader,
    MessageBox,
  },
  props: {
    selectedServiceId: {
      type: String,
    },
  },
  setup(props) {
    const message = useMessage();
    const store = useStore();

    const locale = store.state.settings.language;

    const availableSlotsData = ref(null);

    const availableSlots = computed(() => {
      if (!availableSlotsData.value) {
        return [];
      }

      const slots = [];

      const now = new Date();

      availableSlotsData.value.forEach((slot) => {
        const date = new Date(`${slot.start_time}`);

        const day =
          date === now
            ? "Dzisiaj"
            : date.toLocaleDateString(locale, {
                weekday: "long",
              });

        slots.push({
          id: slot.id,
          day: `${day[0].toUpperCase()}${day.slice(1)}`,
          time: date.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      });

      return slots;
    });

    const loading = ref(true);

    const loadAppointments = async (selectedServiceId) => {
      loading.value = true;
      try {
        const response = await axios.get(`appointments/nearest/${selectedServiceId}`);
        availableSlotsData.value = response.data;
      } catch (error) {
        message.error(`Nie udało się załadować wizyt - ${createRequestErrorMessage(error)}`);
      }
      loading.value = false;
    };

    watch(
      () => props.selectedServiceId,
      (newValue) => {
        loading.value = true;
        loadAppointments(newValue);
      },
    );

    return {
      availableSlots,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.available-slots-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;

  .available-dates {
    width: 100%;
    background-color: $secondary-color;
    color: black;
    display: grid;
    row-gap: 2rem;
    grid-template-rows: 1fr auto;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    padding: 3.5rem 10% 3.5rem 10%;

    @media only screen and (max-width: $xs) {
      display: flex;
      flex-direction: column;
    }

    .appointment-cancellation-info {
      grid-column: 1 / span 3;
    }
  }
}
</style>
>
