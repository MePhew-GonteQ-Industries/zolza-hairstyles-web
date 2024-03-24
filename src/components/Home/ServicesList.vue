<template>
  <div
    class="services-wrapper"
    ref="services"
  >
    <h2 class="services-header">Zapoznaj się z naszą ofertą</h2>
    <CustomLoader v-if="false" />

    <div
      class="services"
      v-else
    >
      <template
        v-for="service in servicesData"
        :key="service.id"
      >
        <ServiceTile
          :id="service.id"
          :name="service.name"
          :description="service.description"
          :time="service.average_time_minutes"
          :priceMin="service.min_price"
          :priceMax="service.max_price"
          @updateSelectedService="selectService"
          :selectedServiceId="$props.selectedServiceId"
        />
      </template>
    </div>

    <div
      class="error-message"
      :class="{ hidden: loading }"
      v-if="loadingFailed && loaderAnimationFinished"
    >
      <i class="ph-warning-circle-light"></i>
      <p>{{ t("home.servicesList.error") }}</p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import ServiceTile from "@/components/Home/ServiceTile.vue";
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import CustomLoader from "@/components/CustomLoader.vue";
import { createRequestErrorMessage } from "@/utils";
import { useMessage } from "naive-ui";

export default {
  name: "ServicesList",
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
  setup(props, { emit }) {
    const message = useMessage();
    const { t } = useI18n({ useScope: "global" });
    const store = useStore();

    const loading = ref(true);
    const loadingFailed = ref(false);
    const loaderAnimationFinished = ref(false);

    const selectService = (newValue) => {
      emit("update:selectedServiceId", newValue);
    };

    const servicesData = ref(null);

    onMounted(async () => {
      let response;
      try {
        if (store.state.settings.language) {
          response = await axios.get("services", {
            headers: {
              "accept-language": store.state.settings.language,
            },
          });
        } else {
          response = await axios.get("services");
        }
        servicesData.value = response.data;
      } catch (error) {
        loadingFailed.value = true;
        message.error(`Nie udało się załadować usług - ${createRequestErrorMessage(error)}`);
      }
      loading.value = false;
      setTimeout(() => {
        loaderAnimationFinished.value = true;
      }, 1000);
    });

    const services = ref(null);

    const scrollToServices = () => {
      services.value.scrollIntoView({ behavior: "smooth" });
    };

    watch(
      () => props.scrolledToServices,
      () => {
        scrollToServices();
      },
    );

    return {
      servicesData,
      services,
      loadingFailed,
      loading,
      loaderAnimationFinished,
      selectService,
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .services-header {
    font-size: 2.5rem;
    color: $secondary-text-color;
  }

  .hidden {
    display: none;
    opacity: 0;
  }

  .services {
    grid-template-columns: repeat(2, 1fr);
    padding: 2.5rem 10%;
    color: black;
    display: grid;
    gap: 2rem;
    transition: all 1s;

    @media only screen and (min-width: $lg) {
      & {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media only screen and (max-width: $sm) {
      & {
        grid-template-columns: 1fr;
      }
    }
  }

  .error-message {
    min-height: inherit;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    gap: 1rem;

    i {
      font-size: 2.25rem;
    }
  }
}
</style>
>
