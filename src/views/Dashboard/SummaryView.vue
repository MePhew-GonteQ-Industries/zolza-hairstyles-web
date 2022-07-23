<template>
  <section class="dashboard-page" id="summary-view-page" ref="summaryViewPage">
    <h2>Podsumowanie miesiąca</h2>
    <div class="month-summary-tiles">
      <div class="month-summary-tile">
        <div class="tile-icons">
          <i class="ph-credit-card-light tile-icon"></i>
          <i class="ph-info-light more-info"></i>
        </div>
        <p class="tile-value">143 PLN</p>
        <p class="tile-description">Szacowany przychód</p>
      </div>
      <div class="month-summary-tile">
        <div class="tile-icons">
          <i class="ph-bookmarks-light tile-icon"></i>
          <i class="ph-info-light more-info"></i>
        </div>
        <p class="tile-value">127</p>
        <p class="tile-description">Umówionych wizyt</p>
      </div>
      <div class="month-summary-tile">
        <div class="tile-icons">
          <i class="ph-user-plus-light tile-icon"></i>
          <i class="ph-info-light more-info"></i>
        </div>
        <p class="tile-value">46</p>
        <p class="tile-description">Nowych użytkowników</p>
      </div>
      <div class="month-summary-tile">
        <div class="tile-icons">
          <i class="ph-user-plus-light tile-icon"></i>
          <i class="ph-info-light more-info"></i>
        </div>
        <p class="tile-value">21</p>
        <p class="tile-description">Zweryfikowanych użytkowników</p>
      </div>
    </div>
    <div class="main-summary">
      <aside class="left">
        <div class="month-summary-tile">
          <div class="tile-icons">
            <i class="ph-user-plus-light tile-icon"></i>
            <i class="ph-info-light more-info"></i>
          </div>
          <p class="tile-value">46</p>
          <p class="tile-description">Nowych użytkowników</p>
        </div>
      </aside>
      <aside class="right">
        <apexcharts
          class="chart"
          width="100%"
          height="300"
          type="line"
          toolbar="false"
          :options="chartOptions"
          :series="series">
        </apexcharts>
      </aside>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { getCssPropertyValue } from '@/utils';

export default {
  name: 'SummaryView',
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const summaryViewPage = ref(null);

    const chartOptions = reactive({
      title: {
        text: 'Liczba wizyt',
        align: 'left',
        margin: 10,
        offsetX: 10,
        offsetY: 10,
        floating: false,
        style: {
          fontSize: '1rem',
          fontWeight: 'bold',
          fontFamily: 'Poppins, Sans-Serif',
        },
      },
      stroke: {
        curve: 'smooth',
      },
      chart: {
        zoom: {
          enabled: false,
        },
        foreColor: '#B3B1B5',
        background: '#fff',
        toolbar: {
          show: false,
        },
      },
      legend: {
        labels: {
          useSeriesColors: true,
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#202020',
          shadeTo: 'dark',
          shadeIntensity: 0.65,
        },
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });

    const series = [{
      name: 'Wizyty',
      data: [3, 4, 3, 5, 4, 6, 7, 9, 12],
    }];

    onMounted(() => {
      const accentColor = getCssPropertyValue('--accent-color').trim();
      const secondaryColor = getCssPropertyValue('--secondary-color').trim();
      const foreColor = getCssPropertyValue('--primary-text-color').trim();

      chartOptions.theme.monochrome.color = accentColor;
      chartOptions.chart.foreColor = foreColor;
      chartOptions.chart.background = secondaryColor;
      chartOptions.title.style.color = accentColor;
    });

    return {
      summaryViewPage,
      chartOptions,
      series,
    };
  },
};
</script>

<style lang="scss">
.apexcharts-svg {
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: content-box;
}
</style>

<style lang="scss" scoped>
#summary-view-page {
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.month-summary-tiles {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.month-summary-tile {
  height: 200px;
  width: 200px;
  border-radius: 15%;
  background-color: $secondary-color;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  .tile-icons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .tile-icon {
      color: $accent-color;
      padding: .8rem;
      font-size: 1.8rem;
      background-color: $primary-color;
      border-radius: 100%;
    }

    .more-info {
      padding: .8rem;
      font-size: 1.8rem;
      background-color: $primary-color;
      color: $accent-text-color;
      border-radius: 100%;
      cursor: pointer;
    }
  }

  .tile-value {
    color: $accent-color;
    font-size: 1.625rem;
    font-weight: 600;
  }

  .tile-description {
    font-size: .938rem;
  }
}

.main-summary {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
