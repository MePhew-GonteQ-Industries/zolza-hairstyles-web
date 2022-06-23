<template>
    <div class="carousel">
        <div class="carousel-inner">
            <CarouselItem
            v-for="(photo, index) in photos"
            :key="`photo-${index}`"
            :photo="photo"
            :current-photo="currentPhoto"
            :index="index"
            />
            <CarouselControls/>
        </div>
    </div>
</template>

<script>
import CarouselItem from './CarouselItem.vue';
import CarouselControls from './CarouselControls.vue';

export default {
  name: 'CarouselComponent',
  // props: {
  //   photos: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  props: ['photos'],
  components: { CarouselItem, CarouselControls },
  data: () => ({
    currentPhoto: 0,
    slideInterval: null,
  }),
  methods: {
    setCurrentPhoto(index) {
      this.currentPhoto = index;
    },
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      const index = this.currentPhoto < this.photos.length - 1 ? this.currentPhoto + 1 : 0;
      this.setCurrentPhoto(index);
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
  },
};
</script>

<style lang="scss" scoped>
.carousel{
  display: flex;
  justify-content: center;
  .carousel-inner{
    position: relative;
    overflow: hidden;
    height: 675px;
    width: 540px;
  }
}
</style>
