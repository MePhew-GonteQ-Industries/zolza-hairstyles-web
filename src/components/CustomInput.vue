<template>
  <div class="input-wrapper">
    <div class="inside-input-wrapper">
      <input
        :type="inputType"
        :id="inputId"
        name="input"
        :autocomplete="autocomplete"
        :placeholder="label"
        :value="value"
        @input="(event) => $emit('update:value', event.target.value)"
        :class="[{ invalid: (invalid || empty) && (validate || forceValidate) }, appearance]"
        @focus="$emit('focus')"
        @blur="handleBlur"
      />

      <label
        class="search-label"
        v-if="type === 'search'"
        :for="inputId"
        >{{ label }}</label
      >
      <label
        class="form-label"
        v-else
        :for="inputId"
        >{{ label }}</label
      >

      <div
        v-if="type === 'search'"
        class="button"
        @click="$emit('searchBtnClick')"
        @keyup.enter="searchBtnClick"
      >
        <i class="ph-magnifying-glass-light"></i>
      </div>
      <div
        v-else-if="type === 'password'"
        class="button"
        @click="showPassword"
        @keyup.enter="showPassword"
      >
        <i
          class="ph-eye-slash-light"
          v-if="passwordHidden"
        ></i>

        <i
          class="ph-eye-light"
          v-if="!passwordHidden"
        ></i>
      </div>
      <div
        v-else-if="type === 'password-login'"
        class="button"
        @click="showPassword"
        @keyup.enter="showPassword"
      >
        <i
          class="ph-eye-slash-light"
          v-if="passwordHidden"
        ></i>

        <i
          class="ph-eye-light"
          v-if="!passwordHidden"
        ></i>
      </div>
      <i
        v-else
        :class="iconClass"
        class="input-icon"
      ></i>
    </div>
    <div class="invalid-wrapper">
      <i
        class="ph-warning-circle-light invalid-icon"
        v-if="
          (required && empty && (validate || forceValidate)) ||
          ((validate || forceValidate) && invalid)
        "
      ></i>

      <p
        class="message-invalid message-value-empty"
        v-if="required && empty && (validate || forceValidate) && invalid"
      >
        {{ messageEmpty }}
      </p>

      <p
        class="message-invalid message-value-invalid"
        v-if="!(required && empty) && (validate || forceValidate) && invalid"
      >
        {{ messageInvalid }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CustomInput",
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
    },
    messageInvalid: {
      type: String,
    },
    messageEmpty: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    type: {
      type: String,
      default: "text",
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    forceValidate: {
      type: Boolean,
      default: false,
    },
    appearance: {
      type: String,
      default: "outlined",
    },
  },
  emits: ["update:value", "blur", "focus", "searchBtnClick"],
  setup(props, { emit }) {
    const inputId = ref(null);
    const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    const whitespace = /\s/g;
    const specialCharacter = /^[A-Za-z]+$/;

    onMounted(() => {
      inputId.value = uuidv4();
    });

    const invalidInternal = computed(() => {
      switch (props.type) {
        case "name": {
          if ((props.value.length < 3 || props.value.length > 50) && props.value.length !== 0) {
            return true;
          }
          if (
            (props.value && props.value.trim().match(whitespace)) ||
            !props.value.match(specialCharacter)
          ) {
            return true;
          }
          return false;
        }
        case "password": {
          if (props.value && !props.value.match(strongPassword) && props.value.length !== 0) {
            return true;
          }
          return false;
        }
        case "password-login": {
          return false;
        }
        default: {
          return true;
        }
      }
      // return false;
    });

    const empty = computed(() => {
      if (props.value && props.value.length === 0) {
        return true;
      }
      return false;
    });

    const validate = ref(false);

    const handleBlur = () => {
      emit("blur");
      validate.value = true;
    };

    const passwordHidden = ref(true);

    function showPassword() {
      if (empty.value) return;
      passwordHidden.value = !passwordHidden.value;
    }

    const inputType = computed(() => {
      switch (props.type) {
        case "password": {
          return passwordHidden.value ? "password" : "text";
        }
        case "password-login": {
          return passwordHidden.value ? "password" : "text";
        }
        default: {
          return props.type;
        }
      }
    });

    return {
      invalidInternal,
      inputId,
      empty,
      validate,
      handleBlur,
      passwordHidden,
      showPassword,
      inputType,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 75px;
  width: 408px;
  box-sizing: border-box;
  gap: 0.5rem;

  @media only screen and (max-width: $xs) {
    width: 310px;
  }

  .inside-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    width: 100%;
  }

  .invalid-wrapper {
    height: calc(20px - 0.5rem);
    margin: 0 0.1rem;
    display: flex;
    align-items: center;
    gap: 5px;
    transform: translate3d(0, 0, 0);

    .invalid-icon {
      position: static;
      font-size: 1.3rem;
      color: $error-color;
    }

    .message-invalid {
      color: $error-color;
      font-size: 0.6rem;
    }
  }

  label {
    color: $primary-text-color;
    position: absolute;
    left: 30px;
    pointer-events: none;
    backface-visibility: hidden;
    transform-origin: 0 0;

    &.search-label {
      left: 32px;
    }
  }

  .input-icon {
    font-size: 2rem;
    position: absolute;
    right: 30px;
  }

  .button {
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

    i {
      font-size: 2rem;
      user-select: none;
    }
  }

  input {
    padding: 20px 65px 0 30px;
    border: 2px solid transparent;
    background-color: $primary-color;
    color: $secondary-text-color;
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: none;
    font-weight: 600;
    transition: all calc($transition-duration * 2);
    filter: none;
    font-family: "Inter", sans-serif;
    font-size: 0.875em;

    &[type="password"] {
      letter-spacing: 0.313rem;
    }

    &[type="search"] {
      padding: 0 90px 0 30px;
    }

    &[type="search"]::-webkit-search-decoration,
    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-results-button,
    &[type="search"]::-webkit-search-results-decoration {
      appearance: none;
      -webkit-appearance: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: $secondary-text-color;
      background-color: $secondary-color;
      color: $secondary-text-color;
      transition:
        background-color 5000s ease-in-out 0s,
        border-color $transition-duration,
        box-shadow $transition-duration;
    }

    &:focus,
    &:hover {
      outline: none;
    }

    &:hover:not(:focus) {
      border-color: $accent-color;
      box-shadow: none;
    }

    &:focus {
      border-color: $accent-color;
      box-shadow: 0 0 8px -2px $accent-color;
      outline: none;
    }

    &:focus + .form-label,
    &:not(:placeholder-shown) + .form-label,
    &:-webkit-autofill:active + .form-label {
      color: $accent-color;
      transform: translateY(-0.6em) scale(0.8);
    }

    &:not(:placeholder-shown) + .search-label {
      display: none;
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }

    &.invalid {
      border-color: $error-color;
      box-shadow: 0 0 8px -2px $error-color-low;
    }

    &.outlined {
      background-color: transparent;

      &:not(:focus, :hover, .invalid) {
        border-color: $primary-text-color;
      }
    }

    &.secondary {
      background-color: $secondary-color;
      box-shadow: 0 0 8px -2px $box-shadow-color;
    }
  }
}
</style>
