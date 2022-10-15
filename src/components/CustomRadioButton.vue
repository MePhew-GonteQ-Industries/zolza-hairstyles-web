<template>
  <div class="radio-wrapper">
    <input
      :aria-checked="checked"
      type="radio"
      :checked="checked"
      @change="(event) => $emit('update:checked', event.target.checked)"
      :name="name"
      :id="radioId"
      :value="value"
    />
    <div class="radio-handle"><div class="indicator"></div></div>
    <label :for="radioId">
      <slot />
    </label>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CustomRadioButton",
  emits: ["update:checked"],
  props: {
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup() {
    const radioId = ref(null);

    onMounted(() => {
      radioId.value = uuidv4();
    });

    return {
      radioId,
    };
  },
};
</script>

<style lang="scss" scoped>
.radio-handle {
  position: absolute;
  height: 20px;
  width: 20px;
  border: 2px solid $primary-text-color;
  border-radius: 50%;
  padding: 4px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  .indicator {
    height: 100%;
    width: 100%;
    transform: scale(0);
    background-color: $accent-color;
    border-radius: 50%;
    transition: all calc($transition-duration / 2);
  }
}

.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  height: 20px;

  input {
    position: relative;
    appearance: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    opacity: 0;
  }

  input:checked {
    ~ .radio-handle {
      border-color: $accent-color;

      .indicator {
        transform: scale(1);
      }
    }
  }

  label {
    cursor: pointer;
    user-select: none;
  }
}
</style>
