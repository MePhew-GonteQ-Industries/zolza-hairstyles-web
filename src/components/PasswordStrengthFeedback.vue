<template>
  <div class="password-strength-feedback" :class="{shown: show}">
    <password-meter :password="password" @score="emitScore"/>
    <p>Hasło musi składać się z co najmniej 8 znaków i
    zawierać przynajmniej jedną cyfrę lub znak specjalny</p>
  </div>
</template>

<script>
// import { ref } from 'vue';
import PasswordMeter from 'vue-simple-password-meter';

export default {
  name: 'DashboardPage',
  components: {
    PasswordMeter,
  },
  props: {
    password: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const emitScore = (payload) => {
      emit('score', payload);
    };

    return {
      emitScore,
    };
  },
};
</script>

<style>
.po-password-strength-bar {
  position: relative;
  border-radius: 5px;
  transition: all var(--transition-duration) linear !important;
  height: 10px;
  width: 100%;
  background-color: #f95e68;
}

.po-password-strength-bar.risky {
    background-color: #f95e68;
    /* width: 10%; */
    width: 100%;
}

.po-password-strength-bar.guessable {
    background-color: #fb964d;
    /* width: 32.5%; */
    width: 77.5%;
}

.po-password-strength-bar.weak {
    background-color: #fdd244;
    /* width: 55%; */
    width: 55%;
}

.po-password-strength-bar.safe {
    background-color: #b0dc53;
    /* width: 77.5%; */
    width: 25%;
}

.po-password-strength-bar.secure {
    /* background-color: #35cc62; */
    background-color: transparent;
    width: 0;
}
.po-password-strength-bar::before {
  transition: all var(--transition-duration) linear !important;
}
.po-password-strength-bar.secure::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "\2713";
    color: #35cc62;
    font-size: 40px;
}
</style>

<style lang="scss" scoped>
.password-strength-feedback {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  color: $color-danger;
  height: 0;
  overflow: hidden;

  &.shown {
    height: 100px;
    margin-bottom: 10px;
  }
}
</style>
