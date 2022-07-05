<template>
  <div class="navigation-wrapper">
    <div class="tab-selector">
      <button class="tab">Wizyty</button>
      <button class="tab">Usługi</button>
      <button class="tab">Użytkownicy</button>
      <button class="tab">Godziny pracy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardNavigation',
};
</script>

<style lang="scss" scoped>
.tab-selector {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid #363b41;

    .tab {
        font-size: 1rem;
        background-color: transparent;
        border: none;
        color: grey;
        cursor: pointer;
        position: relative;

        &.active {
          color: white
        }

        &.active::after {
          content: '';
          position: absolute;
          bottom: -21px;
          height: 1px;
          width: 100%;
          background-color: #43C2FC;
          left: 0;
          transition: transform 500ms;
        }
      }
}
</style>>
