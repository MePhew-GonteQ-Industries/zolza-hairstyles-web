<template>
      <div class="mobile-navigation-container">
        <nav class="mobile-navigation">
          <ul class="primary-nav primary-nav-hidden">
            <li><router-link to="/" @click="toggleMobileNavigation">Home</router-link></li>
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
.mobile-navigation-container {
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  background-color: white;
  z-index: 20;
  margin-right: 50%;
  transition: width 500ms;

  .mobile-navigation {
    position: relative;
    height: 100%;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden; // TODO: Improve

    a {
      margin-left: 10px;
      font-size: 25px;
      padding: 0 25px 0 25px;
    }
  }
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
