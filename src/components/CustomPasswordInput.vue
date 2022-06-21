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
      <img class="eye-icon" v-if="passwordHidden"
      src="@/assets/eye-crossed-out.svg" alt="show-password-icon">

      <img class="eye-icon" v-if="!passwordHidden"
      src="@/assets/eye.svg" alt="hide-password-icon">

    </div>

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
    color: $accent-text-color;
    position: absolute;
    left: 30px;
    transition: all 0.5s;
    pointer-events: none;
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

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

    img {
      width: 30px;
      height: 30px;
    }

    &:hover {
      background-color: $element-bg-color-hover-secondary;
    }

    &:active {
      background-color: $element-bg-color-active-secondary;
    }

    .eye-icon {
      width: 30px;
      height: 30px;
      user-select: none;
    }
  }

  input {
    padding: 20px 90px 0 30px;
    border: 2px solid transparent;
    background-color: $element-bg-color;
    color: $primary-text-color;
    height: 65px;
    width: 420px;
    border-radius: 15px;
    box-shadow: none;
    transition: all .3s, letter-spacing .6s;
    width: 50vw;
    min-width: 250px;
    max-width: 420px;
    font-weight: 600;

    &.invalid {
      border-color: $border-color-invalid;
      box-shadow: 0 0 0px 3px $box-shadow-color-invalid;
    }

    &:-webkit-autofill{
      -webkit-text-fill-color: $primary-text-color;
      color: $primary-text-color;
      font-family: 'Open Sans', sans-serif;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s,
      border-color .3s, box-shadow .3s, letter-spacing .6s;
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
      box-shadow: 0 0 0px 3px #274b6d;
      outline: none;
    }

    &[type="password"] {
      letter-spacing: 4px;
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
