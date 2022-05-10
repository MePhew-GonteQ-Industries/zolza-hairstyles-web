<template>
  <div class="select-wrapper">
    <div class="select" tabindex="0"
      :class="{ expanded: expanded, 'hover-enabled': selectHoverEnabled,
      invalid: invalid}"
      @mousedown="toggleDropdown"
      @focus.self="expandDropdown"
      @keydown.down="selectNextOption"
      @keydown.up="selectPreviousOption"
      @keydown.tab="collapseDropdown"
      ref="select">
      <span class="header"
      :class="{ expanded: expanded, 'value-selected': selectedItem !== null}">
      {{ header }}</span>
      <span class="selected-value">
      {{ title }}</span>
      <img src="@/assets/arrow-down.svg" alt="dropdown-arrow"
        class="dropdown-arrow"
        :class="{ flipped: !expanded }">
      <img class="select-icon" :src="currentIconSrc" alt="select icon"
      @focus.stop
      @mousedown.stop
      @mouseenter="toggleSelectHover"
      @mouseleave="toggleSelectHover" tabindex="-1">
      <img v-show="invalid" class="invalid-icon"
      src="@/assets/exclamation-mark.svg" alt="">
    </div>
    <div class="dropdown" :class="{ show: expanded }">
      <ol>
        <li v-for="(option, index) in options" :key="option.value"
        @click="changeValue(index); collapseDropdown()"
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
    placeholder: {
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
  },
  setup(props, ctx) {
    const selectedValue = ref(null);
    const selectedItem = ref(null);
    const expanded = ref(false);
    const title = ref('');
    const currentIconSrc = ref(props.iconSrc);

    const select = ref(null);

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
          changeCurrentItem();
        }
      } else {
        selectedItem.value = 0;
      }
    }

    function selectPreviousOption() {
      if (selectedItem.value !== null) {
        if (selectedItem.value - 1 >= 0) {
          selectedItem.value -= 1;
          changeCurrentItem();
        }
      } else {
        selectedItem.value = 0;
      }
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
    };
  },
};
</script>

<style lang='scss' scoped>
.select-wrapper {
  color: #84868f;

  .select {
    position: relative;
    outline: none;
    border: 2px solid transparent;
    background-color: #323644;
    height: 65px;
    width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .invalid-icon {
      position: absolute;
      right: -50px;
      width: 30px;
      height: 30px;
    }

    &.invalid {
      border-color: #853635;
      box-shadow: 0 0 0px 3px #382328;
    }

    &.hover-enabled:hover {
      border-color: #3e83ba;
      background-color: #3d4049;
      box-shadow: 0 0 0 3px #274b6d;
    }

    &.expanded {
      border-color: #3e83ba;
      background-color: #3d4049;
      box-shadow: 0 0 0 3px #274b6d;
    }

  &.expanded {
    border-radius: 15px 15px 0 0;
  }

  .header {
    position: absolute;
    left: 30px;
    transform-origin: 0 0;
    transition: transform .6s;
    user-select: none;

    &.expanded, &.value-selected {
      color: #00a2e8;
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
    color: #84868f;
    position: absolute;
    left: 30px;
    transition: all 0.5s;
    backface-visibility: hidden;
    transform-origin: 0 0;
    color: white;
    font-size: .8em;

    &.placeholder {
    }
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
      width: 420px;
      z-index: 1;
      border-radius: 0 0 15px 15px;
      border-width: 0;
      border-style: solid;
      border-color: transparent;
      background-color: #323644;
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
        border-color: #3e83ba;
        background-color: #3d4049;
        box-shadow: 0 0 0 3px #274b6d;
        border-width: 0 2px 2px 2px;
      }

      ol {
        list-style-type: none;

        li {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;

          span {
            position: absolute;
            left: 30px;

            &.selected {
              color: white;
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
            background-color: #323644;
          }
        }
      }
    }
}

</style>
