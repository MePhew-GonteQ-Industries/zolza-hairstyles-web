<template>
  <body>
    <splashscreen id='splashscreen'/>
    <div id="content" class="hidden">
      <div id="nav">
          <navbar />
      </div>
          <router-view/>
          <footer>
            <contactSection />
          </footer>
    </div>
  </body>
</template>

<script>
import navbar from '@/components/navbar.vue';
import splashscreen from '@/components/splashscreen.vue';
import contactSection from '@/components/contactSection.vue';

export default {
  components: {
    navbar,
    splashscreen,
    contactSection,
  },
  methods: {
    showPage() {
      setTimeout(() => {
        document.getElementById('splashscreen').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
      }, 200);
    },
  },
  mounted() {
    this.showPage();
  },
};

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.hidden {
  display: none;
}

.displayed {
  display: inline-block;
}

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
  text-decoration: none;
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
  padding: 0% 10%;
  position: absolute;
  width: 100vw;
  bottom: 0;
  margin: 2% 0;
  z-index: -10;
}

@media only screen and (max-width: 400px) {
     footer {
       padding: 0% 5%;
     }
   }
</style>
