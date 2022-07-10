<template>
  <div class="input-wrapper">
    <input :type="inputType" :id="inputId" name="input" :autocomplete="autocomplete"
    :placeholder="label" :value="value"
    @input="event => $emit('update:value', event.target.value)"
    :class="{ invalid: invalid && (validate || forceValidate) }"
    @blur="validate = true"/>

    <label :for="inputId">{{ label }}</label>

    <i :class="iconClass"></i>

    <div v-show="(validate || forceValidate) && invalid" class="invalid-wrapper">
      <i class="ph-warning-circle-light invalid-icon"></i>

      <p class="message-invalid message-value-empty"
      v-if="required && empty">{{ messageEmpty }}</p>

      <p class="message-invalid message-value-invalid"
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
    iconClass: {
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
    top: 100%;
    left: 0;
    margin: .5rem 1rem;
    display: flex;
    align-items: center;
    gap: 15px;
    transform: translate3d(0, 0, 0);

    .invalid-icon {
      position: static;
      font-size: 2rem;
      color: $color-danger;
      }

    .message-invalid {
      color: $color-danger;
    }
  }

  label {
    color: $primary-text-color;
    position: absolute;
    left: 30px;
    pointer-events: none;
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

  i {
    font-size: 2rem;
    position: absolute;
    right: 30px
  }

  input {
    padding: 20px 90px 0 30px;
    border: 2px solid transparent;
    background-color: $secondary-color;
    color: $secondary-text-color;
    height: 65px;
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    border-radius: 15px;
    box-shadow: none;
    font-weight: 600;
    transition: all calc($transition-duration * 2);
    filter: none;

    &.invalid {
      border-color: $color-invalid;
      box-shadow: 0 0 10px 1px $color-invalid;
    }

   &:-webkit-autofill,
   &:autofill {
      -webkit-text-fill-color: $secondary-text-color;
      background: $secondary-color;
      color: $secondary-text-color;
    }

    &:-webkit-autofill,
    &:autofill,
    &:-webkit-autofill:hover,
    &:autofill:hover,
    &:-webkit-autofill:focus,
    &:autofill:focus {
      transition: background-color 5000s ease-in-out 0s,
      border-color $transition-duration,
      box-shadow $transition-duration;
    }

    &:focus, &:hover {
      outline: none;
    }

    &:hover:not(:focus) {
      border-color: $accent-color;
      box-shadow: none;
    }

    &:focus {
      border-color: $accent-color;
      box-shadow: 0 0 10px 1px $accent-color;
      outline: none;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label,
    &:-webkit-autofill:active + label  {
      color: $accent-color;
      transform: translateY(-0.6em) scale(0.8);
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }
}
</style>
