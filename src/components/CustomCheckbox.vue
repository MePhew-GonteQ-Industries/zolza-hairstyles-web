<template>
  <div class="checkbox-wrapper">
    <i class="ph-check-bold checkbox-icon" v-if="checked"></i>
    <input :aria-checked="checked" role="checkbox" type="checkbox" :checked="checked"
    @change="event => $emit('update:checked', event.target.checked)"
    name='custom-checkbox' :id="checkboxId">
    <label :for="checkboxId">
      <slot></slot>
    </label>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

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
  setup() {
    const checkboxId = ref(null);

    onMounted(() => {
      checkboxId.value = uuidv4();
    });

    return {
      checkboxId,
    };
  },
};
</script>

<style lang='scss' scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: .5rem;
  position: relative;
  height: 20px;

  .checkbox-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: $primary-color;
    z-index: 1;
    pointer-events: none;
  }

  input {
    position: relative;
    appearance: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid $primary-text-color;
    border-radius: .2rem;
  }

  input:checked {
    background-color: $accent-color;
    border-color: transparent;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
}
</style>
