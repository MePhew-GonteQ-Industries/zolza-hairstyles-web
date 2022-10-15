<template>
  <div class="link-button-wrapper" ref="linkButton">
    <router-link
      v-if="mode === 'router-link'"
      :to="to"
      :class="{ secondary: type === 'secondary' }"
      v-ripple
    >
      <slot />
    </router-link>
    <a
      :class="{ secondary: type === 'secondary' }"
      v-ripple
      v-else-if="mode === 'link'"
      :href="to"
      :target="target"
      ><slot
    /></a>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getCssPropertyValue, setCssPropertyValue } from "@/utils";

export default {
  name: "LinkButton",
  props: {
    to: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    mode: {
      type: String,
      default: "router-link",
    },
    target: {
      type: String,
      default: "_self",
    },
  },
  setup(props) {
    const linkButton = ref(null);

    onMounted(() => {
      let mainColor;
      let accentColor;

      switch (props.type) {
        case "secondary": {
          mainColor = getCssPropertyValue("--primary-text-color");
          accentColor = "transparent";
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
          mainColor = getCssPropertyValue("--primary-color");
          accentColor = getCssPropertyValue("--accent-color");
          break;
        }
      }

      setCssPropertyValue(linkButton.value, "--main-color", mainColor);
      setCssPropertyValue(linkButton.value, "--accent-color", accentColor);
    });

    return {
      linkButton,
    };
  },
};
</script>

<style lang="scss" scoped>
.link-button-wrapper {
  --main-color: none;
  --accent-color: none;
  $main-color: var(--main-color);
  $accent-color: var(--accent-color);
  min-height: 45px;
  width: 408px;

  a {
    height: 100%;
    width: 100%;
    border-radius: 0.313rem;
    background-color: $accent-color;
    color: $main-color;
    font-size: 0.875rem;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border: none;
    box-shadow: 0 0 8px -2px $box-shadow-color;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &:active,
    &:focus {
      border: none;
      outline: none;
    }

    &:focus {
      border: 2px solid $accent-color;
    }

    &.secondary {
      border: 1px solid $main-color;
    }
  }
}
</style>
