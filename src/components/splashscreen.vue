<template>
  <div>
    <div class="half" id="top"></div>
    <div id="cut"></div>
    <div id="scissors">
      <div id="top-part">
        <div id="rotator-top">
          <div class="blade"></div>
          <div class="hole"></div>
        </div>
      </div>
      <div id="bottom-part">
        <div id="rotator-bottom">
          <div class="blade"></div>
          <div class="hole"></div>
          <div class="screw"></div>
        </div>
      </div>
    </div>
    <div class="half" id="bottom"></div><span id="text">
    <span id="firstline">ack to</span><br>school!</span>
  </div>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style lang="scss" scoped>
$bg:#F3D89F;
$scissors:#3D8EB9;
$blade:#bdc3c7;
$screw:darkgray;
$paper:#ecf0f1;

body {
  margin:0;
  overflow:hidden;
  background:$bg;
}

%pseudo {
  content:'';
  display:block;
  position:absolute;
}

#scissors {
  position:absolute;
  top:calc(50% - 100px);
  left:calc(50% - 450px);
  transform:translateX(-50%) translateY(-50%);
  animation-name:move;
  animation-duration:10s;
  animation-timing-function:ease;
  animation-fill-mode:forwards;
  &:after {
    @extend %pseudo;
    width:15px;
    height:65px;
    background:$scissors;
    top:68px;
    left:-8px;
    opacity:0;
    animation-name:opac;
    animation-delay:9.5s;
    animation-duration:.5s;
    animation-timing-function:ease;
    animation-fill-mode:forwards;
  }
  &:before {
    @extend %pseudo;
    width:30px;
    height:12px;
    background:$scissors;
    top:95px;
    opacity:0;
    animation-name:opac;
    animation-delay:9.5s;
    animation-duration:.5s;
    animation-timing-function:ease;
    animation-fill-mode:forwards;
  }
}
@keyframes opac {
  100% {opacity:1;}
}
@keyframes move {
  0% {left:calc(50% - 500px);}
  10% {left:calc(50% - 366px);}
  30% {left:calc(50% - 266px);}
  50% {left:calc(50% - 166px);}
  70% {left:calc(50% - 66px);}
  90% {left:calc(50% + 90px);top:calc(50% - 100px);z-index:1}
  100% {left:calc(50% - 210px);top:calc(50% - 205px);z-index:-2;}
}

.hole {
  position:absolute;
  background:$scissors;
  width:90px;
  height:90px;
  border-radius:100px;
  background:radial-gradient(circle at center, rgba(0, 0, 0, 0) 45%, $scissors 47%, $scissors 100%);
}

.blade {
  position:absolute;
  background:$blade;
  width:230px;
  height:30px;
  left:80px;
  top:30px;
  box-shadow:0 0 10px rgba(0, 0, 0, .1);
}

#top-part {
  position:absolute;
  transform-origin:45px 45px;
  transform:rotateZ(30deg);
  z-index:2;
}
#top-part .blade {
  border-bottom-right-radius:100px;
}

#bottom-part {
  position:absolute;
  top:112px;
  transform-origin:45px 45px;
  transform:rotateZ(-30deg);
  z-index:2;
}
#bottom-part .blade {
  border-top-right-radius:100px;
}

#rotator-top {
  transform-origin:155px 45px;
  animation:rotateTop;
  animation-duration:2s;
  animation-iteration-count:5;
  animation-timing-function:linear;
  animation-fill-mode:forwards;
}
#rotator-bottom {
  transform-origin:155px 45px;
  animation:rotateBottom;
  animation-duration:2s;
  animation-iteration-count:5;
  animation-timing-function:linear;
  animation-fill-mode:forwards;
}

@keyframes rotateTop {
  0% {transform:rotateZ(-10deg);}
  50% {transform:rotateZ(20deg);}
  100% {transform:rotateZ(-10deg);}
}
@keyframes rotateBottom {
  0% {transform:rotateZ(10deg);}
  50% {transform:rotateZ(-20deg);}
  100% {transform:rotateZ(10deg);}
}

.screw {
  position:absolute;
  width:15px;
  height:15px;
  background:$screw;
  border-radius:100px;
  top:37px;
  left:150px;
  box-shadow:0 0 5px darken($blade, 50%);
  &:after {
    @extend %pseudo;
    width:10px;
    height:3px;
    background:darken($screw, 20%);
    top:6px;
    left:2px;
    box-shadow:inset 0 1px 1px black;
  }
}

$paper-height:250px;
.half {
  position:absolute;
  left:50%;
  top:50%;
}
.half#top {
  border-bottom:$paper-height / 2 solid $paper;
  border-left:30px solid transparent;
  border-right:30px solid transparent;
  height:0;
  width:340px;
  animation-name:paper-top;
  animation-fill-mode:forwards;
  animation-timing-function:ease;
  animation-duration:5s;
  animation-delay:9s;
  transform:translateX(-50%) translateY(calc(-50% - 62px));
}
.half#bottom {
  border-bottom:$paper-height / 2 solid $paper;
  border-left:30px solid transparent;
  border-right:30px solid transparent;
  height:0;
  width:400px;
  z-index:3;
  animation-name:paper-bottom;
  animation-fill-mode:forwards;
  animation-timing-function:ease;
  animation-duration:5s;
  animation-delay:9s;
  transform:translateX(-50%) translateY(calc(-50% + 62px));
}

@keyframes paper-top {
  99% {opacity:1;}
  100% {transform:rotateZ(-180deg) translateY(2000px);opacity:0;}
}
@keyframes paper-bottom {
  99% {opacity:1;}
  100% {transform:rotateZ(360deg) translateY(2000px);opacity:0;}
}

#cut {
  position:absolute;
  height:2px;
  background:$bg;
  top:50%;
  left:50%;
  transform:translateX(calc(-50% - 200px)) translateY(calc(-50% - 2px));
  animation-name:cut;
  animation-duration:10s;
  animation-fill-mode:forwards;
  animation-timing-function:ease;
}
@keyframes cut {
  10% {width:0;}
  30% {width:190px;}
  50% {width:390px;}
  70% {width:590px;}
  90% {width:800px;}
  90.1% {width:0;}
}

#text {
  position:absolute;
  font-size:7em;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
  top:50%;
  z-index:-1;
  font-family:'Roboto', sans-serif;
  color:$scissors;
}

#firstline {
  margin-left:50px;
}
</style>
