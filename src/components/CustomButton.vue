<template>
  <button
    class="login"
    ref="button"
    :class="{ secondary: type === 'secondary' }"
    v-ripple
  >
    <slot />
  </button>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCssPropertyValue, setCssPropertyValue } from '@/utils';

export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
  setup(props) {
    const button = ref(null);

    onMounted(() => {
      let mainColor;
      let accentColor;

      switch (props.type) {
        case 'secondary': {
          mainColor = getCssPropertyValue('--primary-text-color');
          accentColor = 'transparent';
          break;
        }
        case 'success': {
          mainColor = getCssPropertyValue('--success-color');
          accentColor = getCssPropertyValue('--success-color-low');
          break;
        }
        case 'info': {
          mainColor = getCssPropertyValue('--info-color');
          accentColor = getCssPropertyValue('--info-color-low');
          break;
        }
        case 'warning': {
          mainColor = getCssPropertyValue('--warning-color');
          accentColor = getCssPropertyValue('--warning-color-low');
          break;
        }
        case 'error': {
          mainColor = getCssPropertyValue('--error-color');
          accentColor = getCssPropertyValue('--error-color-low');
          break;
        }
        default: {
          mainColor = getCssPropertyValue('--primary-color');
          accentColor = getCssPropertyValue('--accent-color');
          break;
        }
      }

      setCssPropertyValue(button.value, '--main-color', mainColor);
      setCssPropertyValue(button.value, '--accent-color', accentColor);
    });

    return {
      button,
    };
  },
};
</script>

<style lang='scss' scoped>
button {
  --main-color: none;
  --accent-color: none;
  $main-color: var(--main-color);
  $accent-color: var(--accent-color);

  height: 45px;
  width: 408px;
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

  &:focus {
    outline: none;
  }

  &:hover,
  &:active,
  &:focus {
    border: none;
    outline: none;
  }

  &.secondary {
    border: 1px solid $main-color;
  }
}
</style>
