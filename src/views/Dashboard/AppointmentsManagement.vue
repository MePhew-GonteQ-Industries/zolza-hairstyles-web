<template>
  <section class="dashboard-page dashboard-data-page appointments-management" v-if="!loading">
    <form class="appointments-filters">
      <CustomInput class="search" :label="t('dashboard.appointmentsManagement.search')"
        v-model:value="q" type="search" appearance="secondary" />

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

    <CustomButton @click="addAppointmentModalOpen = true">Utwórz wizytę</CustomButton>
    <CustomModal v-model:open="addAppointmentModalOpen">
      <template #title>Dodaj wizytę</template>
      <div class="add-appointment-wrapper">
        <div class="modal-content-wrapper">
          <div class="input-wrapper">
            <CustomInput label="Email" type="email" autocomplete="off" v-if="!userWithoutAccount">
            </CustomInput>
            <CustomInput label="Imię" type="text" autocomplete="off"></CustomInput>
            <CustomInput label="Nazwisko" type="text" autocomplete="off"></CustomInput>
            <CustomCheckbox v-model:checked="userWithoutAccountChecked">Użytkownik bez konta
            </CustomCheckbox>
          </div>
          <div class="services-wrapper">
            <div class="service" v-for="service in servicesOptions" :key="service.id">
              <p>{{ service.name }}</p>
              <input class="select-service" type="radio" name="select-service"
                @change="$emit('updateSelectedService', id)" :id="tileId" />
            </div>
          </div>
        </div>
        <div class="buttons-wrapper">
          <CustomButton type="info" @click="addAppointmentModalOpen = false">Zapisz</CustomButton>
          <CustomButton type="secondary" @click="addAppointmentModalOpen = false">Anuluj
          </CustomButton>
        </div>
      </div>
    </CustomModal>

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
            <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="id"
              @toggleSort="toggleSort('id')">
              #id</SortedHeader>
          </th>
          <th>
            <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="service"
              @toggleSort="toggleSort('service')">{{ t("dashboard.appointmentsManagement.service")
              }}</SortedHeader>
          </th>
          <th>
            <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="user"
              @toggleSort="toggleSort('user')">
              {{ t("dashboard.appointmentsManagement.user") }}</SortedHeader>
          </th>
          <th>
            <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="startDate"
              @toggleSort="toggleSort('startDate')">{{
                  t("dashboard.appointmentsManagement.startDate")
              }}</SortedHeader>
          </th>
          <th>
            <SortedHeader :sortBy="sortBy" :sortAscending="sortAscending" sortName="endDate"
              @toggleSort="toggleSort('endDate')">{{ t("dashboard.appointmentsManagement.endDate")
              }}</SortedHeader>
          </th>
          <th>{{ t("dashboard.appointmentsManagement.status") }}</th>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td class="id">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`appointments/${appointment.id}`">
                    #{{ appointment.shortId }}...</router-link>
                </template>
                {{ appointment.id }}
              </CustomTooltip>
            </td>
            <td class="service">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`services/${appointment.service.id}`">Strzyżenie
                    męskie</router-link>
                </template>
                {{ appointment.service.id }}
              </CustomTooltip>
            </td>
            <td class="user">
              <CustomTooltip>
                <template #activator>
                  <router-link :to="`users/${appointment.user.id}`">
                    {{ appointment.user.name }}
                    {{ appointment.user.surname }}</router-link>
                </template>
                {{ appointment.user.id }}
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
    <NPagination />
  </section>
  <div class="dashboard-page dashboard-data-page users-management" v-else>
    <CustomLoader></CustomLoader>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomTooltip from "@/components/CustomTooltip.vue";
import { computed, onMounted, ref } from "vue";
import SortedHeader from "@/components/SortedHeader.vue";
import CustomButton from "@/components/CustomButton.vue";
import "v-calendar/dist/style.css";
// import { DatePicker } from 'v-calendar';
import CustomModal from '@/components/CustomModal.vue';
import CustomLoader from "@/components/CustomLoader.vue";
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

import { NPagination } from 'naive-ui';

export default {
  name: "AppointmentsManagement",
  components: {
    CustomInput,
    CustomSelect,
    CustomTooltip,
    SortedHeader,
    CustomButton,
    // DatePicker,
    CustomModal,
    CustomLoader,
    CustomCheckbox,
    NPagination,
  },
  setup() {
    const q = ref("");

    const { t } = useI18n({ useScope: "global" });

    const store = useStore();

    const addAppointmentModalOpen = ref(false);
    const userWithoutAccount = ref(false);
    const loading = ref(true);
    const tileId = uuidv4();

    const locale = store.state.settings.language;

    const sortBy = ref("startDate");
    const sortAscending = ref(false);

    const servicesOptions = ref(null);

    const userWithoutAccountChecked = (() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      userWithoutAccount.value = true;
    }
    );

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
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        appointmentTemp.end_slot.end_time_str = endTime.toLocaleTimeString(locale, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        appointmentTemp.shortId = appointment.id.substr(0, 4);

        if (appointment.archival) {
          appointmentTemp.status = "Archiwalna";
          appointmentTemp.icon_class = "ph-archive";
        } else if (appointment.canceled) {
          appointmentTemp.status = "Odwołana";
          appointmentTemp.icon_class = "ph-calendar-x";
        } else {
          appointmentTemp.status = "Nadchodząca";
          appointmentTemp.icon_class = "ph-arrow-square-up-right";
        }

        appointmentTemp.icon_class += "-light";

        appointmentsTemp.push(appointmentTemp);
      });

      return appointmentsTemp;
    });

    onMounted(async () => {
      const response = await axios.get('services');
      servicesOptions.value = response.data;
      await store.dispatch("loadAppointments");
      loading.value = false;
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
      loading,
      addAppointmentModalOpen,
      userWithoutAccount,
      servicesOptions,
      tileId,
      userWithoutAccountChecked,
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

.add-appointment-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .modal-content-wrapper {
    display: flex;
    gap: 1rem;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .services-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .service {
        width: 40%;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .select-service:focus {
          outline: orange;
        }
      }
    }
  }

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
  }
}
</style>
