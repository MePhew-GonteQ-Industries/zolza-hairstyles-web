<template>
  <div class="message-box" ref="messageBox">
    <i class="ph-warning-light"></i>
    <div class="heading">
      <p><slot name="title"></slot></p>
      <span><slot name="subtitle"></slot></span>
    </div>
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
    const messageBox = ref();

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

      setCssPropertyValue(messageBox.value, '--main-color', mainColor);
      setCssPropertyValue(messageBox.value, '--accent-color', accentColor);
    });

    return {
      messageBox,
    };
  },
};
</script>

<style lang='scss' scoped>
.message-box {
  --main-color: none;
  --accent-color: none;
  $main-color: var(--main-color);
  $accent-color: var(--accent-color);

  display: flex;
  align-items: flex-start;
  gap: 1rem;

  i {
    font-size: 2rem;
  }

  background-color: $accent-color;
  border-radius: 0.375rem;
  padding: 1rem 1rem;
  color: $main-color;
  box-shadow: 0 0 8px -2px $box-shadow-color;

  .heading {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    span {
      cursor: pointer;
    }
  }
}
</style>
