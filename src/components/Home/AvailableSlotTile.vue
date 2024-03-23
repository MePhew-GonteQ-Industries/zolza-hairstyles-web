<template>
  <div
    class="available-slot"
    ref="availableSlot"
  >
    <div class="date">
      <p class="day">{{ day }}</p>
      <p class="time">{{ time }}</p>
    </div>

    <div class="buttons">
      <div
        class="button make-appointment"
        @click="makeAppointment"
      >
        <i class="ph-calendar-plus-light"></i>
        {{ t("home.availableSlotTile.book") }}
      </div>

      <!-- TODO: Add appointment summary in a modal -->
      <!-- <div class="button more-info">
        <i class="ph-info-light"></i>
        {{ t("home.availableSlotTile.info") }}
      </div> -->
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useMessage } from "naive-ui";
import { createRequestErrorMessage } from "@/utils";

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
    id: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { t } = useI18n({ useScope: "global" });
    const message = useMessage();
    const router = useRouter();
    const store = useStore();

    const makeAppointment = async () => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "login" });
        return;
      }

      try {
        await axios.post(`appointments`, {
          first_slot_id: props.id,
          service_id: props.serviceId,
        });

        message.success(t("snackBars.appointmentMade"));
        router.push({ name: "appointmentsList" });
      } catch (error) {
        message.error(
          `${t("snackBars.appointmentsMadeError")} - ${createRequestErrorMessage(error)}`,
        );
      }
    };

    return { t, makeAppointment };
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
