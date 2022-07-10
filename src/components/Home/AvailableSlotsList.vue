<template>
<div class="available-slots-wrapper" v-if="selectedServiceId">
    <CustomLoader class='loader' v-if="loading"/>

    <div class="available-dates" v-if="!loading">
    <template v-for="(slot, index) in availableSlots" :key="slot.id">
        <AvailableDateTile :color="colors[Math.floor(index / 3)]"
        :day="slot.day" :time="slot.time"/>
    </template>

  </div>
</div>
</template>

<script>
import { useNavigatorLanguage } from '@vueuse/core';
import AvailableDateTile from '@/components/Home/AvailableSlotTile.vue';
import CustomLoader from '@/components/CustomLoader.vue';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import axios from 'axios';

export default {
  name: 'availableSlotsList',
  components: {
    AvailableDateTile,
    CustomLoader,
  },
  props: {
    selectedServiceId: {
      type: String,
    },
  },
  setup(props) {
    const locale = useNavigatorLanguage();

    const availableSlotsData = ref(null);

    const availableSlots = computed(() => {
      if (!availableSlotsData.value) {
        return [];
      }

      const slots = [];

      const now = new Date();

      availableSlotsData.value.forEach((service) => {
        const date = new Date(`${service.start_time}Z`);

        const day = date === now ? 'Dzisiaj' : date.toLocaleDateString(locale, {
          weekday: 'long',
        });

        slots.push({
          day: `${day[0].toUpperCase()}${day.slice(1)}`,
          time: date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
        });
      });

      return slots;
    });

    const loading = ref(true);

    const loadAppointments = async (selectedServiceId) => {
      loading.value = true;
      try {
        const response = await axios.get(`appointments/nearest/${selectedServiceId}`);
        availableSlotsData.value = response.data;
      } catch (err) {
        console.error(err);
      }
      loading.value = false;
    };

    const shuffleArray = (array) => {
      const shuffledArray = [...array];

      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
      }

      return shuffledArray;
    };

    const allColors = [
      ['#87BBA2', '#C9E4CA', '#FF729F'],
      ['#8EB8E5', '#FED18C', '#C98CA7'],
      ['#FC9E4F', '#C8D5B9', '#8FC0A9'],
      ['#C7EAE4', '#A7E8BD', '#FFD972'],
      ['#D3A588', '#ECE2D0', '#7FD1B9'],
      ['#96ADC8', '#CBFF8C', '#E3E36A'],
      ['#D7C0D0', '#F7C7DB', '#F79AD3'],
      ['#D782BA', '#E1DD8F', '#B1E5F2'],
      ['#59C3C3', '#E0A458', '#FFDBB5'],
      ['#B4ADEA', '#C6B38E', '#9CF6F6'],
      // ['#b88f8f', '#C0C999', '#A3A57E'], // brown
      // ['#e3cd35'], // yellow
      // ['#f47b2e'], // orange
      // ['#56f396', '#1ab85c', '#79de6b', '#40baa2', '#96d50e', '#2bdb7e', '#28e861'], // green
      // ['#65a1ce', '#44d4fa', '#4beaef', '#1ee1c5'], // blue
      // ['#ca3eb7', '#fe79fd', ''#858163''], // purple
    ];

    const colors = ref(null);

    onMounted(() => {
      colors.value = allColors[Math.floor(Math.random() * allColors.length)];
    });

    watch(() => props.selectedServiceId, (newValue) => {
      loading.value = true;
      loadAppointments(newValue);
      colors.value = shuffleArray(colors.value);
    });

    return {
      availableSlots,
      colors,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.available-slots-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;

  .available-dates {
    width: 100%;
    background-color: $secondary-color;
    color: black;
    display: grid;
    row-gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    padding: 3.5rem 10% 3.5rem 10%;
  }
}
</style>>
