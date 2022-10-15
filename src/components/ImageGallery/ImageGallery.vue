<template>
  <div class="slider">
    <swiper :slidesPerView="3" :slidesPerGroup="3" :loop="true" :loopFillGroupWithBlank="true"
      :pagination="{
        clickable: true,
      }" :breakpoints="{
        120: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15,
        },
        600: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spacebetween: 5,
        },
      }" :navigation="true" :modules="modules" :autoplay="{
        delay: 2500,
        disableOnInteraction: true,
      }" class="mySwiper">
      <swiper-slide v-for="photo in photos" :key="photo.id">
        <img :src="photo.path" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";

/* eslint-disable */
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/thumbs';
import { onMounted } from "vue";

export default {
  name: 'ImageGallery',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log(props.photos);
    })

    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>

<style lang="scss">
.swiper {
  --swiper-theme-color: #{$accent-color};
}

.swiper-button-next {
  right: 2.25rem;
}

.swiper-button-prev {
  left: 2.25rem;
}
</style>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1.5rem;

  .swiper {
    width: 100%;
    height: 100%;
    padding: 3rem 4rem;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    max-height: 60vh;
    max-width: 25vw;
    display: block;
    object-fit: cover;
    user-select: none;
  }
}
</style>
