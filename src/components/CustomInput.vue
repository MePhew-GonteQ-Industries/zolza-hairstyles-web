<template>
  <div class="input-wrapper">
    <input :type="inputType" :id="inputId" name="input" :autocomplete="autocomplete"
    :placeholder="label" :value="value"
    @input="event => $emit('update:value', event.target.value)"
    :class="{ invalid: invalid && (validate || forceValidate) }"
    @blur="validate = true"/>

    <label :for="inputId">{{ label }}</label>

    <img :src="iconSrc" alt="">
    <i class="ph-envelope-simple-light"></i>

    <div v-show="(validate || forceValidate) && invalid" class="invalid-wrapper">
      <img class="invalid-icon"
      src="@/assets/exclamation-mark.svg" alt="">

      <p class="messageInvalid messageValueEmpty"
      v-if="required && empty">{{ messageEmpty }}</p>

      <p class="messageInvalid messageValueInvalid"
      v-if="!(required && empty)">{{ messageInvalid }}</p>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
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
    inputType: {
      type: String,
      default: 'text',
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    forceValidate: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:value',
  ],
  setup(props) {
    const inputId = ref(null);

    onMounted(() => {
      inputId.value = uuidv4();
    });

    const empty = computed(() => props.value.length === 0);

    const validate = ref(false);

    return {
      inputId,
      empty,
      validate,
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

  label {
    color: $accent-text-color;
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
    padding: 20px 90px 0 30px;
    border: 2px solid transparent;
    background-color: $element-bg-color;
    color: $primary-text-color;
    height: 65px;
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all .3s;
    font-weight: 600;

    &.invalid {
      border-color: $border-color-invalid;
      box-shadow: 0 0 0px 3px $box-shadow-color-invalid;
    }

   &:-webkit-autofill{
      -webkit-text-fill-color: $primary-text-color;
      color: $primary-text-color;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s, border-color .3s, box-shadow .3s;
    }

    &:focus, &:hover {
      outline: none;
    }

    &:hover:not(:focus) {
      border-color: $border-color-hover-primary;
      box-shadow: none;
    }

    &:focus {
      border-color: $border-color-active-primary;
      background-color: $element-bg-color-active;
      box-shadow: 0 0 0px 3px $element-box-shadow-active;
      outline: none;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label,
    &:-webkit-autofill:active + label  {
      color: $text-color-element-active;
      transform: translateY(-0.6em) scale(0.8);
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }
}
</style>
