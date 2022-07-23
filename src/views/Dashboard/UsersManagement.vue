<template>
  <section class="dashboard-page dashboard-data-page users-management">
    <form class="appointments-filters">
      <CustomInput
        class="search"
        label="Szukaj użytkowników"
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
              >#id</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >Imię</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="service"
              @toggleSort="toggleSort('service')"
              >Nazwisko</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              Email</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              Płeć</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >Poziom uprawnień</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="endDate"
              @toggleSort="toggleSort('endDate')"
              >Zweryfikowany</SortedHeader
            >
          </th>
          <th>Zablokowany</th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="id">
              <router-link :to="`appointment/${user.id}`">
                #{{ user.shortId }}...</router-link
              >
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
              <div class="data-icon-wrapper">
                <i :class="user.verified_status_icon_class"></i>
              </div>
            </td>
            <td class="bool-column">
              <div class="data-icon-wrapper">
                <i :class="user.blocked_status_icon_class"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CustomInput from '@/components/CustomInput.vue';

export default {
  name: 'UsersManagement',
  components: {
    CustomInput,
  },
  setup() {
    const usersData = ref(null);

    const users = computed(() => {
      if (!usersData.value) return [];

      const usersTemp = [];

      usersData.value.users.forEach((user) => {
        const userTemp = user;

        userTemp.shortId = user.id.substr(0, 4);

        if (user.gender === 'female') {
          userTemp.gender_icon_class = 'ph-gender-female';
          userTemp.gender = 'Żeńska';
        } else if (user.gender === 'male') {
          userTemp.gender_icon_class = 'ph-gender-male';
          userTemp.gender = 'Męska';
        } else {
          userTemp.gender_icon_class = 'ph-gender-neuter';
          userTemp.gender = 'Inna';
        }
        userTemp.gender_icon_class += '-light';

        if (user.permission_level.includes('owner')) {
          userTemp.permission_level_icon_class = 'ph-user-gear';
          userTemp.permission_level = 'Właściciel';
        } else if (user.permission_level.includes('admin')) {
          userTemp.permission_level_icon_class = 'ph-wrench';
          userTemp.permission_level = 'Administrator';
        } else {
          userTemp.permission_level_icon_class = 'ph-user';
          userTemp.permission_level = 'Użytkownik';
        }
        userTemp.permission_level_icon_class += '-light';

        if (user.verified) {
          userTemp.verified_status_icon_class = 'ph-check-circle';
        } else {
          userTemp.verified_status_icon_class = 'ph-x-circle';
        }
        userTemp.verified_status_icon_class += '-light';

        if (user.blocked) {
          usersTemp.blocked_status_icon_class = 'ph-check-circle';
        } else {
          userTemp.blocked_status_icon_class = 'ph-x-circle';
        }
        userTemp.blocked_status_icon_class += '-light';

        usersTemp.push(userTemp);
      });

      return usersTemp;
    });

    onMounted(async () => {
      try {
        const response = await axios.get('users');
        usersData.value = response.data;
        console.log(usersData.value);
      } catch (err) {
        // loadingFailed.value = true;
        console.error(err);
      }
      // loading.value = false;
      setTimeout(() => {
        // loaderAnimationFinished.value = true;
      }, 1000);
    });

    return {
      usersData,
      users,
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
