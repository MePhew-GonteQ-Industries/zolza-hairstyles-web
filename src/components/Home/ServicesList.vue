<template>
<div class="services" ref="services">

  <template v-for="service in servicesData" :key="service.id">
    <ServiceTile :name="service.name"
      description="Nasze usługi wyróżnia indywidualne podejście do klienta.
        Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
      :time="service.average_time_minutes"
      :availability="40"
      :priceMin="service.min_price"
      :priceMax="service.max_price"/>
  </template>
</div>
</template>

<script>
import ServiceTile from '@/components/ServiceTile.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'ServicesList',
  components: {
    ServiceTile,
  },
  props: {
    scrolledToServices: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const servicesData = ref(null);

    onMounted(async () => {
      const response = await axios.get('services');
      servicesData.value = response.data;
    });

    const services = ref(null);

    const scrollToServices = () => {
      services.value.scrollIntoView({ behavior: 'smooth' });
    };

    watch(() => props.scrolledToServices, () => {
      scrollToServices();
    });

    return {
      servicesData,
      services,
    };
  },
};
</script>

<style lang="scss" scoped>
.services {
  grid-template-columns: repeat(2, 1fr);
  padding: 2.5rem 10%;
  min-height: 20vh;
  color: black;
  width: 100%;
  display: grid;
  row-gap: 2rem;
}
</style>>
