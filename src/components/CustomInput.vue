<template>
  <div class="input-wrapper">
    <input :type="inputType" :id="inputId" name="input" :autocomplete="autocomplete"
    :placeholder="label" :value="value"
    @input="event => $emit('update:value', event.target.value)"
    :class="{ invalid: invalid }" />
    <label :for="inputId">{{ label }}</label>
    <img :src="iconSrc" alt="">
    <img v-show="invalid" class="invalid-icon"
    src="@/assets/exclamation-mark.svg" alt="">
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'CustomInput',
  props: {
    value: String,
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
    inputType: {
      type: String,
      default: 'text',
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:value',
  ],
  setup() {
    const inputId = ref(null);

    onMounted(() => {
      inputId.value = uuidv4();
    });

    return {
      inputId,
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

  .invalid-icon {
    position: absolute;
    right: -50px;
    width: 30px;
    height: 30px;
  }

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
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all .3s;

    &.invalid {
      border-color: #853635;
      box-shadow: 0 0 0px 3px #382328;
    }

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
