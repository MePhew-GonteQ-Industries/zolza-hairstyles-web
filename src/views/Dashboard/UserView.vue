<template>
  <div class="dashboard-page user-view" v-if="userData">
    <!-- {{ $route.params.id }} -->
    <div class="user elevated-card">
      <div class="avatar-row">
        <i class="ph-user-square-light avatar icon"></i>
        <div class="user-data">
          <CustomChip type="info" :customIconClass="userIconClass">{{ userRole }}</CustomChip>
          <p class="email">{{ userData.email }}</p>
        </div>
      </div>
      <p>ID użytkownika: {{ userData.id }}</p>
      <p>Imie: {{ userData.name }}</p>
      <p>Naziwsko: {{ userData.surname }}</p>
      <p>Płeć: {{ userData.gender }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Zweryfikowany: {{ userData.verified }}</p>
      <p>Wyłączony: {{ userData.disabled }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { handleRequestError } from "@/utils";
import CustomChip from "@/components/CustomChip.vue";

export default {
  name: "UserView",
  components: {
    CustomChip,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const userData = ref(null);

    const userRole = ref(null);
    let userIconClass;

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

      if (userData.value.isOwner) {
        userIconClass = "ph-user-gear-light";
        userRole.value = "Właściciel";
      } else if (userData.value.isAdmin) {
        userIconClass = "ph-wrench-light";
        userRole.value = "Admin";
      } else {
        userIconClass = "ph-user-light";
        userRole.value = "Użytkownik";
      }
    });

    return {
      userData,
      userRole,
      userIconClass,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
