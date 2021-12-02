<template>
  <section class="app-page" id="homepage">
    <hero id='hero'></hero>
    <div id="test2">
      <label>{{ $t("label") }}</label>
      <select v-model="locale">
        <option>en</option>
        <option>pl</option>
      </select>
      <h1>{{ $t("message") }}</h1>
    </div>
    <div id="test">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Poland_%28normative%29.svg/250px-Flag_of_Poland_%28normative%29.svg.png"
           alt=""
           v-if=" locale === 'pl'">
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
           alt=""
           v-if=" locale === 'en'">
    </div>
  </section>
</template>

<script>
import hero from '@/components/hero.vue';

export default {
  name: 'Home',
  components: {
    hero,
  },
  data() {
    this.$i18n.locale = 'en';
    return { locale: 'en' };
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style lang="scss" scoped>
  #test2 {
    font-size: 25px;

    select {
      text-align: center;
      width: 100px;
      font-size: 20px;
    }

    h1 {
      text-align: center;
      font-size: 40px;
    }
  }

  #test {
    height: 200px;
    input {
      width: 100px;
    }

    img {
      height: 200px;
      width: 300px;
    }
  }
</style>
