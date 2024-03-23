<template>
  <div
    :class="[
      appearance === 'checkbox'
        ? 'checkbox-wrapper'
        : appearance === 'switch'
          ? 'switch-wrapper'
          : '',
      { disabled: disabled },
    ]"
    class="checkbox"
    ref="checkbox"
  >
    <input
      :aria-checked="checked"
      type="checkbox"
      :checked="checked"
      @change="(event) => $emit('update:checked', event.target.checked)"
      name="custom-checkbox"
      :id="checkboxId"
      :disabled="disabled"
    />
    <i class="ph-check-bold checkbox-icon"></i>
    <label :for="checkboxId">
      <slot v-if="appearance === 'checkbox'" />
    </label>
    <div
      class="label"
      v-if="appearance !== 'checkbox'"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { getCssPropertyValue, setCssPropertyValue } from "@/utils";

export default {
  name: "CustomCheckbox",
  emits: ["update:checked"],
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    appearance: {
      type: String,
      default: "checkbox",
    },
    type: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const checkboxId = ref(null);
    const checkbox = ref(null);

    onMounted(() => {
      checkboxId.value = uuidv4();

      let mainColor;
      let accentColor;

      switch (props.appearance) {
        case "switch": {
          switch (props.type) {
            case "secondary": {
              mainColor = getCssPropertyValue("--primary-text-color");
              accentColor = "grey";
              break;
            }
            case "success": {
              mainColor = getCssPropertyValue("--success-color");
              accentColor = getCssPropertyValue("--success-color-low");
              break;
            }
            case "info": {
              mainColor = getCssPropertyValue("--info-color");
              accentColor = getCssPropertyValue("--info-color-low");
              break;
            }
            case "warning": {
              mainColor = getCssPropertyValue("--warning-color");
              accentColor = getCssPropertyValue("--warning-color-low");
              break;
            }
            case "error": {
              mainColor = getCssPropertyValue("--error-color");
              accentColor = getCssPropertyValue("--error-color-low");
              break;
            }
            default: {
              mainColor = getCssPropertyValue("--accent-color");
              accentColor = getCssPropertyValue("--accent-color-low");
              break;
            }
          }
          break;
        }
        default: {
          switch (props.type) {
            case "secondary": {
              mainColor = getCssPropertyValue("--primary-text-color");
              accentColor = "grey";
              break;
            }
            case "success": {
              mainColor = getCssPropertyValue("--success-color");
              accentColor = getCssPropertyValue("--success-color-low");
              break;
            }
            case "info": {
              mainColor = getCssPropertyValue("--info-color");
              accentColor = getCssPropertyValue("--info-color-low");
              break;
            }
            case "warning": {
              mainColor = getCssPropertyValue("--warning-color");
              accentColor = getCssPropertyValue("--warning-color-low");
              break;
            }
            case "error": {
              mainColor = getCssPropertyValue("--error-color");
              accentColor = getCssPropertyValue("--error-color-low");
              break;
            }
            default: {
              mainColor = getCssPropertyValue("--accent-color");
              accentColor = getCssPropertyValue("--accent-color-low");
              break;
            }
          }
          break;
        }
      }

      setCssPropertyValue(checkbox.value, "--main-color", mainColor);
      setCssPropertyValue(checkbox.value, "--accent-color", accentColor);
    });

    return {
      checkboxId,
      checkbox,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  --main-color: none;
  --accent-color: none;
  $main-color: var(--main-color);
  $accent-color: var(--accent-color);

  display: flex;
  align-items: center;
  height: 20px;

  &.checkbox-wrapper {
    gap: 0.5rem;
    position: relative;

    &.disabled {
      opacity: 0.6;

      label {
        cursor: default;
      }
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
      background-color: $main-color;
      border-color: transparent;
    }

    input:checked + .checkbox-icon {
      opacity: 1;
    }

    label {
      cursor: pointer;
      user-select: none;
    }
  }

  &.switch-wrapper {
    input[type="checkbox"] {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    &.disabled {
      opacity: 0.6;

      label {
        background: rgba(66, 66, 66, 0.6);
        cursor: default;
      }

      label:after {
        background: rgb(66, 66, 66);
      }
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 35px;
      height: 15px;
      background: $secondary-color;
      display: block;
      border-radius: 10px;
      position: relative;
    }

    label:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 18px;
      height: 18px;
      background: $primary-text-color;
      border-radius: 9px;
      transition: 0.3s;
    }

    input:checked ~ label {
      background: $accent-color;
    }

    input:checked ~ label:after {
      left: 100%;
      transform: translateY(-50%) translateX(-100%);
      background-color: $main-color;
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
    opacity: 0;
  }

  .label {
    margin-left: 0.5rem;
  }
}
</style>
