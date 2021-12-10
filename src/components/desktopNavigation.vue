<template>
    <nav class="navigation">
      <ul class="primary-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/services">Services</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <div class="controls-wrapper">
        <div class="toggle-theme-wrapper">
          <input type="checkbox"
                 name="toggle-theme"
                 id="toggle-theme-checkbox"
                 @change="toggleTheme"/>
          <label for="toggle-theme-checkbox" class="toggle-theme-label-left"></label>
          <label for="toggle-theme-checkbox" class="toggle-theme-label"></label>
        </div>
      </div>

      <ul class="secondary-nav" id="secondary-nav">
        <li><router-link to="/login" id="login">Log In</router-link></li>
        <li><router-link to="/signup" id="signup">Sign up</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'desktopNavigation',
  setup(props, ctx) {
    function toggleTheme() {
      ctx.emit('theme-toggled');
    }

    return { toggleTheme };
  },
};
</script>

<style lang='scss' scoped>
  .controls-wrapper {
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media only screen and (max-width: 570px) {
      & {
        flex-grow: 0;
        width: 40px;
      }
    }
  }

  #login, #signup {
    padding: 0 10px 0 10px;
    transition: all .5s;
  }

  #login {
    border-radius: 20px;

    &:hover {
      //color: $accent-color;
    }
  }

  #signup {
    border: 1px solid $primary-color;
    background-color: $background-color;
    color: $complementary-color;
    border-radius: 10px;

    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black;
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media only screen and (max-width: 570px) {
      & {
        width: 40px;
      }
    }

    .primary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .secondary-nav {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .primary-nav a {
      font-size: 24px;
    }

      @media only screen and (max-width: 900px) {
     .primary-nav {
       display: none;
     }
   }

    a {
      text-decoration: none;
      margin-right: 10px;
    }

    li {
      display: inline-block;
    }
  }

  @media only screen and (max-width: 990px) {
    .navigation{
       justify-content: flex-end;
     }
   }

  @media only screen and (max-width: 570px) {
    #secondary-nav {
      display: none;
    }
  }

  @media only screen and (min-width: 640px){
    a{
      color: $primary-color;
      font-size: 26px;
    }
  }

  // custom toggle switch
  $shine: 0 0 10px white;
  $on-bg: rgba(0, 0, 0, 0.15);
  $on-dot-color: #FFB200;
  $on-border: 2px solid $primary-color;
  $off-bg: rgba(255, 255, 255, 0.15);
  $off-dot-color: #eee;
  $off-border: 2px solid $primary-color;
  $togglebutton-size: 16px;
  $togglebutton-padding: 4px;
  $togglebutton-margin: 10px;
  $togglebutton-label-padding: 0px;
  $togglebutton-label-color: rgba(149, 149, 149, 0.51);
  $togglebutton-label-active-color: rgba(250, 250, 250, 0.51);
  $togglebutton-label-weight: normal;
  $togglebutton-label-active-weight: bold;

  .toggle-theme-wrapper {
    width: 40px;
    height: 30px;
  }

  .toggle-theme-label-left:empty{
    margin-left: -$togglebutton-margin;
  }

  .toggle-theme-label-left:before, .toggle-theme-label-left:after{
    box-sizing:border-box;
    margin:0;
    padding:0;
    /*transition*/
    -webkit-transition:.25s ease-in-out;
    -moz-transition:.25s ease-in-out;
    -o-transition:.25s ease-in-out;
    transition:.25s ease-in-out;
    outline:none;
  }

  .toggle-theme-wrapper input[type=checkbox], .toggle-theme-wrapper input[type=checkbox]:active{
    position:absolute;
    top:-5000px;
    height:0;
    width:0;
    opacity:0;
    border:none;
    outline:none;
  }
  .toggle-theme-wrapper label{
    display:inline-block;
    position:relative;
    padding:$togglebutton-label-padding;
    margin-bottom:20px;
    font-size:14px;
    line-height:16px;
    cursor:pointer;
    color: $togglebutton-label-color;
    font-weight: $togglebutton-label-weight;
  }
  .toggle-theme-label-left:before{
    content:'';
    display:block;
    position:absolute;
    line-height:34px;
    text-indent:40px;
    height:$togglebutton-size;
    width:$togglebutton-size;
    margin: $togglebutton-padding;
    /*border-radius*/
    -webkit-border-radius:100%;
    -moz-border-radius:100%;
    border-radius:100%;
    right: (($togglebutton-size) ) + $togglebutton-label-padding + $togglebutton-margin;
    bottom: $togglebutton-label-padding;
    background:$on-dot-color;
    transform: rotate(-45deg);
    box-shadow: $shine;
  }
  .toggle-theme-label-left:after{
    content: "";
    display: inline-block;
    width: ($togglebutton-size * 2) + ($togglebutton-padding * 2);
    height:$togglebutton-size + ($togglebutton-padding * 2);
    /*border-radius*/
    -webkit-border-radius: $togglebutton-size;
    -moz-border-radius: $togglebutton-size;
    border-radius: $togglebutton-size;
    background: $off-bg;
    vertical-align: middle;
    margin: 0 $togglebutton-margin;
    border: $on-border;
  }
  .toggle-theme-wrapper input[type=checkbox]:checked + .toggle-theme-label-left:before{
    right: 17px;
    box-shadow: 5px 5px 0 0 $off-dot-color;
    background: transparent;
  }
  .toggle-theme-wrapper input[type=checkbox]:checked + .toggle-theme-label-left:after{
    background: $on-bg;
    border: $off-border;
  }
  .toggle-theme-wrapper input[type=checkbox] + .toggle-theme-label-left{
    color: $togglebutton-label-active-color;
    font-weight: $togglebutton-label-active-weight;
  }
  .toggle-theme-wrapper input[type=checkbox]:checked + .toggle-theme-label-left{
    color: $togglebutton-label-color;
    font-weight: $togglebutton-label-weight;
  }
  .toggle-theme-wrapper input[type=checkbox]:checked + .toggle-theme-label-left +,
  .toggle-theme-label{
    color: $togglebutton-label-active-color;
    font-weight: $togglebutton-label-active-weight;
  }
</style>
