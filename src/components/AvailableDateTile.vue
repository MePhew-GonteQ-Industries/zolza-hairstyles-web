<template>
<div class="available-date" ref="availableDate">

  <div class="date">
    <p class="day">{{ day }}</p>
    <p class="time">{{ time }}</p>
  </div>

  <div class="buttons">

    <div class="button make-appointment">
      <i class="ph-calendar-plus-light"></i>Umów wizytę
    </div>

    <div class="button more-info">
      <i class="ph-info-light"></i>Więcej informacji
    </div>

  </div>

</div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AvailableDateTile',
  props: {
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  setup() {
    const availableDate = ref(null);
    const color = Math.floor(Math.random() * 16777215).toString(16);

    onMounted(() => {
      availableDate.value.style.setProperty('--color', `#${color}`);
    });

    return {
      availableDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.available-date {
  --color: none;
  $color: var(--color);

  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100px;
  gap: 1rem;

  .date {
      background-color: $color;
      border-radius: 1rem;
      padding: 10px;
      font-size: 1.125rem;
      letter-spacing: .5px;
      font-weight: 500;
      height: 60px;
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;

    .button {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      i {
        font-size: 28px;
      }
    }
  }
}
</style>
