<template>
  <section class="dashboard-page dashboard-data-page appointments-management">
    <form class="dashboard-filters-wrapper appointments-filters-wrapper">
      <!-- <CustomInput
        class="search"
        :label="t('dashboard.appointmentsManagement.search')"
        v-model:value="q"
        type="search"
        appearance="secondary"
      /> -->

      <!-- <DatePicker
          :is-dark="$store.state.settings.theme === 'dark'"
          is-required
          is-range
          color="green"
          mode="date"
          v-model="selectedDate"
        />
        <CustomSelect
          class="select"
          appearance="secondary"
        />
        <CustomSelect
          class="select"
          appearance="secondary"
        />
        <CustomSelect
          class="select"
          appearance="secondary"
        /> -->

      <CustomCheckbox v-model:checked="showArchivalAppointments">
        Pokaż archiwalne wizyty
      </CustomCheckbox>
    </form>

    <!-- <CustomButton @click="addAppointmentModalOpen = true"
      >{{ t("dashboard.appointmentsManagement.makeAnAppointment") }}
    </CustomButton>

    <CustomModal v-model:open="addAppointmentModalOpen">
      <template #title>{{ t("dashboard.appointmentsManagement.addAppointment") }}</template>
      <div class="add-appointment-wrapper">
        <div class="modal-content-wrapper">
          <div class="input-wrapper">
            <CustomInput
              :label="t('shared.email')"
              type="email"
              autocomplete="off"
              v-if="!userWithoutAccount"
            >
            </CustomInput>
            <CustomInput
              :label="t('shared.name')"
              type="text"
              autocomplete="off"
            ></CustomInput>
            <CustomInput
              :label="t('shared.surname')"
              type="text"
              autocomplete="off"
            ></CustomInput>
            <CustomCheckbox v-model:checked="userWithoutAccountChecked"
              >{{ t("dashboard.appointmentsManagement.userWithoutAccount") }}
            </CustomCheckbox>
          </div>
          <div class="services-wrapper">
            <div
              class="service"
              v-for="service in servicesOptions"
              :key="service.id"
            >
              <p>{{ service.name }}</p>
              <input
                class="select-service"
                type="radio"
                name="select-service"
                @change="$emit('updateSelectedService', id)"
                :id="tileId"
              />
            </div>
          </div>
        </div>
        <div class="buttons-wrapper">
          <CustomButton
            type="info"
            @click="addAppointmentModalOpen = false"
            >{{ t("dashboard.appointmentsManagement.save") }}</CustomButton
          >
          <CustomButton
            type="secondary"
            @click="addAppointmentModalOpen = false"
            >{{ t("dashboard.appointmentsManagement.cancel") }}
          </CustomButton>
        </div>
      </div>
    </CustomModal> -->

    <div
      class="dashboard-data-table-wrapper"
      v-if="!loading"
    >
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
              sortName="creationDate"
              @toggleSort="toggleSort('creationDate')"
              >{{ t("dashboard.appointmentsManagement.creationDate") }}</SortedHeader
            >
          </th>
          <th>
            <SortedHeader
              :sortBy="sortBy"
              :sortAscending="sortAscending"
              sortName="startDate"
              @toggleSort="toggleSort('startDate')"
              >{{ t("dashboard.appointmentsManagement.startDate") }}</SortedHeader
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
          <tr
            v-for="appointment in appointments"
            :key="appointment.id"
          >
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
                  <router-link :to="`services/${appointment.service.id}`">
                    {{ appointment.service.name }}</router-link
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
                {{ appointment.user.id }}
              </CustomTooltip>
              <span>{{ appointment.user.email }}</span>
            </td>
            <td>{{ appointment.created_at_str }}</td>
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
    <div
      v-else
      class="loader-wrapper"
    >
      <CustomLoader />
    </div>

    <!-- <NPagination /> -->
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
// import CustomInput from "@/components/CustomInput.vue";
// import CustomSelect from "@/components/CustomSelect.vue";
import CustomTooltip from "@/components/CustomTooltip.vue";
import { computed, onMounted, ref, watch } from "vue";
import SortedHeader from "@/components/SortedHeader.vue";
// import CustomButton from "@/components/CustomButton.vue";
// import CustomModal from "@/components/CustomModal.vue";
import CustomLoader from "@/components/CustomLoader.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import { v4 as uuidv4 } from "uuid";
// import { NPagination } from "naive-ui";
import { useMessage } from "naive-ui";
import { createRequestErrorMessage } from "@/utils";
import { AxiosError } from "axios";

export default {
  name: "AppointmentsManagement",
  components: {
    // CustomInput,
    // CustomSelect,
    CustomTooltip,
    SortedHeader,
    // CustomButton,
    // DatePicker,
    // CustomModal,
    CustomLoader,
    CustomCheckbox,
    // NPagination,
  },
  setup() {
    const message = useMessage();

    const { t } = useI18n({ useScope: "global" });
    const store = useStore();

    const q = ref("");

    const addAppointmentModalOpen = ref(false);
    const userWithoutAccount = ref(false);
    const loading = ref(true);
    const tileId = uuidv4();

    const locale = store.state.settings.language;

    const sortBy = ref("creationDate");
    const sortAscending = ref(false);

    const userWithoutAccountChecked = () => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      userWithoutAccount.value = true;
    };

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
        const creationDate = new Date(appointment.created_at);
        const startTime = new Date(appointment.start_slot.start_time);
        const endTime = new Date(appointment.end_slot.end_time);

        const appointmentTemp = appointment;

        appointmentTemp.created_at_str = creationDate.toLocaleTimeString(locale, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

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

    const loadAppointments = async (includeArchival) => {
      loading.value = true;

      try {
        await store.dispatch("loadAppointments", includeArchival);
      } catch (error) {
        loading.value = false;
        if (error instanceof AxiosError) {
          message.error(`Nie udało się załadować wizyt - ${createRequestErrorMessage(error)}`);
        } else {
          throw error;
        }
      }

      loading.value = false;
    };

    const showArchivalAppointments = ref(false);

    watch(showArchivalAppointments, async (newValue) => {
      await loadAppointments(newValue);
    });

    onMounted(async () => {
      await loadAppointments(showArchivalAppointments.value);
    });

    return {
      appointments,
      q,
      sortBy,
      sortAscending,
      toggleSort,
      t,
      loading,
      addAppointmentModalOpen,
      userWithoutAccount,
      tileId,
      userWithoutAccountChecked,
      showArchivalAppointments,
    };
  },
};
</script>

<style lang="scss">
// .pagination {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;

//   i {
//     font-size: 1.5rem;
//   }

//   .pagination-number,
//   i {
//     padding: 0.5rem;
//     border-radius: 50%;
//     height: 50px;
//     width: 50px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: $background-accent-low;
//     box-shadow: 0 0 8px -2px $box-shadow-color;

//     &:not(.current) {
//       cursor: pointer;
//     }

//     &:hover {
//       background-color: $secondary-color;
//     }

//     &.current {
//       background-color: $secondary-color;
//       color: $accent-color;
//       cursor: default;
//     }
//   }
// }

// .add-appointment-wrapper {
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;

//   .modal-content-wrapper {
//     display: flex;
//     gap: 1rem;

//     .input-wrapper {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }

//     .services-wrapper {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 1rem;

//       .service {
//         width: 40%;
//         height: 45px;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         gap: 1rem;

//         .select-service:focus {
//           outline: orange;
//         }
//       }
//     }
//   }

//   .buttons-wrapper {
//     display: flex;
//     gap: 1rem;
//   }
// }
</style>
