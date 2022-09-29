<template>
  <div
    class="theme-card"
    @click="$emit('update:selectedTheme', themeName)"
    @keypress.enter="$emit('update:selectedTheme', themeName)"
  >
    <CustomRadioButton
      name="theme-selection"
      :value="themeName"
      :checked="selectedTheme === themeName"
      @change="$emit('update:selectedTheme', themeName)"
    >
      <slot />
    </CustomRadioButton>
    <div class="theme-preview" ref="themePreview">
      <div class="header">
        <div class="accent-indicator"></div>
        <div class="accent-line"></div>
      </div>
      <div class="main">
        <div class="left">
          <i class="ph-list-bullets-thin"></i>
        </div>
        <div class="right">
          <i class="ph-dots-nine-thin"></i>
        </div>
      </div>
      <div class="footer">
        <i class="ph-atom-light"></i>
        <div class="accent-line"></div>
        <i class="ph-atom-light"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import CustomRadioButton from '@/components/CustomRadioButton.vue';
import { setCssPropertyValue, getCssPropertyValue } from '@/utils';

export default {
  name: 'ThemeCard',
  components: {
    CustomRadioButton,
  },
  props: {
    themeName: {
      type: String,
      required: true,
    },
    selectedTheme: {
      type: String,
      required: true,
    },
  },
  emits: ['update:selectedTheme'],
  setup(props) {
    const themePreview = ref(null);

    onMounted(() => {
      const primaryColor = getCssPropertyValue(
        `--primary-color-${props.themeName}`,
      );
      const secondaryColor = getCssPropertyValue(
        `--secondary-color-${props.themeName}`,
      );
      const accentColor = getCssPropertyValue(
        `--accent-color-${props.themeName}`,
      );
      const primaryTextColor = getCssPropertyValue(
        `--primary-text-color-${props.themeName}`,
      );
      const secondaryTextColor = getCssPropertyValue(
        `--secondary-text-color-${props.themeName}`,
      );
      const themeColor = getCssPropertyValue(
        `--theme-color-${props.themeName}`,
      );

      setCssPropertyValue(
        themePreview.value,
        '--primary-theme-color',
        primaryColor,
      );
      setCssPropertyValue(
        themePreview.value,
        '--secondary-theme-color',
        secondaryColor,
      );
      setCssPropertyValue(
        themePreview.value,
        '--accent-theme-color',
        accentColor,
      );
      setCssPropertyValue(
        themePreview.value,
        '--primary-text-theme-color',
        primaryTextColor,
      );
      setCssPropertyValue(
        themePreview.value,
        '--secondary-text-theme-color',
        secondaryTextColor,
      );
      setCssPropertyValue(themePreview.value, '--theme-color', themeColor);
    });

    return {
      themePreview,
    };
  },
};
</script>

<style lang="scss" scoped>
.theme-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
}

.theme-preview {
  $primary-theme-color: var(--primary-theme-color);
  $secondary-theme-color: var(--secondary-theme-color);
  $accent-theme-color: var(--accent-theme-color);
  $primary-text-theme-color: var(--primary-text-theme-color);
  $secondary-text-theme-color: var(--secondary-text-theme-color);
  $theme-color: var(--theme-color);

  padding: 1rem;
  gap: 1rem;
  background-color: $theme-color;
  height: 400px;
  width: 600px;
  border-radius: 0.313rem;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: $xs){
    width: 80vw;
    height: 40vh;
  }

  * {
    border-radius: inherit;
  }

  .accent-indicator {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: $accent-theme-color;
  }

  .accent-line {
    height: 2px;
    width: 100%;
    background-color: $primary-text-theme-color;
  }

  .header,
  .footer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
  }

  .header {
    height: 20%;
    width: 100%;
    background-color: $primary-theme-color;

    .accent-line {
      background-color: $secondary-text-theme-color;
    }
  }

  .main {
    display: flex;
    gap: 1rem;
    height: 60%;
    width: 100%;
    font-size: 8rem;
    color: $primary-text-theme-color;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      gap: 1rem;
      padding: 0 2rem;
    }

    .left {
      height: 100%;
      width: 65%;
      background-color: $secondary-theme-color;
      align-items: flex-start;
      font-size: 12rem;
      @media only screen and (max-width: $xs){
        padding: 0;
      }
    }

    .right {
      height: 100%;
      width: 35%;
      background-color: $primary-theme-color;
    }
  }

  .footer {
    height: 20%;
    width: 100%;
    background-color: $secondary-theme-color;
    font-size: 1.5rem;
    color: $accent-theme-color;

    .accent-line {
      background-color: $secondary-text-theme-color;
    }
  }
}
</style>
