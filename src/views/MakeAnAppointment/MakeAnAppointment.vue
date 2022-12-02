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
                <template #title>{{ selecetedService.name }}</template>
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
                    </div>
                    <div class="buttons-wrapper">
                        <CustomButton type="info" @click="openMakeAnAppointmentModal = false">Umów
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
        const selecetedService = ref(null);
        const selectedDate = ref(new Date());

        const selectedDateFormatted = computed(() => selectedDate.value.toISOString().split("T")[0]);


        const chooseService = (service) => {
            // console.log(service);
            selecetedService.value = service;
            openMakeAnAppointmentModal.value = true;
        };

        watch(selectedDateFormatted, async (newDate) => {
            console.log(newDate);
        });

        onMounted(async () => {
            try {
                const response = await axios.get("services");
                servicesData.value = response.data;
            } catch (error) {
                handleRequestError(error);
            }
            loading.value = false;
            console.log(servicesData.value);
        });

        return {
            t,
            loading,
            servicesData,
            chooseService,
            openMakeAnAppointmentModal,
            selecetedService,
            selectedDate,
            selectedDateFormatted,
        }
    }
}
</script>

<style lang="scss" scoped>
.make-an-appointment-page {
    display: flex;
    width: 100%;

    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
    }

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
</style>
