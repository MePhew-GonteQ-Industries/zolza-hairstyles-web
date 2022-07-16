<template>
    <input type="checkbox"
    class="custom-checkbox"
    name="checkbox-input">
    <label for="checkbox-input">
        <slot></slot>
    </label>
</template>

<script>
export default {
  name: 'CustomCheckbox',
};
</script>

<style lang="scss" scoped>
    .custom-checkbox{
    }
</style>
