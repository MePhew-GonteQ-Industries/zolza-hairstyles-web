<template>
    <div class="user-appointments-wrapper">
        <router-link :to="({ name: 'makeAnAppointment' })" class="make-an-appointment-button">{{
                t('userAppointmentsView.appointmentsList.makeAnAppointment')
        }}</router-link>
        <h1>{{ t('userAppointmentsView.appointmentsList.yourAppointments') }}:</h1>
        <div class="appointments-list" v-if="appointmentsFiltered.length > 0 && !loading">
            <n-card v-for="appointment in appointmentsFiltered" :key="appointment.id" size="huge"
                :title="appointment.service">
                {{ t('userAppointmentsView.appointmentsList.date') }}: {{ new
                        Date(`${appointment.startSlot}Z`).toLocaleDateString(locale, {
                            weekday: 'long',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })
                }} {{ new Date(`${appointment.startSlot}Z`).toLocaleTimeString(locale, {
        hour: '2-digit', minute:
            '2-digit',
    })
}} - {{ new Date(`${appointment.endSlot}Z`).toLocaleTimeString(locale, {
        hour: '2-digit', minute:
            '2-digit',
    })
}}
                <template #footer>
                    {{ t('userAppointmentsView.appointmentsList.price') }}: {{ appointment.minPrice }}zł <span
                        v-if="appointment.minPrice !== appointment.maxPrice">- {{
                                appointment.maxPrice
                        }}zł</span>
                </template>
            </n-card>
        </div>
        <div class="no-appointments-wrapper" v-if="appointmentsFiltered.length === 0 && !loading">
            <n-tag type="info" size="large">{{ t('userAppointmentsView.appointmentsList.noAppointments') }}</n-tag>
        </div>
        <div class="loader" v-if="loading">
            <CustomLoader></CustomLoader>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useStore } from 'vuex';
import { NTag, NCard } from 'naive-ui';
import CustomLoader from '../../components/CustomLoader.vue';
import { handleRequestError } from '@/utils.js';
export default {
    components: {
        NTag,
        CustomLoader,
        NCard,
    },
    setup() {
        const store = useStore();
        const appointments = ref([]);
        const loading = ref(true);
        const locale = store.state.settings.language;
        const { t } = useI18n({ useScope: 'global' });

        const appointmentsFiltered = computed(() => {
            if (!appointments.value) return [];

            const appointmentsData = [];

            appointments.value.forEach((appointment) => {
                if (!appointment.archival && !appointment.canceled) {
                    const service = appointment.service.name;
                    const id = appointment.id;
                    const startSlot = appointment['start_slot']['start_time'];
                    const endSlot = appointment['end_slot']['end_time'];
                    const minPrice = appointment.service['min_price'];
                    const maxPrice = appointment.service['max_price'];
                    appointmentsData.push({ service, id, startSlot, endSlot, minPrice, maxPrice });
                }
            });

            return appointmentsData
        });

        const loadAppointments = async () => {
            try {
                const response = await axios.get('/appointments/mine');
                appointments.value = response.data;
                loading.value = false;
            } catch (error) {
                handleRequestError(error);
            }
        };

        onMounted(() => {
            loadAppointments();
        });

        return {
            appointments,
            appointmentsFiltered,
            loading,
            loadAppointments,
            locale,
            store,
            t,
        }
    }
}
</script>

<style lang="scss" scoped>
.user-appointments-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem;
    gap: 3rem;

    h1 {
        color: $primary-text-color;
    }

    .make-an-appointment-button {
        color: $primary-color;
        font-size: 16px;
        padding: 1.5rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        border-radius: 12px;
        background-color: $accent-color;
    }

    .appointments-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
}
</style>