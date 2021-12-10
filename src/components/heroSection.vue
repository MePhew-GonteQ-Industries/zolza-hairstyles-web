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
      <logoItem />
    </div>
  </section>
</template>

<script>
import logoItem from '@/components/logoItem.vue';

export default {
  name: 'heroSection',
  components: {
    logoItem,
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
     color: $complementary-color;
     letter-spacing: .07em;
   }

   h1 {
      line-height: 1.3em;
      margin-top: .2em;
   }

   .primary-cta {
     background-color: $background-color;
     color: $primary-color;
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
