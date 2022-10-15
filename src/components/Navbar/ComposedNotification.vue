<template>
  <div class="notification-wrapper">
    <h3 class="notification">{{ notificationTitle }}</h3>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ComposedNotification",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const notificationTitle = ref(props.title);

    return { notificationTitle };
  },
};
</script>

<style lang="scss" scoped>
.notification-wrapper {
  width: calc(50vw - 40px);
  min-width: 360px;
  max-width: 450px;

  .notification {
    padding: 10px;
    border-bottom: 1px solid #363b41;
  }
}
</style>
