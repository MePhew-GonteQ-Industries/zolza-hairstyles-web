<template>
  <div class="settings-page">
    <div class="elevated-card">
      <h1>{{ t("themeSettings.selectTheme") }}</h1>
      <div class="theme-selection">
        <ThemeCard themeName="dark" v-model:selectedTheme="selectedTheme">
          {{ t("themeSettings.dark") }}
        </ThemeCard>
        <ThemeCard themeName="light" v-model:selectedTheme="selectedTheme">
          {{ t("themeSettings.light") }}
        </ThemeCard>
      </div>
      <div class="buttons-row" v-if="selectedTheme !== initialTheme">
        <CustomButton type="success" @click="changeTheme"
          >{{ t("shared.saveChanges") }}</CustomButton
        >
        <CustomButton
          type="secondary"
          @click="selectedTheme = initialTheme"
          >{{ t("shared.operationCancel") }}</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import ThemeCard from '@/components/Settings/ThemeCard.vue';
import CustomButton from '@/components/CustomButton.vue';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import { onBeforeRouteLeave } from 'vue-router';

export default {
  name: 'ThemeSettings',
  components: {
    ThemeCard,
    CustomButton,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });

    const selectedTheme = ref(store.state.settings.theme);

    watch(selectedTheme, (newValue) => {
      store.commit('setTheme', newValue);
    });

    const initialTheme = ref(store.state.settings.theme);

    const changeTheme = () => {
      axios
        .put('settings', {
          settings: [
            {
              name: 'language',
              new_value: store.state.settings.language,
            },
            {
              name: 'preferred_theme',
              new_value: selectedTheme.value,
            },
          ],
        })
        .then((response) => {
          const { settings } = response.data;
          const language = settings.find(
            (setting) => setting.name === 'language',
          ).current_value;
          store.commit('setLanguage', language);
          initialTheme.value = store.state.settings.theme;
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    onBeforeRouteLeave(() => {
      store.commit('setTheme', initialTheme.value);
    });

    return {
      selectedTheme,
      changeTheme,
      initialTheme,
      t,
    };
  },
};
</script>

<style lang='scss' scoped>
.theme-selection {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 1600px) {
    grid-template-columns: 1fr;
  }
}

.buttons-row {
  display: flex;
  gap: 1rem;

  button {
    width: 200px;
  }
}
</style>
