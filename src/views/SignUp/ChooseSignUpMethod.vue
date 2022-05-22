<template>
  <section class="app-page" id="recover-password-page">
    <h2>Select your prefered sign up method</h2>
    <div class="sing-up-selection-wrapper">
      <router-link to='/sign-up' class='button-link'>Sign Up with email</router-link>
      <router-link to='/signUp'>Sign up with google</router-link>
      <router-link to='/signUp'>Sign up with facebook</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChooseSignUpMethod',
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1em;
  font-weight: normal;
}

.sing-up-selection-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all .3s;
  background-color: rgba(39, 42, 54, .6);
  padding: 100px 20px;
  border-radius: 20px;
  position: relative;

  .button-link {
    height: 60px;
    width: 400px;
    border-radius: 30px;
    border: 2px solid transparent;
    background-color: #1A92F0;
    color: white;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      outline: none;
    }

    &:hover, &:active, &:focus  {
      border-color: white;
      box-shadow: 0 0 4px 3px rgb(156, 156, 156);
    }

    &:active {
      transform: scale(.9);
    }
  }
}
</style>
