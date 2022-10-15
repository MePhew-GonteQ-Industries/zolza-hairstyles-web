<template>
  <section class="dashboard-page dashboard-data-page appointments-management">
    <form class="appointments-filters">
      <CustomInput
        class="search"
        :label="t('dashboard.appointmentsManagement.search')"
        v-model:value="q"
        type="search"
        appearance="secondary"
      />

      <div class="search-filters">
        <!-- <DatePicker
        :is-dark="$store.state. settings.theme === 'dark'"
        is-required
        is-range
        color="green"
        mode="date"
        v-model="selectedDate"/> -->
        <CustomSelect class="select" appearance="secondary" />
        <CustomSelect class="select" appearance="secondary" />
        <CustomSelect class="select" appearance="secondary" />
      </div>
    </form>

    <CustomButton>Utwórz wizytę</CustomButton>

    <div class="dashboard-data-table-wrapper">
      <table>
        <colgroup>
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
              >{{ t("dashboard.appointmentsManagement.service") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="user"
              @toggleSort="toggleSort('user')"
            >
              {{ t("dashboard.appointmentsManagement.user") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >{{
                t("dashboard.appointmentsManagement.startDate")
              }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="endDate"
              @toggleSort="toggleSort('endDate')"
              >{{ t("dashboard.appointmentsManagement.endDate") }}</SortedHeader
            >
          </th>
          <th>{{ t("dashboard.appointmentsManagement.status") }}</th>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td class="id">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`appointments/${appointment.id}`">
                    #{{ appointment.shortId }}...</router-link
                  >
                </template>
                {{ appointment.id }}
              </CustomTooltip>
            </td>
            <td class="service">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`services/${appointment.service.id}`"
                    >Strzyżenie męskie</router-link
                  >
                </template>
                {{ appointment.service.id }}
              </CustomTooltip>
            </td>
            <td class="user">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`users/${appointment.user.id}`">
                    {{ appointment.user.name }}
                    {{ appointment.user.surname }}</router-link
                  >
                </template>
                {{ appointment.service.id }}
              </CustomTooltip>
              <span>{{ appointment.user.email }}</span>
            </td>
            <td>{{ appointment.start_slot.start_time_str }}</td>
            <td>{{ appointment.end_slot.end_time_str }}</td>
            <td class="status">
              <div class="data-icon-wrapper">
                <i :class="appointment.icon_class"></i>
                <span>{{ appointment.status }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <i class="ph-caret-left-light"></i>
      <span class="pagination-number">1</span>
      <span class="pagination-number">...</span>
      <span class="pagination-number">371</span>
      <span class="pagination-number current">372</span>
      <span class="pagination-number">373</span>
      <span class="pagination-number">...</span>
      <span class="pagination-number">744</span>
      <i class="ph-caret-right-light"></i>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import CustomInput from '@/components/CustomInput.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomTooltip from '@/components/CustomTooltip.vue';
import { computed, onMounted, ref } from 'vue';
import SortedHeader from '@/components/SortedHeader.vue';
import CustomButton from '@/components/CustomButton.vue';
import 'v-calendar/dist/style.css';
// import { DatePicker } from 'v-calendar';

export default {
  name: 'AppointmentsManagement',
  components: {
    CustomInput,
    CustomSelect,
    CustomTooltip,
    SortedHeader,
    CustomButton,
    // DatePicker,
  },
  setup() {
    const q = ref('');

    const { t } = useI18n({ useScope: 'global' });

    const store = useStore();

    const locale = store.state.settings.language;

    const sortBy = ref('startDate');
    const sortAscending = ref(false);

    const toggleSort = (sortName) => {
      if (sortBy.value === sortName) {
        sortAscending.value = !sortAscending.value;
      } else {
        sortAscending.value = true;
        sortBy.value = sortName;
      }
    };

    const appointments = computed(() => {
      if (!store.state.appointments.appointments.length) return [];

      const appointmentsTemp = [];

      store.state.appointments.appointments.forEach((appointment) => {
        const startTime = new Date(`${appointment.start_slot.start_time}Z`);
        const endTime = new Date(`${appointment.end_slot.end_time}Z`);

        const appointmentTemp = appointment;

        appointmentTemp.start_slot.start_time_str = startTime.toLocaleTimeString(locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        appointmentTemp.end_slot.end_time_str = endTime.toLocaleTimeString(
          locale,
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        );

        appointmentTemp.shortId = appointment.id.substr(0, 4);

        if (appointment.archival) {
          appointmentTemp.status = 'Archiwalna';
          appointmentTemp.icon_class = 'ph-archive';
        } else if (appointment.canceled) {
          appointmentTemp.status = 'Odwołana';
          appointmentTemp.icon_class = 'ph-calendar-x';
        } else {
          appointmentTemp.status = 'Nadchodząca';
          appointmentTemp.icon_class = 'ph-arrow-square-up-right';
        }

        appointmentTemp.icon_class += '-light';

        appointmentsTemp.push(appointmentTemp);
      });

      return appointmentsTemp;
    });

    onMounted(async () => {
      await store.dispatch('loadAppointments');
    });

    const selectedDate = ref(new Date());

    return {
      appointments,
      q,
      selectedDate,
      sortBy,
      sortAscending,
      toggleSort,
      t,
    };
  },
};
</script>

<style lang="scss">
.appointments-filters {
  display: grid;
  grid-template-rows: 50px 50px;
  gap: 1rem;
  justify-items: center;
  width: 70%;

  .search,
  .select {
    height: 50px;
  }

  .select {
    .select {
      background-color: $secondary-color;
      box-shadow: 0 0 8px -2px $box-shadow-color;
    }
  }

  .select {
    width: 200px;
  }

  .search-filters {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  i {
    font-size: 1.5rem;
  }

  .pagination-number,
  i {
    padding: 0.5rem;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $background-accent-low;
    box-shadow: 0 0 8px -2px $box-shadow-color;

    &:not(.current) {
      cursor: pointer;
    }

    &:hover {
      background-color: $secondary-color;
    }

    &.current {
      background-color: $secondary-color;
      color: $accent-color;
      cursor: default;
    }
  }
}
</style>
