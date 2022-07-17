<template>
  <div class="checkbox-wrapper">
    <input :aria-checked="checked" role="checkbox" type="checkbox" :checked="checked"
    @change="event => $emit('update:checked', event.target.checked)">
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox',
  emits: [
    'update:checked',
  ],
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
