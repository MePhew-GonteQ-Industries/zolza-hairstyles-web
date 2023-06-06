<template>
  <teleport to="body">
    <Transition v-if="modalOpen" appear>
      <FocusTrap :active="true" :escapeDeactivates="false" :initial-focus="$refs.modal">
        <div
          ref="modal"
          class="modal"
          :class="{ open: modalOpen, closing: closing }"
          @click.self="handleModalClick"
          @keyup.esc="handleModalClose"
          tabindex="0"
        >
          <div ref="modalContent" class="modal-content" :class="{ shake: shake }">
            <div class="header">
              <div class="title">
                <slot name="title" />
              </div>
              <i
                class="ph-x-light close-icon"
                v-if="!persistent"
                @click="closeModal"
                @keyup.enter="closeModal"
              ></i>
            </div>
            <div class="body">
              <slot />
            </div>
          </div>
        </div>
      </FocusTrap>
    </Transition>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { FocusTrap } from "focus-trap-vue";

export default {
  name: "CustomModal",
  components: {
    FocusTrap,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const shake = ref(false);
    const closing = ref(false);

    const modalOpen = ref(false);

    const closeModal = () => {
      closing.value = true;
      emit("update:open", false);
      setTimeout(() => {
        modalOpen.value = false;
        closing.value = false;
      }, 400);
    };

    watch(
      () => props.open,
      (newValue) => {
        if (newValue) {
          modalOpen.value = true;
        } else {
          closeModal();
        }
      }
    );

    const shakeModal = () => {
      shake.value = true;
      setTimeout(() => {
        shake.value = false;
      }, 1000);
    };

    const handleModalClick = () => {
      if (props.closeOnClickOutside && !props.persistent) {
        closeModal();
      } else {
        shakeModal();
      }
    };

    const handleModalClose = () => {
      if (!props.persistent) {
        closeModal();
      } else {
        shakeModal();
      }
    };

    return {
      modalOpen,
      handleModalClick,
      handleModalClose,
      shake,
      closing,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  &.open {
    visibility: visible;

    .modal-content {
      transform: scale(1);
    }

    &.v-enter-from {
      .modal-content {
        transform: scale(0);
      }
    }

    &.closing {
      .modal-content {
        transform: scale(0);
      }
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
    z-index: 1000;
    max-height: 80%;
    overflow: auto;

    @media only screen and (max-width: $xs) {
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      max-width: 92vw;
    }

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
      gap: 1rem;

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
      padding: 1rem;
    }
  }
}
</style>
