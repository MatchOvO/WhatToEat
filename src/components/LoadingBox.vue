<template>
  <div class="loading-box">
    <svg class="loading-box-icon">
      <use xlink:href="#peach-icon" style="height: 100%;width: 100%;"></use>
    </svg>
    <h1 class="loading-title">
      What To Eat
    </h1>
  </div>
</template>

<script>
export default {
  name: "LoadingBox"
}
</script>

<style scoped lang="less">
  .loading-box{
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: var(--first-theme-color);
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loading-box-icon{
      width: 100px;
      height: 100px;
      margin-left: 10px;
      -webkit-animation: fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
      animation: fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
    .loading-title{
      position: relative;
      font-size: 30px;
      font-weight: bold;
      -webkit-animation: fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
      animation: fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
  }
  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>