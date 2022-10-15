<template>
  <div class="dashboard-page service-view">
    <div class="service elevated-card" v-if="serviceData">
      <div>
        <h1>Strzyżenie męskie</h1>
        <p>Średni czas trwania: {{ serviceData.average_time_minutes }} min</p>
        <p>Cena minimalna: {{ serviceData.min_price }}</p>
        <p>Cena maksymalna: {{ serviceData.max_price }}</p>
        <p>Utworzone: {{ serviceData.created_at }}</p>
      </div>
      <div class="buttons">
        <CustomButton>Edytuj</CustomButton>
        <CustomButton type="error">Usuń</CustomButton>
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

export default {
  name: "ServiceView",
  components: {
    CustomButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const serviceData = ref(null);

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
    };
  },
};
</script>

<style lang="scss" scoped>
.service {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
</style>
