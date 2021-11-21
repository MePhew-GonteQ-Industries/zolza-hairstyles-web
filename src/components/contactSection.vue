<template>
    <footer class="footer-basic">
      <hr>
      <ul class="list-inline">
        <li class="list-inline-item"><router-link to="/terms">Terms</router-link></li>
        <li class="list-inline-item"><router-link to="/privacyPolicy">
          Privacy policy
        </router-link></li>
      </ul>
      <p class="copyright">Zołza Hairstyles © 2021</p>
    </footer>
</template>

<script>
export default {
  name: 'contact-section',
};
</script>

<style scoped>
  .footer-basic {
    width: 100vw;
    padding: 20px 0;
    background-color: inherit;
    color:#4b4c4d;
  }

  .footer-basic ul {
    padding:0;
    list-style:none;
    text-align:center;
    font-size:18px;
    line-height:1.6;
    margin-bottom:0;
  }

  .footer-basic li {
    padding:0 10px;
    display: inline;
  }

  .footer-basic ul a {
    color:inherit;
    text-decoration:none;
    opacity:0.8;
  }

  .footer-basic ul a:hover {
    opacity:1;
  }

  .footer-basic .copyright {
    margin-top:15px;
    text-align:center;
    font-size:14px;
    color:#aaa;
    margin-bottom:0;
  }
</style>
