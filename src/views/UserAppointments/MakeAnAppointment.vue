<template>
    <div class="make-an-appointment-page">
        <div class="services-tiles" v-if="!loading">
            <div class="service-tile" v-for="service in servicesData" :key="service.id" @click="chooseService(service)">
                <h3>{{ service.name }}</h3>
                <p>
                    {{ t("home.serviceTile.time") }} <span>~ {{
                        service.average_time_minutes
                    }}min</span>
                </p>
                <p>{{ t("home.serviceTile.price") }} <span>{{ service.min_price }}<span
                            v-if="service.max_price && service.max_price !== service.min_price"> ~
                            {{
                                service.max_price
                            }}</span>zł</span>
                </p>
            </div>
            <CustomModal v-model:open="openMakeAnAppointmentModal">
                <template #title>{{ selectedService.name }}</template>
                <div class="make-appointment-modal-wrapper">
                    <MessageBox type="warning">
                        <template #title>
                            {{ t('userAppointmentsView.makeAnAppointment.monthForward') }}!
                        </template>
                        <template #subtitle>
                            {{ t('userAppointmentsView.makeAnAppointment.adminCancel') }}!
                        </template>
                    </MessageBox>
                    <div class="select-date-wrapper">
                        <DatePicker :is-dark="$store.state.settings.theme === 'dark'" is-required color="green"
                            mode="date" v-model="selectedDate" />
                        <div class="hours">
                            <CustomLoader v-if="loadingSlots" class="loader"></CustomLoader>
                            <div class="slots-wrapper" v-if="validatedSlots.length && !loadingSlots">
                                <div class="single-hour" v-for="availableSlot in validatedSlots" :key="availableSlot.id"
                                    @click="selectAppointmentHour(availableSlot)"
                                    :class="{ 'selected': availableSlot.id === selectedSlotId }">
                                    {{
                                        new
                                                                        Date(availableSlot.start_time).toLocaleTimeString(locale,
                                            {
                                                hour:
                                                    "2-digit", minute: "2-digit",
                                            })
                                    }}
                                </div>
                            </div>
                            <div class="no-slots" v-if="!validatedSlots.length && !loadingSlots">
                                {{ t('userAppointmentsView.makeAnAppointment.noSlots') }}
                            </div>
                        </div>
                    </div>
                    <div class="buttons-wrapper">
                        <CustomButton type="info" @click="makeAppointment">{{
                            t('userAppointmentsView.makeAnAppointment.makeAnAppointment')
                        }}</CustomButton>
                        <CustomButton type="secondary" @click="closeMakeAnAppointmentModal">
                            {{
    t('userAppointmentsView.makeAnAppointment.cancel')
                            }}</CustomButton>
                    </div>
                </div>
            </CustomModal>
        </div>
        <div class="loader" v-else>
            <CustomLoader></CustomLoader>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch, computed } from "vue";
import axios from 'axios';
import { handleRequestError } from "@/utils";
import CustomModal from '@/components/CustomModal.vue';
import CustomLoader from "@/components/CustomLoader.vue";
import CustomButton from "@/components/CustomButton.vue";
import MessageBox from '@/components/MessageBox.vue'
import { DatePicker } from "v-calendar";
import { useRouter } from 'vue-router';
import "v-calendar/dist/style.css";
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';

