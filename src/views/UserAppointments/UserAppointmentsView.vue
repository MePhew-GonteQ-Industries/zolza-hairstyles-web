<template>
    <div class="user-appointments-view">
        <RouterView name="appointments" />
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.user-appointments-view {
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: $secondary-color;
}
</style>