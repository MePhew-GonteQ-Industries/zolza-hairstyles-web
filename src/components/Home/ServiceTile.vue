<template>
  <div
    class="service"
    @click="$emit('updateSelectedService', id)"
    :class="{ selected: selectedServiceId === id }"
  >
    <div class="left">
      <p class="name">{{ name }}</p>
      <p class="description">{{ description }}</p>
    </div>
    <div class="right">
      <div class="time-wrapper">
        <p class="time">
          {{ t("home.serviceTile.time") }} <span>~{{ time }}min</span>
        </p>
        <CustomProgressBar :value="time" />
      </div>
      <p class="price">
        {{ t("home.serviceTile.price") }}
        <span
          >{{ priceMin }}
          <span v-if="priceMax && priceMax !== priceMin">- {{ priceMax }}</span> zł</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import CustomProgressBar from "@/components/CustomProgressBar.vue";

export default {
  name: "ServiceTile",
  components: {
    CustomProgressBar,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    time: {
      type: Number,
      required: true,
    },
    priceMin: {
      type: Number,
      required: true,
    },
    priceMax: {
      type: Number,
    },
    selectedServiceId: {
      type: String,
    },
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    return {
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.service {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 2rem;
  justify-items: center;
  align-items: center;
  color: $secondary-text-color;
  background-color: $background-accent-low;
  border: 1px solid $background-accent-medium;
  border-radius: 0.375rem;
  cursor: pointer;
  max-width: 500px;

  &.selected {
    background-color: $alternative-accent-color;
  }

  @media only screen and (max-width: $xs) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .left {
    .name {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .description {
      margin-top: 0.125rem;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    width: 125px;

    .time-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
