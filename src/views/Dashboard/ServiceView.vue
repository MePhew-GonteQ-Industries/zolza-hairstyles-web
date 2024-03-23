<template>
  <div class="dashboard-page service-view">
    <div
      class="service elevated-card"
      v-if="serviceData"
    >
      <div>
        <h1>{{ serviceData.name }}</h1>
        <p>
          {{ t("dashboard.servicesManagement.serviceView.avgTime") }}:
          {{ serviceData.average_time_minutes }} min
        </p>
        <p>
          {{ t("dashboard.servicesManagement.serviceView.minPrice") }}: {{ serviceData.min_price }}
        </p>
        <p>
          {{ t("dashboard.servicesManagement.serviceView.maxPrice") }}: {{ serviceData.max_price }}
        </p>
        <p>
          {{ t("dashboard.servicesManagement.serviceView.createdAt") }}:
          {{ serviceData.created_at }}
        </p>
      </div>
      <div class="buttons">
        <CustomButton
          type="info"
          @click="editServiceModalOpen = true"
          >{{ t("dashboard.servicesManagement.serviceView.edit") }}</CustomButton
        >
        <CustomModal v-model:open="editServiceModalOpen">
          <template #title>
            {{ t("dashboard.servicesManagement.serviceView.modifyService") }}
          </template>
          <div class="edit-service-modal">
            <MessageBox type="info">
              <template #title>{{
                t("dashboard.servicesManagement.serviceView.changeServiceData")
              }}</template>
              <template #subtitle
                >{{
                  t("dashboard.servicesManagement.serviceView.changeServiceDataInfo")
                }}.</template
              >
            </MessageBox>
            <div class="input-wrapper">
              <CustomInput
                :label="t('dashboard.servicesManagement.serviceView.serviceName')"
                autocomplete="off"
              >
              </CustomInput>
              <CustomInput
                :label="t('dashboard.servicesManagement.serviceView.avgTimeLabel')"
                type="number"
                autocomplete="off"
              >
              </CustomInput>
              <CustomInput
                :label="t('dashboard.servicesManagement.serviceView.minPriceLabel')"
                type="number"
                autocomplete="off"
              >
              </CustomInput>
              <CustomInput
                :label="t('dashboard.servicesManagement.serviceView.maxPriceLabel')"
                type="number"
                autocomplete="off"
              >
              </CustomInput>
            </div>
            <div class="buttons-wrapper">
              <CustomButton
                type="info"
                @click="editServiceModalOpen = false"
                >{{ t("dashboard.servicesManagement.serviceView.save") }}</CustomButton
              >
              <CustomButton
                type="secondary"
                @click="editServiceModalOpen = false"
                >{{ t("dashboard.servicesManagement.serviceView.cancel") }}
              </CustomButton>
            </div>
          </div>
        </CustomModal>
        <CustomButton
          type="error"
          @click="deleteServiceModalOpen = true"
          >{{ t("dashboard.servicesManagement.serviceView.delete") }}</CustomButton
        >
        <CustomModal v-model:open="deleteServiceModalOpen">
          <template #title>
            {{ t("dashboard.servicesManagement.serviceView.deleteReassurance") }}?
          </template>
          <div class="delete-service-wrapper">
            <MessageBox type="warning">
              <template #title>
                {{ t("dashboard.servicesManagement.serviceView.deleteWarning") }}
              </template>
              <template #subtitle>
                {{ t("dashboard.servicesManagement.serviceView.deleteInfo") }}
              </template>
            </MessageBox>
            <div class="buttons-wrapper">
              <CustomButton
                type="error"
                @click="deleteServiceModalOpen = false"
              >
                {{ t("dashboard.servicesManagement.serviceView.delete") }}
              </CustomButton>
              <CustomButton
                type="secondary"
                @click="deleteServiceModalOpen = false"
              >
                {{ t("dashboard.servicesManagement.serviceView.cancel") }}
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
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { createRequestErrorMessage } from "@/utils";
import CustomButton from "@/components/CustomButton.vue";
import CustomModal from "@/components/CustomModal.vue";
import CustomInput from "@/components/CustomInput.vue";
import MessageBox from "@/components/MessageBox.vue";
import { useMessage } from "naive-ui";

export default {
  name: "ServiceView",
  components: {
    CustomButton,
    CustomModal,
    CustomInput,
    MessageBox,
  },
  setup() {
    const message = useMessage();
    const store = useStore();
    const route = useRoute();
    const { t } = useI18n({ useScope: "global" });

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
          message.error(`Nie udało się pobrać danych usługi - ${createRequestErrorMessage(error)}`);
        }
      }
    });

    return {
      serviceData,
      editServiceModalOpen,
      deleteServiceModalOpen,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.elevated-card {
  @media only screen and (max-width: $sm) {
    padding: 1rem;
  }
}

.dashboard-page {
  @media only screen and (max-width: $sm) {
    padding: 5rem 1rem;
  }
}

.service {
  display: grid;
  grid-template-columns: 3fr 1fr;

  @media only screen and (max-width: $sm) {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
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
