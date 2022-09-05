<template>
<div class="services-wrapper" ref="services">
  <CustomLoader :class="{ hidden: !loading }" v-if="!loaderAnimationFinished"/>

  <div class="services" :class="{ hidden: loading }"
  v-if="loaderAnimationFinished && !loadingFailed">
    <template v-for="service in servicesData" :key="service.id">
      <ServiceTile
        :id="service.id"
        :name="service.name"
        description="Nasze usługi wyróżnia indywidualne podejście do klienta.
          Każdą osobę poddajemy dokładnej diagnozie, aby móc podkreślić jej naturalną urodę."
        :time="service.average_time_minutes"
        :availability="40"
        :priceMin="service.min_price"
        :priceMax="service.max_price"
        @updateSelectedService="(newValue) => { $emit('update:selectedServiceId', newValue) }"/>
    </template>
  </div>

  <div class="error-message" :class="{ hidden: loading }"
   v-if="loadingFailed && loaderAnimationFinished">
    <i class="ph-warning-circle-light"></i>
    <p>{{ t("home.servicesList.error") }}</p>
  </div>

</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import ServiceTile from '@/components/Home/ServiceTile.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import CustomLoader from '@/components/CustomLoader.vue';
import { handleRequestError } from '@/utils';

export default {
  name: 'ServicesList',
  components: {
    ServiceTile,
    CustomLoader,
  },
  props: {
    scrolledToServices: {
      type: Boolean,
      required: true,
    },
    selectedServiceId: {
      type: String,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' });
    const loading = ref(true);
    const loadingFailed = ref(false);
    const loaderAnimationFinished = ref(false);

    const servicesData = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get('services');
        servicesData.value = response.data;
      } catch (error) {
        loadingFailed.value = true;
        handleRequestError(error);
      }
      loading.value = false;
      setTimeout(() => {
        loaderAnimationFinished.value = true;
      }, 1000);
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
      loadingFailed,
      loading,
      loaderAnimationFinished,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.services-wrapper {
  min-height: 20vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .hidden {
      display: none;
      opacity: 0;
    }

  .services {
    grid-template-columns: repeat(2, 1fr);
    padding: 2.5rem 10%;
    color: black;
    display: grid;
    row-gap: 2rem;
    transition: all 1s;
  }

  .error-message {
    min-height: inherit;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.250rem;
    gap: 1rem;

    i {
      font-size: 2.250rem;
    }
  }
}

@media only screen and (max-width: $xs){
  .services-wrapper{
    .services{
      display: flex;
      flex-direction: column;
    }
  }
}
</style>>
