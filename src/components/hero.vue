<template>
  <section id="hero">
    <div class="container">
      <div class="left-col">
        <p class="subhead">Lorem Ipsum is simply dummy texts</p>
        <h1>Lorem Ipsum is simply dummy texts V2</h1>
        <div class="hero-cta">
          <router-link class="primary-cta" to="/signup">Sign up now!</router-link>
          <a href="https://www.youtube.com/watch?v=0YTSqREl80s" target="blank" class="see-demo-cta">
            <img src="@/assets/video.svg" alt="">See demo
          </a>
        </div>
      </div>
      <logo />
    </div>
  </section>
</template>

<script>
import logo from '@/components/logo.vue';

export default {
  name: 'hero',
  components: {
    logo,
  },
};
</script>

<style lang="scss"  scoped>
 #hero {
   text-align: center;
   display: flex;
   align-items: center;
   justify-content: center;
 }

 .left-col {
   .subhead {
     text-transform: uppercase;
     font-weight: bold;
     color: gray;
     letter-spacing: .07em;
   }

   h1 {
      line-height: 1.3em;
      margin-top: .2em;
   }

   .primary-cta {
     //background: var(--light-complementary-color);
     background: #007AF3;
     color: white;
     text-decoration: none;
     padding: .6em 1.2em;
     font-size: 1.2em;
     border-radius: 5em;
     font-weight: bold;
     display: inline-block;
   }

   .see-demo-cta {
     display: block;
     margin-top: 1em;

     img {
       margin-right: .5em;
     }
   }
 }
</style>
