<template>
  <div class="checkbox-wrapper">
    <i class="ph-check-bold checkbox-icon" v-if="checked"></i>
    <input
      :aria-checked="checked"
      type="checkbox"
      :checked="checked"
      @change="(event) => $emit('update:checked', event.target.checked)"
      name="custom-checkbox"
      :id="checkboxId"
      :class="forceValidate"
    />
    <label :for="checkboxId">
      <slot />
    </label>
    <div
      v-show="forceValidate"
      class="invalid-wrapper"
    >
      <i class="ph-warning-circle-light invalid-icon"></i>

      <p class="message-invalid message-value-empty">
        {{ messageUnchecked }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'CustomCheckbox',
  emits: ['update:checked'],
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    forceValidate: {
      type: Boolean,
      default: false,
    },
    messageUnchecked: {
      type: String,
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
  gap: 0.5rem;
  position: relative;
  height: 20px;

  .invalid-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 15px;
    transform: translate3d(0, 0, 0);

    .invalid-icon {
      position: static;
      font-size: 2rem;
      color: $error-color;
    }

    .message-invalid {
      color: $error-color;
    }
  }

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
    border-radius: 0.2rem;
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
