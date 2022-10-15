<template>
  <div class="service">
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
      <div class="available-dates-wrapper">
        <p class="available-dates">{{ t("home.serviceTile.availableDates") }}</p>
        <CustomProgressBar :value="availability" />
      </div>
      <p class="price">
        {{ t("home.serviceTile.price") }}
        <span
          >{{ priceMin }}
          <span v-if="priceMax && priceMax !== priceMin">- {{ priceMax }}</span> zł</span
        >
      </p>
    </div>
    <input
      class="select-service"
      type="radio"
      name="select-service"
      @change="$emit('updateSelectedService', id)"
      :id="tileId"
    />
    <label :for="tileId"></label>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import CustomProgressBar from "@/components/CustomProgressBar.vue";
import { v4 as uuidv4 } from "uuid";

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
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    availability: {
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
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const tileId = uuidv4();

    return {
      tileId,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.service {
  padding: 0 2.5%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 2rem;
  justify-items: center;
  align-items: center;
  color: $secondary-text-color;
  @media only screen and (max-width: $xs) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .select-service:focus {
    outline: orange;
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
  }
}
</style>
