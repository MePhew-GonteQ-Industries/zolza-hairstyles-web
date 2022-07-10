<template>
  <div class="password-input-wrapper">
    <input :autocomplete="autocomplete"
    class="password-input"
    :type="passwordHidden ? 'password' : 'text'"
    name="password" :id="inputId" :placeholder="label" :value="password"
    @input="event => $emit('update:password', event.target.value)"
    :class="{ invalid: invalid && (validate || forceValidate) }"
    @focus="$emit('focus')"
    @blur="() => {$emit('blur'); validate = true;}">

    <label :for="inputId">{{ label }}</label>

    <div class="show-password" @click="showPassword">

      <i class="ph-eye-slash-light eye-icon" v-if="passwordHidden"></i>

      <i class="ph-eye-light eye-icon" v-if="!passwordHidden"></i>

    </div>

    <div v-show="(validate || forceValidate) && invalid" class="invalid-wrapper">
      <i class="ph-warning-circle-light invalid-icon"></i>

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
  name: 'CustomPasswordInput',
  props: {
    password: String,
    autocomplete: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
  setup(props) {
    const passwordHidden = ref('false');

    function showPassword() {
      passwordHidden.value = !passwordHidden.value;
    }

    const inputId = ref(null);

    onMounted(() => {
      inputId.value = uuidv4();
    });

    const empty = computed(() => props.password.length === 0);

    const validate = ref(false);

    return {
      empty,
      passwordHidden,
      showPassword,
      inputId,
      validate,
    };
  },
};
</script>

<style lang='scss' scoped>
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 45px;

  label {
    color: $primary-text-color;
    position: absolute;
    left: 30px;
    pointer-events: none;
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

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

  .show-password {
    position: absolute;
    right: 23px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: $primary-color;
    }

    .eye-icon {
      font-size: 2rem;
      user-select: none;
    }
  }

  input {
    padding: 20px 90px 0 30px;
    border: 2px solid transparent;
    background-color: $secondary-color;
    color: $secondary-text-color;
    height: 65px;
    width: 420px;
    border-radius: 15px;
    box-shadow: none;
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    font-weight: 600;

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

    &[type="password"] {
      letter-spacing: 4px;
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
