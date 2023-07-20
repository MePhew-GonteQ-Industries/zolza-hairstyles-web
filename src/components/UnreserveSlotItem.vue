<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import axios from "axios";
import { useMessage } from "naive-ui";
import CustomModal from "@/components/CustomModal.vue";
import CustomButton from "@/components/CustomButton.vue";
import { createRequestErrorMessage } from "@/utils";

const props = defineProps({
  appointmentSlot: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["slotUnreserved"]);

const message = useMessage();

const store = useStore();
const locale = store.state.settings.language;

const unreserveSlotModalOpen = ref(false);

const cancelReservation = async () => {
  try {
    await axios.post("appointments/unreserve_slots", {
      slots: [props.appointmentSlot.id],
    });
    unreserveSlotModalOpen.value = false;
    emit("slotUnreserved");
    message.success("Pomyślnie anulowano rezerwacje");
  } catch (error) {
    message.error(`Nie udało się anulować rezerwacji - ${createRequestErrorMessage(error)}`);
  }
};
</script>

<template>
  <tr>
    <td class="id" @click="unreserveSlotModalOpen = true">
      {{ appointmentSlot.id }}
      <CustomModal v-model:open="unreserveSlotModalOpen">
        <template #title> Cofnięcie rezerwacji slotu </template>
        <div class="unreserve-slot-modal-wrapper">
          <div class="slot-info">
            <p>Id: {{ appointmentSlot.id }}</p>
            <p>
              Od:
              {{
                new Date(appointmentSlot.start_time).toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
            <p>
              Do:
              {{
                new Date(appointmentSlot.end_time).toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
            <p>Dnia: {{ new Date(appointmentSlot.date).toLocaleDateString(locale) }}</p>
          </div>
          <div class="buttons-wrapper">
            <CustomButton type="info" @click="cancelReservation">Cofnij rezerwacje</CustomButton>
            <CustomButton type="secondary" @click="unreserveSlotModalOpen = false"
              >Zamknij</CustomButton
            >
          </div>
        </div>
      </CustomModal>
    </td>
    <td>
      {{
        new Date(appointmentSlot.start_time).toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}
    </td>
    <td>
      {{
        new Date(appointmentSlot.end_time).toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}
    </td>
    <td>{{ new Date(appointmentSlot.date).toLocaleDateString(locale) }}</td>
  </tr>
</template>

<style scoped lang="scss">
.unreserve-slot-modal-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .slot-info {
    padding: 1rem;
  }
}

.buttons-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}
</style>
