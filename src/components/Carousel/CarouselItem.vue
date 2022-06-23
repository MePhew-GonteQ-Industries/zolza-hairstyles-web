<template>
    <transition name="slide-in">
        <div class="carousel-item"
        v-show="currentPhoto === index">
            <img :src="photo"/>
    </div>
    </transition>
</template>

<script>

export default {
  name: 'CarouselItem',
  //   props: {
  //     photo: {
  //       type: String,
  //       required: true,
  //     },
  //     currentPhoto: {
  //       required: true,
  //     },
  //     index: {
  //       required: true,
  //     },
  //   },
  props: ['photo', 'currentPhoto', 'index'],
};
</script>

<style lang="scss" scoped>
.carousel-item{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    img{
        height: 675px;
        width: 540px;
        // margin: 0 .5vw;
    }
}
.slide-in-enter-active,
.slide-in-leave-active{
    transition: all 1s ease-in-out;
}
.slide-in-enter-from{
    transform: translateX(-100%);
}
.slide-in-leave-to{
    transform: translateX(100%);
}
</style>
