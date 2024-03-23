<template>
  <div class="tooltip-wrapper">
    <slot name="activator" />
    <div
      class="tooltip"
      ref="tooltip"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getCssPropertyValue, setCssPropertyValue } from "@/utils";

export default {
  name: "CustomTooltip",
  props: {
    type: {
      type: String,
      default: "default",
    },
  },
  setup(props) {
    const tooltip = ref(null);

    onMounted(() => {
      let mainColor;
      let accentColor;

      switch (props.type) {
        case "primary": {
          mainColor = getCssPropertyValue("--primary-color");
          accentColor = getCssPropertyValue("--accent-color");
          break;
        }
        case "secondary": {
          mainColor = "white";
          accentColor = "grey";
          break;
        }
        case "success": {
          mainColor = "white";
          accentColor = getCssPropertyValue("--success-color");
          break;
        }
        case "info": {
          mainColor = "white";
          accentColor = getCssPropertyValue("--info-color");
          break;
        }
        case "warning": {
          mainColor = "white";
          accentColor = getCssPropertyValue("--warning-color");
          break;
        }
        case "error": {
          mainColor = "white";
          accentColor = getCssPropertyValue("--error-color");
          break;
        }
        default: {
          mainColor = "white";
          accentColor = getCssPropertyValue("--secondary-color");
          break;
        }
      }

      setCssPropertyValue(tooltip.value, "--main-color", mainColor);
      setCssPropertyValue(tooltip.value, "--accent-color", accentColor);
    });
    return {
      tooltip,
    };
  },
};
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
  position: relative;

  :slotted(*:not(.tooltip)) {
    &:hover ~ .tooltip {
      transform: translateX(-50%) scale(1) translateZ(0);
      opacity: 1;
    }
  }

  .tooltip {
    --main-color: none;
    --accent-color: none;
    $main-color: var(--main-color);
    $accent-color: var(--accent-color);
    background-color: $accent-color;
    color: $main-color;

    position: absolute;
    padding: 0.25rem;
    min-height: 20px;
    background-color: $accent-color;
    color: $main-color;
    font-size: 0.75rem;
    border-radius: 0.313rem;
    opacity: 0;
    top: 100%;
    left: 50%;
    margin-top: 0.25rem;
    transform: translateX(-50%) scale(0) translateZ(0);
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    z-index: 999;
    box-shadow: 0 0 8px -2px $box-shadow-color;
  }
}
</style>
