<template>
    <div class="make-an-appointment-page">
        <div class="services-tiles">
            <div class="service-tile" v-for="service in servicesData" :key="service.id" @click="chooseService(service)">
                <h3>{{ service.name }}</h3>
                <p>
                    {{ t("home.serviceTile.time") }} <span>~ {{ service.average_time_minutes }}min</span>
                </p>
                <p>{{ t("home.serviceTile.price") }} <span>{{ service.min_price }}<span
                            v-if="service.max_price && service.max_price !== service.min_price">~ {{ service.max_price
                            }}</span>zł</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from "vue";
import axios from 'axios';
import { handleRequestError } from "@/utils";

export default {
    setup() {
        const { t } = useI18n({ useScope: "global" });
        const loading = ref(true);
        const servicesData = ref(null);

        const chooseService = (service) => {
            console.log(service);
        };

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
        }
    }
}
</script>

<style lang="scss" scoped>
.make-an-appointment-page {
    display: flex;
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
            border: 2px solid $box-shadow-color;
            border-radius: 12px;
        }
    }
}
</style>