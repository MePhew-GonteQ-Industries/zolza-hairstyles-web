<template>
  <teleport to="body">
    <div
      class="modal"
      :class="{ open: open }"
      ref="modal"
      @click.self="handleModalClick"
      @keyup.esc="handleModalClick"
    >
      <div class="modal-content" :class="{ shake: shake }">
        <div class="header">
          <div class="title"><slot name="title" /></div>
          <i class="ph-x-light close-icon"></i>
        </div>
        <div class="body">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CustomModal',
  props: {
    open: {
      type: Boolean,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    const shake = ref(false);

    const handleModalClick = () => {
      if (!props.persistent) {
        emit('update:open', false);
      } else {
        shake.value = true;
        setTimeout(() => {
          shake.value = false;
        }, 1000);
      }
    };

    return {
      handleModalClick,
      shake,
    };
  },
};
</script>

<style lang='scss' scoped>
.modal {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 900;
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;

  &.open {
    visibility: visible;

    .modal-content {
      transform: scale(1);
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  .modal-content {
    transform: scale(0);
    background-color: $primary-color;
    color: $secondary-text-color;
    border-radius: 0.313rem;
    box-shadow: 0 0 8px -2px $box-shadow-color;
    display: grid;
    grid-template-rows: 50px auto;
    max-width: 50vw;

    &.shake {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    .header {
      border-bottom: 1px solid $secondary-color;
      display: grid;
      grid-template-columns: auto 30px;
      align-items: center;
      padding: 0.5rem;

      .close-icon {
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: $accent-color;
        }
      }
    }

    .body {
      padding: 0.5rem;
    }
  }
}
</style>
