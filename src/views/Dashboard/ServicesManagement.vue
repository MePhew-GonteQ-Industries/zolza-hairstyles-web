<template>
  <section class="dashboard-page dashboard-data-page services-management">
    <form class="appointments-filters">
      <!-- TODO: Filtering services -->

      <!-- <CustomInput
        class="search"
        :label="t('dashboard.servicesManagement.search')"
        v-model:value="q"
        type="search"
      /> -->
    </form>

    <!-- TODO: Adding new services
    <CustomButton @click="addServiceModalOpen = true">Dodaj usługę</CustomButton>
    <CustomModal v-model:open="addServiceModalOpen">
      <template #title>Dodaj nową usługę</template>
      <div class="add-service-wrapper">
        <div class="input-wrapper">
          <CustomInput
            label="Nazwa usługi"
            autocomplete="off"
          ></CustomInput>
          <CustomInput
            label="Średni czas trwania [min]"
            type="number"
            autocomplete="off"
          >
          </CustomInput>
          <CustomInput
            label="Cena minimalna [zł]"
            type="number"
            autocomplete="off"
          ></CustomInput>
          <CustomInput
            label="Cena maksymalna [zł]"
            type="number"
            autocomplete="off"
          ></CustomInput>
        </div>
        <div class="buttons-wrapper">
          <CustomButton
            type="info"
            @click="addServiceModalOpen = false"
            >Zapisz</CustomButton
          >
          <CustomButton
            type="secondary"
            @click="addServiceModalOpen = false"
            >Anuluj</CustomButton
          >
        </div>
      </div>
    </CustomModal> -->

    <div
      class="dashboard-data-table-wrapper"
      v-if="!loading"
    >
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="id"
              @toggleSort="toggleSort('id')"
            >
              #id</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >{{ t("dashboard.servicesManagement.name") }}
            </SortedHeader>
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              {{ t("dashboard.servicesManagement.averageDurationTime") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >{{ t("dashboard.servicesManagement.minPrice") }}
            </SortedHeader>
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="endDate"
              @toggleSort="toggleSort('endDate')"
              >{{ t("dashboard.servicesManagement.maxPrice") }}
            </SortedHeader>
          </th>
        </thead>
        <tbody>
          <tr
            v-for="service in services"
            :key="service.id"
          >
            <td class="id">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`services/${service.id}`">
                    #{{ service.shortId }}...</router-link
                  >
                </template>
                {{ service.id }}
              </CustomTooltip>
            </td>
            <td class="name">
              <router-link :to="`services/${service.id}`">{{ service.name }}</router-link>
            </td>
            <td class="average-time">
              <div class="data-icon-wrapper">
                <i class="ph-clock-light"></i>
                <span>{{ service.average_time_minutes }} min</span>
              </div>
            </td>
            <td>
              <div class="data-icon-wrapper">
                <i class="ph-coin-light"></i>
                <span>{{ service.min_price }} zł</span>
              </div>
            </td>
            <td>
              <div class="data-icon-wrapper">
                <i class="ph-coins-light"></i>
                <span>{{ service.max_price }} zł</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else
      class="loader-wrapper"
    >
      <CustomLoader />
    </div>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
// import CustomInput from "@/components/CustomInput.vue";
// import CustomButton from "@/components/CustomButton.vue";
// import CustomModal from "@/components/CustomModal.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import SortedHeader from "@/components/SortedHeader.vue";
import CustomTooltip from "@/components/CustomTooltip.vue";
import { useMessage } from "naive-ui";
import { createRequestErrorMessage } from "@/utils";
import { AxiosError } from "axios";

export default {
  name: "ServicesManagement",
  components: {
    // CustomInput,
    // CustomButton,
    // CustomModal,
    CustomLoader,
    SortedHeader,
    CustomTooltip,
  },
  setup() {
    const message = useMessage();
    const store = useStore();

    const addServiceModalOpen = ref(false);
    const loading = ref(true);

    const { t } = useI18n({ useScope: "global" });

    const addService = async () => {};

    const services = computed(() => {
      if (!store.state.services.services) return [];

      const servicesTemp = [];

      store.state.services.services.forEach((service) => {
        const serviceTemp = service;

        serviceTemp.shortId = service.id.substr(0, 4);

        servicesTemp.push(serviceTemp);
      });

      return servicesTemp;
    });

    const sortBy = ref("service");
    const sortAscending = ref(false);

    onMounted(async () => {
      try {
        await store.dispatch("loadServices");
      } catch (error) {
        loading.value = false;
        if (error instanceof AxiosError) {
          message.error(`Nie udało się załadować wizyt - ${createRequestErrorMessage(error)}`);
        } else {
          throw error;
        }
      }
      loading.value = false;
    });

    return {
      services,
      t,
      addService,
      addServiceModalOpen,
      loading,
      sortBy,
      sortAscending,
    };
  },
};
</script>

<style lang="scss" scoped>
td {
  .data-icon-wrapper {
    justify-content: center;
  }
}

.add-service-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.buttons-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
