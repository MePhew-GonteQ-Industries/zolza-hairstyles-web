<template>
    <div class="make-an-appointment-page">
        <div class="services-tiles" v-if="!loading">
            <div class="service-tile" v-for="service in servicesData" :key="service.id" @click="chooseService(service)">
                <h3>{{ service.name }}</h3>
                <p>
                    {{ t("home.serviceTile.time") }} <span>~ {{ service.average_time_minutes
                    }}min</span>
                </p>
                <p>{{ t("home.serviceTile.price") }} <span>{{ service.min_price }}<span
                            v-if="service.max_price && service.max_price !== service.min_price"> ~
                            {{ service.max_price
                            }}</span>zł</span>
                </p>
            </div>
            <CustomModal v-model:open="openMakeAnAppointmentModal">
                <template #title>{{ selectedService.name }}</template>
                <div class="make-appointment-modal-wrapper">
                    <MessageBox type="info">
                        <template #title>
                            Maksymalnie miesiąc do przodu!
                        </template>
                        <template #subtitle>
                            Umówioną wizytę może anulować tylko administrator!
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
                                    {{ new Date(`${availableSlot.start_time}Z`).toLocaleTimeString(locale, {
                                            hour:
                                                "2-digit", minute: "2-digit",
                                        })
                                    }}
                                </div>
                            </div>
                            <div class="no-slots" v-if="!validatedSlots.length && !loadingSlots">
                                Brak wolnych miejsc
                            </div>
                        </div>
                    </div>
                    <div class="buttons-wrapper">
                        <CustomButton type="info" @click="makeAppointment">Umów
                            wizytę</CustomButton>
                        <CustomButton type="secondary" @click="openMakeAnAppointmentModal = false">
                            Anuluj</CustomButton>
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
import "v-calendar/dist/style.css";
import { useStore } from 'vuex';

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
                openMakeAnAppointmentModal.value = false;
            } catch (error) {
                handleRequestError(error);
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

        onMounted(async () => {
            try {
                const response = await axios.get("services");
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
        display: flex;
        flex-wrap: wrap;
        width: 55vw;
        margin-left: auto;
        margin-right: auto;
        gap: 1rem;
        padding: 15px 0 15px 0;

        .service-tile {
            width: 45%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            color: $primary-text-color;
            border: 2px solid $primary-text-color;
            border-radius: 12px;
            transition: ease-in-out .3s;

            &:hover {
                cursor: pointer;
                border: 2px solid $accent-color;

                h3 {
                    color: $accent-color;
                }
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

        .hours {
            margin-left: 10px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;

            .slots-wrapper {
                display: flex;
                flex-wrap: wrap;
                gap: .5rem;

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
