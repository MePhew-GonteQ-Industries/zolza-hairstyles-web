<template>
  <div class="select-wrapper">
    <div class="select" tabindex="0"
      :class="{ expanded: expanded, 'hover-enabled': selectHoverEnabled,
      invalid: invalid && (validate || forceValidate) }"
      @mousedown="toggleDropdown"
      @focus.self="expandDropdown"
      @keydown.down.prevent="selectNextOption"
      @keydown.up.prevent="selectPreviousOption"
      @keydown.tab="collapseDropdown"
      ref="select"
      @blur="validate = true">

      <span class="header"
      :class="{ expanded: expanded, 'value-selected': selectedItem !== null}">
      {{ header }}</span>

      <span class="selected-value">
      {{ title }}</span>

      <i class="ph-caret-down-light dropdown-arrow"
      :class="{ flipped: !expanded }"></i>

      <i class="select-icon" :class="currentIconClass"
      @focus.stop
      @mousedown.stop
      @mouseenter="toggleSelectHover"
      @mouseleave="toggleSelectHover" tabindex="-1"></i>

    </div>
    <div v-show="(validate || forceValidate) && invalid" class="invalid-wrapper">
      <i class="ph-warning-circle-light invalid-icon"></i>

      <p class="messageInvalid messageValueEmpty"
      v-if="required && selectedItem === null">{{ messageEmpty }}</p>

    </div>
    <div class="dropdown" :class="{ show: expanded }">
      <ol>
        <li v-for="(option, index) in options" :key="option.value"
        @click="changeValue(index); collapseDropdown();"
        @keydown.down="selectNextOption"
        @keydown.up="selectPreviousOption">

          <span :class="{ selected: index === selectedItem }">
          {{ option.title }}</span>

          <i :class="option.iconClass"></i>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

export default {
  name: 'CustomSelect',
  props: {
    header: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    initialItem: {
      type: Number,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    messageInvalid: {
      type: String,
      required: true,
    },
    messageEmpty: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: true,
    },
    forceValidate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const selectedValue = ref(null);
    const selectedItem = ref(null);
    const expanded = ref(false);
    const title = ref('');
    const currentIconClass = ref(props.iconClass);

    const select = ref(null);

    const validate = ref(false);

    function changeCurrentItem() {
      selectedValue.value = props.options[selectedItem.value].value;
      ctx.emit('update:selected-value', selectedValue.value);
      currentIconClass.value = props.options[selectedItem.value].iconClass;
      title.value = props.options[selectedItem.value].title;
    }

    onMounted(() => {
      if (props.initialItem) {
        selectedValue.value = props.options[props.initialItem].value;
        changeCurrentItem();
      }
    });

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
      selectedValue,
      expanded,
      toggleDropdown,
      collapseDropdown,
      changeValue,
      title,
      currentIconClass,
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

<style lang='scss' scoped>
.select-wrapper {
  position: relative;
  height: 55px;
  width: 50vw;
  min-width: 200px;
  max-width: 380px;

  .invalid-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    margin: .5rem 1rem;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    transform: translate3d(0, 0, 0);

    .invalid-icon {
      position: static;
      font-size: 2rem;
      color: $color-danger;
    }

    .messageInvalid {
      color: $color-danger;
    }
  }

  .select {
    position: relative;
    outline: none;
    border: 2px solid transparent;
    background-color: $primary-color;
    height: 100%;
    width: 100%;
    border-radius: .5rem;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all $transition-duration;

  &.invalid {
    border-color: $color-invalid;
    box-shadow: 0 0 10px 1px $color-invalid;
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
    left: 30px;
    transform-origin: 0 0;
    user-select: none;
    color: $primary-text-color;

    &.expanded, &.value-selected {
      color: $accent-color;
    }

    &.value-selected {
      transform: translateY(-0.6em) scale(0.8);
    }
  }

  i {
    font-size: 2rem;
  }

  .select-icon {
    position: absolute;
    right: 30px;
    cursor: default;
  }

  .selected-value {
    padding-top: 20px;
    position: absolute;
    left: 30px;
    backface-visibility: hidden;
    transform-origin: 0 0;
    color: $secondary-text-color;
    font-size: .8em;
    font-weight: 600;
  }

    .dropdown-arrow {
      position: absolute;
      user-select: none;

      &.flipped {
      transform: rotateZ(180deg);
      }
    }
}

    .dropdown {
      position: absolute;
      margin-top: 10px;
      width: 100%;
      z-index: 1;
      border-radius: 0 0 .5rem .5rem;
      border-width: 0;
      border-style: solid;
      border-color: transparent;
      background-color: $secondary-color;
      box-shadow: none;
      max-height: 0;
      overflow: hidden;

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
        animation: expand .6s forwards;
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

          &:hover, &:focus {
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

          i {
            position: absolute;
            right: 30px;
            font-size: 2rem;
          }
        }
      }
    }
}

</style>
