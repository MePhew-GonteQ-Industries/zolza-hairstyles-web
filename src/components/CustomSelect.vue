<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
<template>
  <div class="select-wrapper">
    <div
      class="select"
      tabindex="0"
      :class="[
        {
          expanded: expanded,
          'hover-enabled': selectHoverEnabled,
          invalid: invalid && (validate || forceValidate),
        },
        appearance,
      ]"
      @mousedown="toggleDropdown"
      @focus.self="expandDropdown"
      @keydown.down.prevent="selectNextOption"
      @keydown.up.prevent="selectPreviousOption"
      @keydown.tab="collapseDropdown"
      ref="select"
      @blur="validate = true"
    >
      <span
        class="header"
        :class="{ expanded: expanded, 'value-selected': selectedItem !== null }"
      >
        {{ header }}</span
      >

      <i
        class="select-icon"
        :class="currentIconClass"
        @focus.stop
        @mousedown.stop
        @mouseenter="toggleSelectHover"
        @mouseleave="toggleSelectHover"
        tabindex="-1"
        v-if="currentIconClass"
      ></i>
      <div
        class="select-text-icon"
        v-else-if="currentIconText"
      >
        {{ currentIconText }}
      </div>

      <span class="selected-value"> {{ title }}</span>

      <i
        class="ph-caret-down-light dropdown-arrow"
        :class="{ flipped: expanded }"
      ></i>
    </div>
    <div class="invalid-wrapper">
      <i
        class="ph-warning-circle-light invalid-icon"
        v-if="required && selectedItem === null && (validate || forceValidate)"
      ></i>

      <p
        class="messageInvalid messageValueEmpty"
        v-if="required && selectedItem === null && (validate || forceValidate)"
      >
        {{ messageEmpty }}
      </p>
    </div>
    <div
      class="dropdown"
      :class="{ show: expanded }"
    >
      <ol>
        <li
          v-for="(option, index) in options"
          :key="option.value"
          @click="
            changeValue(index);
            collapseDropdown();
          "
          @keydown.down="selectNextOption"
          @keydown.up="selectPreviousOption"
        >
          <span :class="{ selected: index === selectedItem }"> {{ option.title }}</span>

          <i
            :class="option.iconClass"
            v-if="option.iconClass"
          ></i>
          <div
            class="text-icon"
            v-else-if="option.iconText"
          >
            {{ option.iconText }}
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "CustomSelect",
  props: {
    selectedValue: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    messageInvalid: {
      type: String,
      required: false,
    },
    messageEmpty: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    forceValidate: {
      type: Boolean,
      default: false,
    },
    appearance: {
      type: String,
      default: "outlined",
    },
  },
  setup(props, ctx) {
    const selectedValue = ref(null);
    const selectedItem = ref(null);
    const expanded = ref(false);
    const title = ref("");
    const currentIconClass = ref(props.iconClass);
    const currentIconText = ref("");

    const select = ref(null);

    const validate = ref(false);

    function changeCurrentItem() {
      selectedValue.value = props.options[selectedItem.value].value;
      ctx.emit("update:selectedValue", selectedValue.value);
      title.value = props.options[selectedItem.value].title;
      if (props.options[selectedItem.value].iconClass) {
        currentIconClass.value = props.options[selectedItem.value].iconClass;
      } else if (props.options[selectedItem.value].iconText) {
        currentIconText.value = props.options[selectedItem.value].iconText;
      }
    }

    function toggleDropdown() {
      expanded.value = !expanded.value;
    }

    function collapseDropdown() {
      if (expanded.value) {
        expanded.value = false;
      }
    }

    function expandDropdown() {
      if (!expanded.value) {
        expanded.value = true;
      }
    }

    function changeValue(index) {
      selectedItem.value = index;
      changeCurrentItem();
    }

    onMounted(() => {
      if (props.selectedValue) {
        const currentItem = props.options.findIndex((item) => item.value === props.selectedValue);

        changeValue(currentItem);
      }
    });

    watch(
      () => props.selectedValue,
      (newValue) => {
        ctx.emit("update:selectedValue", newValue);

        const currentItem = props.options.findIndex((item) => item.value === props.selectedValue);

        changeValue(currentItem);
      },
    );

    function selectNextOption() {
      if (selectedItem.value !== null) {
        if (props.options.length > selectedItem.value + 1) {
          selectedItem.value += 1;
        }
      } else {
        selectedItem.value = 0;
      }
      changeCurrentItem();
    }

    function selectPreviousOption() {
      if (selectedItem.value !== null) {
        if (selectedItem.value - 1 >= 0) {
          selectedItem.value -= 1;
        }
      } else {
        selectedItem.value = 0;
      }
      changeCurrentItem();
    }

    const selectHoverEnabled = ref(true);

    function toggleSelectHover() {
      selectHoverEnabled.value = !selectHoverEnabled.value;
    }

    onClickOutside(select, () => {
      collapseDropdown();
    });

    return {
      expanded,
      toggleDropdown,
      collapseDropdown,
      changeValue,
      title,
      currentIconClass,
      currentIconText,
      expandDropdown,
      selectNextOption,
      selectedItem,
      selectPreviousOption,
      toggleSelectHover,
      selectHoverEnabled,
      select,
      validate,
    };
  },
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  height: 75px;
  width: 408px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 0.5rem;

  @media only screen and (max-width: $xs) {
    width: 330px;
  }

  .invalid-wrapper {
    height: calc(20px - 0.5rem);
    margin: 0 0.1rem;
    display: flex;
    align-items: center;
    gap: 5px;
    transform: translate3d(0, 0, 0);

    .invalid-icon {
      position: static;
      font-size: 1.3rem;
      color: $error-color;
    }

    .messageInvalid {
      font-size: 0.6rem;
      color: $error-color;
    }
  }

  .select {
    position: relative;
    outline: none;
    border: 2px solid transparent;
    background-color: $primary-color;
    height: 55px;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all $transition-duration;

    &.invalid {
      border-color: $error-color;
      box-shadow: 0 0 10px 1px $error-color-low;
    }

    &.outlined {
      background-color: transparent;

      &:not(:focus, :hover, .invalid) {
        border-color: $primary-text-color;
      }
    }

    &.hover-enabled:hover:not(.expanded) {
      border-color: $accent-color;
      box-shadow: none;
    }

    &.expanded {
      border-color: $accent-color;
      background-color: $secondary-color;
      box-shadow: 0 0 10px 1px $accent-color;
      border-radius: 15px 15px 0 0;
      border-width: 2px;
    }

    .header {
      position: absolute;
      transform-origin: 0 0;
      user-select: none;
      color: $primary-text-color;

      &.expanded,
      &.value-selected {
        color: $accent-color;
      }

      &.value-selected {
        transform: translateY(-0.6em) scale(0.8);
      }
    }

    i {
      font-size: 2rem;
    }

    .select-icon,
    .select-text-icon {
      position: absolute;
      left: 1.5rem;
      cursor: default;
    }

    .select-text-icon {
      font-size: 1.5rem;
    }

    .selected-value {
      padding-top: 20px;
      position: absolute;
      backface-visibility: hidden;
      transform-origin: 0 0;
      color: $secondary-text-color;
      font-size: 0.875em;
      font-weight: 600;
    }

    .dropdown-arrow {
      position: absolute;
      right: 30px;
      user-select: none;
      // transform: rotateZ(180deg);

      &.flipped {
        transform: rotateZ(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    margin-top: 55px;
    width: 408px;
    z-index: 1;
    border-radius: 0 0 0.5rem 0.5rem;
    border-width: 0;
    border-style: solid;
    border-color: transparent;
    background-color: $secondary-color;
    box-shadow: none;
    max-height: 0;
    overflow: hidden;

    @media only screen and (max-width: $xs) {
      width: 330px;
    }

    @keyframes expand {
      from {
        max-height: 0;
      }

      to {
        max-height: 200px;
        // overflow-y: auto;
      }
    }

    &.show {
      animation: expand 0.6s forwards;
      border-color: $accent-color;
      box-shadow: 0 0 10px 1px $accent-color;
      border-width: 2px;
    }

    ol {
      list-style-type: none;

      li {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        &:hover,
        &:focus {
          background-color: $primary-color;
          color: $secondary-text-color;
        }

        span {
          position: absolute;
          left: 30px;

          &.selected {
            color: $secondary-text-color;
          }
        }

        i,
        .text-icon {
          position: absolute;
          right: 30px;
          font-size: 2rem;
        }

        .text-icon {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
