<template>
  <div id="nav">
    <navbar />
  </div>
  <router-view/>
  <footer>
    <contactSection />
  </footer>
</template>

<script>
import navbar from '@/components/navbar.vue';
import contactSection from '@/components/contactSection.vue';

export default {
  components: {
    navbar,
    contactSection,
  },
};

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: #444;
}

ul {
  list-style-type: none;
}

section {
  padding: 5em 2em;
}

body {
  background-color: #F2F2F2;
}

#app {
  height: 100vh;
}

#nav {
  position: sticky;
  top: 0;
  height: 10%;
}

footer {
  position: absolute;
  bottom: 0;
}

</style>
