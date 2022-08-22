<template>
  <div class="settings-page">
    <div class="elevated-card">
      <h1>{{ t("languageSettings.chooseLanguage") }}</h1>
      <CustomSelect
        :header="t('languageSettings.language')"
        :options="languageOptions"
        v-model:selectedValue="selectedLanguage"
        appearance="primary"
      />
      <div
        class="buttons-row"
        v-if="!(selectedLanguage === initialLanguage)"
      >
        <CustomButton type="success" @click="changeLanguage"
          >{{ t("shared.saveChanges") }}</CustomButton
        >
        <CustomButton
          type="secondary"
          @click="selectedLanguage = initialLanguage"
          >{{ t("shared.operationCancel") }}</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { handleRequestError } from '@/utils';
import { onBeforeRouteLeave } from 'vue-router';

export default {
  name: 'LanguageSettings',
  components: {
    CustomSelect,
    CustomButton,
  },
  setup() {
    const store = useStore();

    const languageOptions = [
      {
        title: 'Polish',
        value: 'pl',
        iconText: 'PL',
      },
      {
        title: 'English',
        value: 'en',
        iconText: 'EN',
      },
    ];

    const selectedLanguage = ref(store.state.settings.language);

    watch(selectedLanguage, (newValue) => {
      store.commit('setLanguage', newValue);
    });

    const initialLanguage = ref(store.state.settings.language);

    const changeLanguage = () => {
      axios
        .put('settings', {
          settings: [
            {
              name: 'language',
              new_value: selectedLanguage.value,
            },
            {
              name: 'preferred_theme',
              new_value: store.state.settings.theme,
            },
          ],
        })
        .then((response) => {
          const { settings } = response.data;
          const language = settings.find(
            (setting) => setting.name === 'language',
          ).current_value;
          store.commit('setLanguage', language);
          initialLanguage.value = store.state.settings.language;
        })
        .catch((error) => {
          handleRequestError(error);
        });
    };

    onBeforeRouteLeave(() => {
      store.commit('setLanguage', initialLanguage.value);
    });

    return {
      languageOptions,
      selectedLanguage,
      initialLanguage,
      changeLanguage,
    };
  },
};
</script>

<style lang='scss' scoped>
.buttons-row {
  display: flex;
  gap: 1rem;
  width: 100%;

  button {
    width: 100%;
  }
}
</style>
