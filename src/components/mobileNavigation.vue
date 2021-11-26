<template>
  <div class="modal" @click="toggleMobileNavigation">
      <nav class="mobile-navigation">
      <ul class="primary-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <ul class="secondary-nav">
        <li><router-link to="/signup">Log In</router-link></li>
        <li><router-link to="/login">Sign up</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'mobileNavigation',
  methods: {
    toggleMobileNavigation() {
      document.getElementById('mobile-navigation').classList.toggle('mobileNavigagtionHidden');
      document.getElementById('mobile-navigation').classList.toggle('mobileNavigagtionVisible');
    },
  },
};
</script>

<style lang='scss' scoped>
.modal {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, .5);
  transition: width 500ms, height 1s;
}

.mobile-navigation {
  height: 400px;
  top: 75px;
  position: relative;
  background-color: red;
  z-index: 20;
  margin-right: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media only screen and (max-width: 680px) {
    .secondary-nav {
      display: none;
    }
  }
@media only screen and (max-width: 520px) {
    .secondary-nav {
      display: initial;
    }
  }
</style>
