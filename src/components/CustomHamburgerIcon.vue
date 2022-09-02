<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div class="hamburger-icon nav-active"
        :class="{'nav-active': navbarActive}"
        @click="navSlide">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>
</template>

<script>

export default {
  name: 'CustomHarburgerIcon',
  methods: {
    navSlide() {
      this.navbarActive = !this.navbarActive;
    },
  },
  data() {
    return {
      navbarActive: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.hamburger-icon{
    flex-flow: column;
    z-index: 2500;
    display: flex;
    position: absolute;
    top: 2.5vh;
    right: 2vw;
    div {
        width: 30px;
        height: 3px;
        background-color: $main-section-color;
        margin: 5px;
        border-radius: 50px;
        transition: all 0.3s ease;
    }
}
.nav-active{
      .line1{
        transform: rotate(-45deg) translate(-10px, 2px);
      }
      .line2{
        opacity: 0;
      }
      .line3{
        transform: rotate(45deg) translate(-10px, -2px);
      }
    }
</style>
