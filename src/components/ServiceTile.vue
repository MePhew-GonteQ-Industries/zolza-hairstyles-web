<template>
<div class="service">
  <div class="left">
    <p class="name">{{ name }}</p>
    <p class="description">{{ description }}</p>
  </div>
  <div class="right">
    <p class="time">Czas: <span>~{{ time }}min</span></p>
    <CustomProgressBar color="#9ae66e" :value="time"/>
    <p class="available-dates">Dostępne terminy</p>
    <CustomProgressBar color="lightskyblue" :value="availability"/>
    <p class="price">Cena: <span>{{ priceMin }}
      <span v-if="priceMax">- {{ priceMax }}</span> zł</span></p>
  </div>
</div>
</template>

<script>
import CustomProgressBar from '@/components/CustomProgressBar.vue';

export default {
  name: 'ServiceTile',
  components: {
    CustomProgressBar,
  },
  props: {
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

  // p {

  //   span {
  //     font-weight: 600;
  //   }
  // }

  .left {
    .name {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .description {
      margin-top: .9rem;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
}
</style>