export default {
    components: {
        CustomButton,
        CustomModal,
        CustomLoader,
        MessageBox,
        DatePicker,
    },
    setup() {
        const { t } = useI18n({ useScope: "global" });
        const loading = ref(true);
        const servicesData = ref(null);
        const openMakeAnAppointmentModal = ref(false);
        const selectedService = ref(null);
        const selectedDate = ref(new Date());
        const loadingSlots = ref(true);
        const availableSlots = ref([]);
        const store = useStore();
        const selectedSlotId = ref(null);
        const message = useMessage();
        const router = useRouter();

        const locale = store.state.settings.language;

        const selectedDateFormatted = computed(() => selectedDate.value.toISOString().split("T")[0]);

        const validatedSlots = computed(() => {
            const requiredSlots = selectedService.value.required_slots;

            const slots = [];

            for (let i = 0; i < availableSlots.value.length; i++) {
                let slot = availableSlots.value[i];
                let currentSlotFits = 0;

                if (i + requiredSlots <= availableSlots.value.length) {
                    for (let j = i; j < (i + requiredSlots); j++) {
                        let innerSlot = availableSlots.value[j];

                        if (innerSlot.occupied) break;
                        if (innerSlot.reserved) break;
                        if (innerSlot.holiday) break
                        if (innerSlot.sunday) break;
                        if (innerSlot.break_time) break;
                        if (currentSlotFits === requiredSlots) break;
                        currentSlotFits++;
                    }
                    if (currentSlotFits === requiredSlots) {
                        slots.push(slot);
                    }
                }
            }
            return slots;
        });

        const selectAppointmentHour = (availableSlot) => {
            selectedSlotId.value = availableSlot.id;
        }

        const chooseService = (service) => {
            selectedService.value = service;
            openMakeAnAppointmentModal.value = true;
        };

        watch(selectedDateFormatted, async (newDate) => {
            loadingSlots.value = true;
            await loadAvailableTimeSlots(newDate);
        });

        const makeAppointment = async () => {
            try {
                await axios.post(`appointments`, {
                    first_slot_id: selectedSlotId.value,
                    service_id: selectedService.value.id,
                });
                selectedSlotId.value = null;
                selectedDate.value = new Date;
                openMakeAnAppointmentModal.value = false;
                router.push({ name: 'appointmentsList' });
                message.success(t('snackBars.appointmentMade'));
            } catch (error) {
                const errorResponse = handleRequestError(error);
                message.error(`${t('snackBars.appointmentsMadeError')} ${errorResponse.status}, ${errorResponse.data.detail}`);
            }
        };

        const loadAvailableTimeSlots = async (date) => {
            try {
                const response = await axios.get(`appointments/slots?date=${date}`);
                availableSlots.value = response.data;
                loadingSlots.value = false;
            } catch (error) {
                handleRequestError(error);
            }
        }

        const closeMakeAnAppointmentModal = () => {
            selectedSlotId.value = null;
            selectedDate.value = new Date;
            openMakeAnAppointmentModal.value = false;
        }

        onMounted(async () => {
            try {
                const response = await axios.get("services", {
                    headers: {
                        'accept-language': store.state.settings.language,
                    }
                });
                servicesData.value = response.data;
            } catch (error) {
                handleRequestError(error);
            }
            loading.value = false;
            await loadAvailableTimeSlots(selectedDateFormatted.value);
        });

        return {
            t,
            loading,
            servicesData,
            chooseService,
            openMakeAnAppointmentModal,
            selectedService,
            selectedDate,
            selectedDateFormatted,
            loadingSlots,
            validatedSlots,
            availableSlots,
            loadAvailableTimeSlots,
            locale,
            selectAppointmentHour,
            selectedSlotId,
            makeAppointment,
            message,
            closeMakeAnAppointmentModal,
        }
    }
}
</script>

<style lang="scss" scoped>
.make-an-appointment-page {
    display: flex;
    justify-content: center;
    width: 100%;

    .services-tiles {
        grid-template-columns: repeat(2, 1fr);
        padding: 2.5rem 10%;
        color: black;
        display: grid;
        gap: 2rem;
        transition: all 1s;

        @media only screen and (min-width: $lg) {
            & {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media only screen and (max-width: $sm) {
            & {
                grid-template-columns: 1fr;
            }
        }

        .service-tile {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            color: $secondary-text-color;
            background-color: $background-accent-low;
            border: 1px solid $background-accent-medium;
            border-radius: .375rem;
            transition: ease-in-out .6s;
            padding: 1rem;

            &:hover {
                cursor: pointer;
                background-color: $alternative-accent-color;
            }
        }
    }
}

.make-appointment-modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .select-date-wrapper {
        display: flex;

        @media only screen and (max-width: $sm) {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .hours {
            margin-left: 10px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;

            .slots-wrapper {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: .5rem;

                @media only screen and (max-width: $sm) {
                    grid-template-columns: repeat(3, 1fr);
                }

                .single-hour {
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid $secondary-color;
                    width: 90px;
                    border-radius: 12px;
                    cursor: pointer;

                    &:hover {
                        color: $accent-color;
                        background-color: $background-accent-low;
                    }

                    &:active,
                    &.selected {
                        color: $accent-color;
                        border-color: $accent-color;
                    }
                }
            }

            .no-slots {
                color: $error-color;
            }
        }
    }

    .buttons-wrapper {
        display: flex;
        gap: 1rem;
    }
}

.loader {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
