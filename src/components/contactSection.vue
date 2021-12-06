<template>
    <div class="footer-basic">
      <ul class="list-inline">
        <li class="list-inline-item"><router-link to="/terms">Terms of use</router-link></li>
        <li class="list-inline-item"><router-link to="/privacyPolicy">
          Privacy policy
        </router-link></li>
      </ul>
      <p class="copyright">Zołza Hairstyles © 2021</p>
    </div>
</template>

<script>
export default {
  name: 'contact-section',
};
</script>

<style lang='scss' scoped>

  .footer-basic ul {
    text-align:center;
    margin-bottom:0;
  }

  .footer-basic li {
    padding:0 10px;
    display: inline;
  }

  .footer-basic ul a {
    font-size: 18px;
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
