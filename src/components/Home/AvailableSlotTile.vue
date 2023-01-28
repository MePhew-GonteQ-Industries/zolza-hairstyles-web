<template>
  <div class="available-slot" ref="availableSlot">
    <div class="date">
      <p class="day">{{ day }}</p>
      <p class="time">{{ time }}</p>
    </div>

    <div class="buttons">
      <div class="button make-appointment" @click="bookAppointment" @keyup.enter="bookAppointment">
        <i class="ph-calendar-plus-light"></i>
        {{ t("home.availableSlotTile.book") }}
      </div>

      <div class="button more-info">
        <i class="ph-info-light"></i>
        {{ t("home.availableSlotTile.info") }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useI18n } from "vue-i18n";
import { useMessage } from 'naive-ui';
import { handleRequestError } from "@/utils";

export default {
  name: "AvailableSlotTile",
  props: {
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    firstSlotId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
  },

  setup() {
    const { t } = useI18n({ useScope: "global" });
    const message = useMessage();


    const bookAppointment = async () => {
      try {
        await axios.post(`appointments`, {
          // first_slot_id: selectedSlotId.value,
          // service_id: selectedService.value.id,
        });
        message.success(t('snackBars.appointmentMade'));
      } catch (error) {
        const errorResponse = handleRequestError(error);
        message.error(`${t('snackBars.appointmentsMadeError')} ${errorResponse.status}, ${errorResponse.data.detail}`);
      }
    };

    return { t, bookAppointment };
  },
};
</script>

<style lang="scss" scoped>
.available-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .date {
    background-color: $primary-color;
    color: $secondary-text-color;
    border-radius: 1rem;
    padding: 10px;
    font-size: 1.125rem;
    letter-spacing: 0.5px;
    font-weight: 500;
    height: 100px;
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    color: $accent-color;

    .button {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      cursor: pointer;

      i {
        font-size: 28px;
      }
    }
  }
}
</style>
