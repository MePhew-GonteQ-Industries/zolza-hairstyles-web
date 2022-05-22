<template>
  <div class="loader">
    <div class="loadingio-spinner-rolling-2lvmsmc11ry">
    <div class="ldio-wzocyciw6t">
    <div></div>
    </div></div>
  </div>
</template>

<script>
export default {
  name: 'CustomLoader',
};
</script>

<style lang='scss' scoped>
@keyframes ldio-wzocyciw6t {
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
}
.ldio-wzocyciw6t div {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 5px solid #1a92f0;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-wzocyciw6t div {
  animation: ldio-wzocyciw6t 1s linear infinite;
  top: 25px;
  left: 25px;
}
.loadingio-spinner-rolling-2lvmsmc11ry {
  width: 50px;
  height: 50px;
  display: inline-block;
  overflow: hidden;
}
.ldio-wzocyciw6t {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-wzocyciw6t div { box-sizing: content-box; }

</style>
