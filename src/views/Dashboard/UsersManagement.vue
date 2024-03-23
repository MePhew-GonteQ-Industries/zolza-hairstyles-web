<template>
  <section
    class="dashboard-page dashboard-data-page users-management"
    v-if="!loading"
  >
    <form class="appointments-filters">
      <CustomInput
        class="search"
        :label="t('dashboard.usersManagement.search')"
        v-model:value="q"
        type="search"
      />
    </form>

    <div class="dashboard-data-table-wrapper">
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="id"
              @toggleSort="toggleSort('id')"
            >
              #id</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >{{ t("shared.name") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >{{ t("shared.surname") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              {{ t("shared.email") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              {{ t("shared.gender") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >{{ t("dashboard.usersManagement.accessLevel") }}
            </SortedHeader>
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="endDate"
              @toggleSort="toggleSort('endDate')"
              >{{ t("dashboard.usersManagement.verified") }}
            </SortedHeader>
          </th>
          <th>{{ t("dashboard.usersManagement.blocked") }}</th>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td class="id">
              <router-link :to="`users/${user.id}`"> #{{ user.shortId }}...</router-link>
            </td>
            <td class="user-name">
              {{ user.name }}
            </td>
            <td class="user-surname">
              {{ user.surname }}
            </td>
            <td>{{ user.email }}</td>
            <td class="gender">
              <div class="data-icon-wrapper">
                <i :class="user.gender_icon_class"></i>
                <span>{{ user.gender }}</span>
              </div>
            </td>
            <td>
              <div class="data-icon-wrapper">
                <i :class="user.permission_level_icon_class"></i>
                <span>{{ user.permission_level }}</span>
              </div>
            </td>
            <td class="bool-column">
              <StatusIndicator :statusSuccess="user.verified" />
            </td>
            <td class="bool-column">
              <StatusIndicator :statusSuccess="user.disabled" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <div
    class="dashboard-page dashboard-data-page users-management"
    v-else
  >
    <CustomLoader></CustomLoader>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { onMounted, computed, ref } from "vue";
import CustomInput from "@/components/CustomInput.vue";
import StatusIndicator from "@/components/StatusIndicator.vue";
import { useStore } from "vuex";
import CustomLoader from "@/components/CustomLoader.vue";
import { useMessage } from "naive-ui";
import { createRequestErrorMessage } from "@/utils";
import { AxiosError } from "axios";

export default {
  name: "UsersManagement",
  components: {
    CustomInput,
    StatusIndicator,
    CustomLoader,
  },
  setup() {
    const message = useMessage();
    const store = useStore();

    const { t } = useI18n({ useScope: "global" });

    const loading = ref(true);

    const users = computed(() => {
      if (!store.state.users.users.length) return [];

      const usersTemp = [];

      store.state.users.users.forEach((user) => {
        const userTemp = user;

        userTemp.shortId = user.id.substr(0, 4);

        if (user.gender === "female" || user.gender === "Żeńska") {
          userTemp.gender_icon_class = "ph-gender-female";
          userTemp.gender = "Żeńska";
        } else if (user.gender === "male" || user.gender === "Męska") {
          userTemp.gender_icon_class = "ph-gender-male";
          userTemp.gender = "Męska";
        } else {
          userTemp.gender_icon_class = "ph-gender-neuter";
          userTemp.gender = "Inna";
        }
        userTemp.gender_icon_class += "-light";

        if (user.permission_level.includes("owner") || user.permission_level === "Właściciel") {
          userTemp.permission_level_icon_class = "ph-user-gear";
          userTemp.permission_level = "Właściciel";
        } else if (user.permission_level.includes("admin") || user.permission_level === "Admin") {
          userTemp.permission_level_icon_class = "ph-wrench";
          userTemp.permission_level = "Administrator";
        } else {
          userTemp.permission_level_icon_class = "ph-user";
          userTemp.permission_level = "Użytkownik";
        }
        userTemp.permission_level_icon_class += "-light";

        usersTemp.push(userTemp);
      });

      return usersTemp;
    });

    onMounted(async () => {
      try {
        await store.dispatch("loadUsers");
      } catch (error) {
        loading.value = false;
        if (error instanceof AxiosError) {
          message.error(`Nie udało się załadować wizyt - ${createRequestErrorMessage(error)}`);
        } else {
          throw error;
        }
      }
      loading.value = false;
    });

    return {
      users,
      t,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
td {
  &.bool-column {
    .data-icon-wrapper {
      justify-content: center;

      i {
        background-color: $secondary-color;
        padding: 0.25rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
