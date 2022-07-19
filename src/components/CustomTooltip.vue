<template>
  <div class="tooltip" ref="tooltip">
    <slot>
    </slot>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getCssPropertyValue, setCssPropertyValue } from '@/utils';

export default {
  name: 'CustomTooltip',
  props: {
    type: {
      type: String,
    },
  },
  setup(props) {
    const tooltip = ref();

    onMounted(() => {
      let mainColor;
      let accentColor;

      switch (props.type) {
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
          mainColor = getCssPropertyValue('--primary-text-color');
          accentColor = getCssPropertyValue('--background-accent-low');
          break;
        }
      }

      setCssPropertyValue(tooltip.value, '--main-color', mainColor);
      setCssPropertyValue(tooltip.value, '--accent-color', accentColor);
    });
    return {
      tooltip,
    };
  },
};
</script>

<style lang='scss' scoped>
  .tooltip{
    --main-color: none;
    --accent-color: none;
    $main-color: var(--main-color);
    $accent-color: var(--accent-color);
    background-color: $accent-color;
    color: $main-color;
  }
</style>
