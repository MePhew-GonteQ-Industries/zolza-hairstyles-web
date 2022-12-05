<template>
  <div class="dashboard-page service-view">
    <div class="service elevated-card" v-if="serviceData">
      <div>
        <h1>{{ serviceData.name }}</h1>
        <p>Średni czas trwania: {{ serviceData.average_time_minutes }} min</p>
        <p>Cena minimalna: {{ serviceData.min_price }}</p>
        <p>Cena maksymalna: {{ serviceData.max_price }}</p>
        <p>Utworzone: {{ serviceData.created_at }}</p>
      </div>
      <div class="buttons">
        <CustomButton type="info" @click="editServiceModalOpen = true">Edytuj</CustomButton>
        <CustomModal v-model:open="editServiceModalOpen">
          <template #title>
            Modyfikacja usługi
          </template>
          <div class="edit-service-modal">
            <MessageBox type="info">
              <template #title>Zmiana danych usługi</template>
              <template #subtitle>Tutaj możesz zmienić wszystkie dane dotyczące danej
                usługi.</template>
            </MessageBox>
            <div class="input-wrapper">
              <CustomInput label="Nazwa usługi" autocomplete="off"></CustomInput>
              <CustomInput label="Średni czas trwania [min]" type="number" autocomplete="off">
              </CustomInput>
              <CustomInput label="Cena minimalna [zł]" type="number" autocomplete="off">
              </CustomInput>
              <CustomInput label="Cena maksymalna [zł]" type="number" autocomplete="off">
              </CustomInput>
            </div>
            <div class="buttons-wrapper">
              <CustomButton type="info" @click="editServiceModalOpen = false">Zapisz</CustomButton>
              <CustomButton type="secondary" @click="editServiceModalOpen = false">Anuluj
              </CustomButton>
            </div>
          </div>
        </CustomModal>
        <CustomButton type="error" @click="deleteServiceModalOpen = true">Usuń</CustomButton>
        <CustomModal v-model:open="deleteServiceModalOpen">
          <template #title>
            Czy napewno chcesz usunąć usługę?
          </template>
          <div class="delete-service-wrapper">
            <MessageBox type="warning">
              <template #title>
                Usługa zostanie usunięta
              </template>
              <template #subtitle>
                Wizyty z tą usługą nie zostaną usunięte.
              </template>
            </MessageBox>
            <div class="buttons-wrapper">
              <CustomButton type="error" @click="deleteServiceModalOpen = false">
                Usuń usługę
              </CustomButton>
              <CustomButton type="secondary" @click="deleteServiceModalOpen = false">
                Anuluj
              </CustomButton>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { handleRequestError } from "@/utils";
import CustomButton from "@/components/CustomButton.vue";
import CustomModal from "@/components/CustomModal.vue";
import CustomInput from "../../components/CustomInput.vue";
import MessageBox from "../../components/MessageBox.vue";

export default {
  name: "ServiceView",
  components: {
    CustomButton,
    CustomModal,
    CustomInput,
    MessageBox,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const serviceData = ref(null);
    const editServiceModalOpen = ref(false);
    const deleteServiceModalOpen = ref(false);

    onMounted(async () => {
      const storedService = store.getters.getServiceById(route.params.id);

      if (storedService) {
        serviceData.value = storedService;
      } else {
        try {
          const response = await axios.get(`services/details/${route.params.id}`);
          serviceData.value = response.data;
        } catch (error) {
          handleRequestError(error);
        }
      }
    });

    return {
      serviceData,
      editServiceModalOpen,
      deleteServiceModalOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.service {
  display: grid;
  grid-template-columns: 3fr 1fr;

  .buttons {
    display: flex;
    gap: .5rem;
  }
}

.edit-service-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}

.buttons-wrapper {
  display: flex;
  gap: 1rem;
}

.delete-service-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
