<template>
  <section class="app-page" id="login-page">
    <div class="login-section-wrapper">
      <div id="login-left">
        <!-- <div id="login-section"> -->
          <h1>Witaj</h1>
          <!-- <div id="login-data"> -->
            <div class="textbox" id="emailbox">
              <img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt=""/>
              <input type="text" name="email" id="email" placeholder="E-mail">
            </div>
            <div class="textbox" id="passwordbox">
              <img src="https://img.icons8.com/ios-glyphs/30/000000/lock.png" alt=""/>
              <input type="password" name="password" id="password" placeholder="Hasło">
            </div>
          <!-- </div> -->
          <!-- <div id="login-action"> -->
            <div id="forgotpassword">
              <a href="#">Nie pamiętasz hasła</a>
            </div>
            <button id="login-btn" onclick="">Zaloguj się</button>
          <!-- </div> -->
        <!-- </div> -->
      </div>
      <div id="login-right">
        <!-- <div id="no-account-section"> -->
          <h2>Nie masz jeszcze konta?</h2>
          <!-- <nav id="register-navigation"> -->
            <!-- <ul> -->
              <!-- <li> -->
                <router-link to="/signup" id="signup">Zarejestruj się</router-link>
                <!-- </li> -->
              <!-- <li> -->
                <img src="../assets/facebook.svg" alt="FB" id="facebook">
                <!-- </li> -->
              <!-- <li> -->
                <img src="../assets/google.svg" alt="Google" id="google">
                <!-- </li> -->
            <!-- </ul> -->
          <!-- </nav> -->
        <!-- </div> -->
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
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
}
#login-left{
  text-align: center;
  display: grid;
  grid-template-columns: 100%/3;
  grid-template-rows: 40% 10% 10% 40%;
  height: 100%;
  width: 100%;
}
// #login-section{
//   height: 100%;
//   width: 100%;
//   padding: 25% 10%;
//   text-align: center;
//   display: flex;
//   flex-flow: column;
//   // justify-content: space-between;
// }
h1{
  font-size: 4em;
  grid-column-start: 1;
  grid-column-end: 4;
  align-self: end;
}
#emailbox{
  grid-column-start: 1;
  grid-column-end: 4;
  align-self: end;
}
#passwordbox{
  grid-column-start: 1;
  grid-column-end: 4;
  align-self: start;
}
.textbox{
  width: 80%;
  overflow: hidden;
  padding: 8px 0;
  margin: 8px 10%;
  border-bottom: 1px solid $light-complementary-color;
  img{
    float: left;
    text-align: center;
  }
  input{
    border: none;
    outline: none;
    background: none;
    width: 80%;
    float: left;
    margin: 0 10px;
  }
}
// #login-data{
//   font-size: 1.5em;
//   display: flex;
//   flex-flow: column;
//   text-align: left;
// }
// #login-action{
//   grid-column-start: 1;
//   grid-column-end: 4;
// }
#forgotpassword{
  grid-column-start: 1;
  grid-column-end: 2;
  align-self: start;
  text-align: center;
}
a{
  font-size: 12px;
}
#login-btn{
  //grid-row: 3;
  grid-column-start: 3;
  grid-column-end: 4;
  align-self: start;
  padding: 10px 10px;
  background-color: $light-complementary-color;
  border-radius: 50px;
  border: none;
  color: $light-background;
  transition: all .7s;
  margin: 0 20% 0 0;
  &:hover{
    // border: 1px solid $light-complementary-color;
    box-shadow: 0px 0px 0px 1px $light-complementary-color inset;
    background-color: $light-background;
    color: $light-complementary-color;
  }
}
#login-right{
  text-align: center;
  display: grid;
  grid-template-columns: 50% 10% 40%;
  grid-template-rows: 40% 10% 10% 40%;
  height: 100%;
  width: 100%;
}
h2{
  grid-column-start: 1;
  font-size: 2em;
  grid-column-end: 4;
  align-self: end;
  justify-self: center;
}
// #no-account-section{
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-flow: column;
//   padding: 25% 10%;
// }
// #register-navigation{
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   ul{
//     display: flex;
//     justify-content: left;
//     width: 100%;
//     align-items: center;
//   }
//   li{
//     display: inline-block;
//     display: flex;
//     align-items: center;
//   }
// }
#signup {
  justify-self: right;
  align-self: center;
  grid-column-start: 1;
  grid-column-end: 2;
  border: 1px solid transparent;
  background-color: $light-complementary-color;
  color: white;
  border-radius: 50px;
  padding: 10px 25px;
  display: flex;
  flex-flow: row;
  transition: all .7s;
  &:hover {
    background-color: $light-background;
    // border: 1px solid $light-complementary-color;
    box-shadow: 0px 0px 0px 1px $light-complementary-color inset;
    color: $light-complementary-color;
  }
}
#facebook{
  grid-column-start: 2;
  grid-column-end: 3;
  justify-self: center;
  align-self: center;
}
#google{
  grid-column-start: 3;
  grid-column-end: 4;
  justify-self: left;
  align-self: center;
}
</style>
