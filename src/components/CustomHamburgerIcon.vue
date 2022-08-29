<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div class="hamburger-icon"
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
        width: 40px;
        height: 3px;
        background-color: #0DB3D9;
        margin: 5px;
        border-radius: 50px;
        transition: all 0.3s ease;
    }
}
</style>
