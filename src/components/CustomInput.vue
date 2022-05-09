<template>
  <div class="input-wrapper">
    <input type="text" name="input" :autocomplete="autocomplete"
    :placeholder="label" v-model="value"
    @input="event => $emit('update:value', event.target.value)">
    <label for="input">{{ label }}</label>
    <img :src="iconSrc" alt="">
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CustomInput',
  props: {
    autocomplete: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    iconSrc: {
      type: String,
      required: true,
    },
  },
  setup() {
    const value = ref('');

    return {
      value,
    };
  },
};
</script>

<style lang='scss' scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    color: #84868f;
    position: absolute;
    left: 30px;
    transition: all 0.5s;
    pointer-events: none;
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

  img {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30px
  }

  input {
    padding: 20px 55px 0 30px;
    border: 2px solid transparent;
    background-color: #323644;
    color: white;
    height: 65px;
    width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all .3s;

   &:-webkit-autofill{
      -webkit-text-fill-color: white;
      color: white;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s, border-color .3s, box-shadow .3s;
    }

    &:focus, &:hover {
      border-color: #3e83ba;
      background-color: #3d4049;
      box-shadow: 0 0 0px 3px #274b6d;
      outline: none;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label,
    &:-webkit-autofill:active + label  {
      color: #00a2e8;
      transform: translateY(-0.6em) scale(0.8);
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }
}
</style>
