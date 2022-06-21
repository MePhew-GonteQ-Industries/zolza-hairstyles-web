<template>
    <div class="carousel-item">
        <img :src="photo"/>
    </div>
</template>

<script>
export default {
  name: 'CarouselItem',
  props: ['photo'],
};
</script>

<style lang="scss" scoped>
    .carousel-item{
        img{
            height: 675px;
            width: 540px;
            margin: 0 .5vw;
            border: 2px solid black;
        }
    }
</style>
