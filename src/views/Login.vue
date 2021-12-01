<template>
  <section class="app-page" id="login-page">
    <div class="login-section-wrapper">
      <div id="login-left">
        <div id="login-section">
          <h1>Witaj</h1>
          <div id="login-data">
            <label for="email">Adres E-mail:</label>
            <input type="text" name="email" id="email" placeholder="E-mail"><br>
            <label for="password">Hasło:</label><br>
            <input type="password" name="password" id="password" placeholder="Hasło">
          </div>
          <br>
          <div id="login-action">
            <a href="#">Nie pamiętasz hasła</a>
            <button id="login-btn" onclick="">Zaloguj się</button>
          </div>
        </div>
      </div>
      <div id="login-right">
        <div id="no-account-section">
          <h2>Nie masz jeszcze konta?</h2>
          <div id="register-navigation">
            <ul>
              <li><router-link to="/signup" id="signup">Zarejestruj się</router-link></li>
              <li><a href="#">Zaloguj się z GOOGLE</a></li>
              <li><a href="#">Zaloguj się z FACEBOOK</a></li>
            </ul>
          </div>
        </div>
      </div>
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
  height: 100%;
  width: 100%;
  padding: 25% 10%;
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
h1{
  font-size: 3em;
}
#login-data{
  font-size: 1.5em;
  display: flex;
  flex-flow: column;
  text-align: left;
}
#login-action{
  display: flex;
  justify-content: space-between;
}
a{
  font-size: 12px;
}
#login-btn{
  padding: 10px 25px;
  background-color: $light-complementary-color;
  border-radius: 50px;
  border: none;
  color: $light-background;
  transition: all .5s;
  &:hover{
    border: 1px solid $light-complementary-color;
    background-color: $light-background;
    color: $light-complementary-color;
  }
}
#login-right{
  height: 100%;
  width: 50%;
  text-align: left;
}
#no-account-section{
  height: 100%;
  width: 100%;
  padding: 25% 10%;
}
#register-navigation{
  display: flex;
  justify-content: space-between;
  &ul{
    display: flex;
  }
}
#signup {
    border: 1px solid transparent;
    background-color: $light-complementary-color;
    color: white;
    border-radius: 10px;
    padding: 10px 25px;
    transition: all .5s;
    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black;
    }
  }
</style>
