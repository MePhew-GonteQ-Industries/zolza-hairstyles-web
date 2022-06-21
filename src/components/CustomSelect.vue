<template>
  <div class="select-wrapper">
    <div class="select" tabindex="0"
      :class="{ expanded: expanded, 'hover-enabled': selectHoverEnabled,
      invalid: invalid && validate}"
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

      <img src="@/assets/arrow-down.svg" alt="dropdown-arrow"
        class="dropdown-arrow"
        :class="{ flipped: !expanded }"/>

      <img class="select-icon" :src="currentIconSrc" alt="select icon"
      @focus.stop
      @mousedown.stop
      @mouseenter="toggleSelectHover"
      @mouseleave="toggleSelectHover" tabindex="-1">

    </div>
    <div v-show="invalid && validate" class="invalid-wrapper">
      <img class="invalid-icon"
      src="@/assets/exclamation-mark.svg" alt="">

      <p class="messageInvalid messageValueEmpty"
      v-if="invalid">{{ messageEmpty }}</p>

      <p class="messageInvalid messageValueInvalid"
      v-if="invalid && !(required && !selectedItem)">{{ messageInvalid }}</p>

    </div>
    <div class="dropdown" :class="{ show: expanded }">
      <ol>
        <li v-for="(option, index) in options" :key="option.value"
        @click="changeValue(index); collapseDropdown();"
        @keydown.down="selectNextOption"
        @keydown.up="selectPreviousOption">

          <span :class="{ selected: index === selectedItem }">
          {{ option.title }}</span>

          <img :src="option.iconSrc" :alt="option.iconAlt">
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
    iconSrc: {
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
  },
  setup(props, ctx) {
    const selectedValue = ref(null);
    const selectedItem = ref(null);
    const expanded = ref(false);
    const title = ref('');
    const currentIconSrc = ref(props.iconSrc);

    const select = ref(null);

    const validate = ref(false);

    function changeCurrentItem() {
      selectedValue.value = props.options[selectedItem.value].value;
      ctx.emit('update:selected-value', selectedValue.value);
      currentIconSrc.value = props.options[selectedItem.value].iconSrc;
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
      currentIconSrc,
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
  color: $accent-text-color;
  position: relative;
  margin-bottom: 45px;

  .invalid-wrapper {
    position: absolute;
    margin-top: 8px;
    top: 100%;
    left: 8px;
    display: flex;
    flex-direction: row;
    gap: 15px;

    .invalid-icon {
      position: static;
      width: 25px;
      height: 25px;
      }

    .messageInvalid {
      color: $color-danger;
    }
  }

  .select {
    position: relative;
    outline: none;
    border: 2px solid transparent;
    background-color: $element-bg-color;
    height: 65px;
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

  &.invalid {
    border-color: $border-color-invalid;
    box-shadow: 0 0 0px 3px $box-shadow-color-invalid;
  }

  &.hover-enabled:hover:not(.expanded) {
    border-color: $border-color-hover-primary;
    box-shadow: none;
  }

  &.expanded {
    border-color: $border-color-active-primary;
    background-color: $element-bg-color-active;
    box-shadow: 0 0 0 3px #274b6d;
    border-radius: 15px 15px 0 0;
    border-width: 2px;
  }

  .header {
    position: absolute;
    left: 30px;
    transform-origin: 0 0;
    transition: transform .6s;
    user-select: none;

    &.expanded, &.value-selected {
      color: $text-color-element-active;
    }

    &.value-selected {
      transform: translateY(-0.6em) scale(0.8);
    }
  }

  .select-icon {
    position: absolute;
    right: 30px;
    width: 30px;
    height: 30px;
    cursor: default;
  }

  .selected-value {
    padding-top: 20px;
    color: $accent-text-color;
    position: absolute;
    left: 30px;
    transition: all 0.5s;
    backface-visibility: hidden;
    transform-origin: 0 0;
    color: $primary-text-color;
    font-size: .8em;
  }

    .dropdown-arrow {
      position: absolute;
      transition: all .5s;
      user-select: none;

      &.flipped {
      transform: rotateZ(180deg);
      }
    }
}

    .dropdown {
      position: absolute;
      margin-top: 10px;
      width: 50vw;
      min-width: 250px;
      max-width: 420px;
      z-index: 1;
      border-radius: 0 0 15px 15px;
      border-width: 0;
      border-style: solid;
      border-color: transparent;
      background-color: $element-bg-color;
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
        border-color: $border-color-active-primary;
        background-color: $element-bg-color-active;
        box-shadow: 0 0 0 3px #274b6d;
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
          transition: color 400ms, background-color 400ms;

          span {
            position: absolute;
            left: 30px;

            &.selected {
              color: $primary-text-color;
            }
          }

          img {
            width: 30px;
            height: 30px;
            position: absolute;
            right: 30px;
          }

          &:focus {
            outline: none;
          }

          &:hover, &:focus {
            background-color: $element-bg-color;
            color: rgb(196, 196, 196);
          }
        }
      }
    }
}

</style>
