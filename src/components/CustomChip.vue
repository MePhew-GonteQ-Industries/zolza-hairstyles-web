<template>
  <div class="chip" ref="chip">
    <i :class="iconClass"></i>
    <span><slot /></span>
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
    },
    customIconClass: {
      type: String,
    },
  },
  setup(props) {
    const chip = ref(null);

    const iconClass = ref(null);

    onMounted(() => {
      let mainColor;
      let accentColor;

      if (props.customIconClass) {
        iconClass.value = props.customIconClass;
      } else {
        switch (props.type) {
          case "success": {
            iconClass.value = "ph-check-circle-light";
            break;
          }
          case "info": {
            iconClass.value = "ph-info-light";
            break;
          }
          case "warning": {
            iconClass.value = "ph-warning-circle-light";
            break;
          }
          case "error": {
            iconClass.value = "ph-warning-light";
            break;
          }
          default: {
            break;
          }
        }
      }

      switch (props.type) {
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
          mainColor = getCssPropertyValue("--primary-text-color");
          accentColor = getCssPropertyValue("--background-accent-low");
          break;
        }
      }

      setCssPropertyValue(chip.value, "--main-color", mainColor);
      setCssPropertyValue(chip.value, "--accent-color", accentColor);
    });

    return {
      chip,
      iconClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.chip {
  --main-color: none;
  --accent-color: none;
  $main-color: var(--main-color);
  $accent-color: var(--accent-color);

  background-color: $accent-color;
  color: $main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.938rem;
  width: fit-content;

  i {
    font-size: 1.125rem;
  }
}
</style>
