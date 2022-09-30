<template>
  <div class="dashboard-page user-view">
    {{ $route.params.id }}
    {{ userData }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  name: 'UserView',
  setup() {
    const store = useStore();
    const route = useRoute();

    const userData = ref(null);

    onMounted(async () => {
      const storedUser = store.getters.getUserById(route.params.id);

      if (storedUser) {
        userData.value = storedUser;
      } else {
        try {
          const response = await axios.get(`users/${route.params.id}`);
          userData.value = response.data;
        } catch (error) {
          handleRequestError(error);
        }
      }
    });

    return {
      userData,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
