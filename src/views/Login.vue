<template>
  <section class="app-page" id="login-page">
    <div class="login-section-wrapper">
      <div id="login-left">
        <div id="login-section">
          <h2>Witaj</h2>
          <form action="">
            <label for="email">Adres E-mail:</label>
            <input type="text" name="email" id="email" placeholder="E-mail"><br>
            <label for="password">Hasło:</label><br>
            <input type="password" name="password" id="password" placeholder="Hasło">
          </form>
          <br>
          <div id="login-action">
            <a href="#">Nie pamiętasz hasła</a>
            <button id="login-btn">Zaloguj się</button>
          </div>
        </div>
      </div>
      <div id="login-right"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang='scss' scoped>
.login-section-wrapper{
  height: 80%;
  width: 75%;
  border: 1px solid black;
  box-shadow: 5px 5px rgba(0, 0, 0, .1);
  display: flex;
}
#login-left{
  text-align: center;
  height: 100%;
  width: 50%;
}
#login-section{
  height: 50%;
  width: 80%;
  padding: 25% 10%;
  text-align: center;
}
form{
  text-align: left;
  width: 100%;
}
#login-action{
  display: flex;
  justify-content: space-between;
}
a{
  font-size: 12px;
}
#login-btn{
  padding: 10px;
  background-color: $light-complementary-color;
  border-radius: 50px;
}
#login-right{
  height: 100%;
  width: 50%;
}
</style>
