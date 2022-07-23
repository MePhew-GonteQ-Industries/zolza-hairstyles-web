<template>
  <section class="dashboard-page dashboard-data-page services-management">
    <form class="appointments-filters">
      <CustomInput
        class="search"
        label="Szukaj usług"
        v-model:value="q"
        type="search"
      />
    </form>

    <div class="dashboard-data-table-wrapper">
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
              >#id</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >Nazwa</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              Średni czas trwania</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >Cena minimalna</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="endDate"
              @toggleSort="toggleSort('endDate')"
              >Cena maksymalna</SortedHeader
            >
          </th>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td class="id">
              <router-link :to="`appointment/${service.id}`">
                #{{ service.shortId }}...</router-link
              >
            </td>
            <td class="name">
              <router-link :to="`service/${service.id}`"
                >Strzyżenie męskie</router-link
              >
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
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CustomInput from '@/components/CustomInput.vue';

export default {
  name: 'ServicesManagement',
  components: {
    CustomInput,
  },
  setup() {
    const servicesData = ref(null);

    const services = computed(() => {
      if (!servicesData.value) return [];

      const servicesTemp = [];

      servicesData.value.forEach((service) => {
        const serviceTemp = service;

        serviceTemp.shortId = service.id.substr(0, 4);

        servicesTemp.push(serviceTemp);
      });

      return servicesTemp;
    });

    onMounted(async () => {
      try {
        const response = await axios.get('services/details');
        servicesData.value = response.data;
      } catch (err) {
        // loadingFailed.value = true;
        console.error(err);
      }
      // loading.value = false;
      setTimeout(() => {
        // loaderAnimationFinished.value = true;
      }, 1000);
    });

    return {
      servicesData,
      services,
    };
  },
};
</script>

<style lang="scss" scoped>
td {
  text-align: center;

  .data-icon-wrapper {
    justify-content: center;
  }
}
</style>
