<template>
  <div class="dashboard-page user-view" v-if="userData">
    <!-- {{ $route.params.id }} -->
    <p>ID użytkownika: {{ userData.id }}</p>
    <p>Imie: {{ userData.name }}</p>
    <p>Naziwsko: {{ userData.surname }}</p>
    <p>Płeć: {{ userData.gender }}</p>
    <p>Email: {{ userData.email }}</p>
    <p>Zweryfikowany: {{ userData.verified }}</p>
    <p>Wyłączony: {{ userData.disabled }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { handleRequestError } from "@/utils";

export default {
  name: "UserView",
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

<style lang="scss" scoped></style>
