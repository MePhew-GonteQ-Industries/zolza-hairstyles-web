<template>
  <section class="dashboard-page" id="summary-view-page">
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
    </div>
    <div class="main-summary">
      <aside class=""></aside>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SummaryView',
};
</script>

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
</style>
