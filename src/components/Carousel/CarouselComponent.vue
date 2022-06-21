<template>
    <div class="carousel">
        <div class="carousel-inner">
            <CarouselItem
            v-for="(photo, index) in photos"
            :key="`photo-${index}`"
            :photo="photo"/>
        </div>
    </div>
</template>

<script>
import CarouselItem from './CarouselItem.vue';

export default {
  name: 'CarouselComponent',
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  components: { CarouselItem },
};
</script>
