<template>
    <div class="sidebar">

    </div>
</template>

<script>
export default {
  name: 'customSidebar',
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
    .sidebar{
        z-index: 8;
        height: 100%;
        width: 100%;
        background-color: $primary-color;
        box-shadow: 40vw 0 1000px 15vw white;
    }
</style>
