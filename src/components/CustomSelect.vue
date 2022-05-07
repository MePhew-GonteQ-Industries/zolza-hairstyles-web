<template>
  <div class="select-wrapper">
    <div class="select" :class="{ active: active }" @click="toggleDropdown" ref="target">
      <span class="header">{{ header }}</span>
      <span :class="{ placeholder: !value, title: value }">{{ title }}</span>
      <img src="@/assets/arrow-down.svg" alt="dropdown-arrow"
        class="dropdown-arrow"
        :class="{ flipped: !active }">
      <img class="select-icon" :src="currentIconSrc" alt="">
    </div>
    <div class="dropdown" :class="{ show: active }">
      <ol>
        <li v-for="option in options" :key="option.value"
        @click="changeValue(option)">
          <span class="title">{{ option.title }}</span>
          <img v-if="option.iconSrc" :src="option.iconSrc" alt="">
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
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
  },
  setup(props, ctx) {
    const value = ref(null);
    const active = ref(false);
    const title = ref(props.placeholder);
    const currentIconSrc = ref(props.iconSrc);

    function toggleDropdown() {
      active.value = !active.value;
      ctx.emit('active-changed');
    }

    function collapseDropdown() {
      if (active.value) {
        active.value = false;
        ctx.emit('active-changed');
      }
    }

    const target = ref(null);

    onClickOutside(target, () => {
      collapseDropdown();
    });

    function changeValue(option) {
      this.value = option.value;
      this.title = option.title;
      this.currentIconSrc = option.iconSrc;
    }

    return {
      value,
      active,
      toggleDropdown,
      collapseDropdown,
      target,
      changeValue,
      title,
      currentIconSrc,
    };
  },
};
</script>

<style lang='scss' scoped>
.select-wrapper {
  color: #84868f;

  .select {
  outline: none;
  border: none;
  border: 2px solid transparent;
  background-color: #323644;
  height: 65px;
  width: 420px;
  border-radius: 15px;
  box-shadow: none;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active {
    border-radius: 15px 15px 0 0;
    border-color: #3e83ba;
    background-color: #3d4049;
    box-shadow: 0 0 0 3px #274b6d;
  }

  .header {
    position: absolute;
    transform: translateX(-9.4em);
  }

  .select-icon {
    position: absolute;
    transform: translateX(11em);
  }

  .title {
    color: white;
  }

  .placeholder {
    color: #84868f
  }

    .dropdown-arrow {
      position: absolute;
      transform: translateX(6em);
      transition: all .5s;
      user-select: none;

      &.flipped {
      transform: translateX(6em) rotateZ(180deg);
      }
    }
}

    .dropdown {
      position: absolute;
      transition: all .5s;
      width: 420px;
      padding: 20px 0;
      z-index: 1;
      border-radius: 0 0 15px 15px;
      border-width: 0 2px 2px 2px;
      border-style: solid;
      border-color: transparent;
      background-color: #323644;
      box-shadow: none;
      visibility: hidden;
      max-height: 200px;
      overflow-y: auto;

      &.show {
        visibility: visible;
        border-color: #3e83ba;
        background-color: #3d4049;
        box-shadow: 0 0 0 3px #274b6d;
      }

      ol {
        list-style-type: none;

        li {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 20px;
          cursor: pointer;

          span {

          }

          img {
            width: 30px;
            height: 30px;
            position: absolute;
            right: 15px;
          }

          &:hover {
            background-color: #323644;
          }
        }
      }
    }
}

</style>
