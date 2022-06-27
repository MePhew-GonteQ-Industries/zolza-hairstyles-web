<template>
    <div class="slider">
      <div class="photos">
        <template v-for="photo in photos" :key="photo">
          <img :src="photo" alt="image gallery photo" class="photo" />
        </template>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1.5rem;

  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    align-items: center;
    justify-items: center;
    overflow: hidden;

    .photo {
      width: 300px;
      margin: 0 10px;
    }
  }
}
</style>
