<template>
  <div class="app-footer-nav" id="app-footer-nav">
    <router-link class="app-footer-icon" active-class="app-footer-icon-active" to="/">
      <img class="icon" :src="require('../../public/img/taozi.png')">
    </router-link>
    <router-link class="app-footer-icon" active-class="app-footer-icon-active" to="/custom" id="second-step">
      <img class="icon" :src="require('../../public/img/caomei.png')">
    </router-link>
    <router-link class="app-footer-icon" active-class="app-footer-icon-active" to="/user">
      <img class="icon" :src="require('../../public/img/chelizi.png')">
    </router-link>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
  .app-footer-nav{
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 50px;
    padding-bottom: 30px;
    background-color: var(--first-theme-color);
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px rgba(0,0,0,.5);

    .app-footer-icon{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--second-theme-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all .3s;
      .icon{
        width: 70%;
        height: 70%;
      }
    }
    .app-footer-icon-active{
      background-color: transparent;
      -webkit-animation: scale-animation 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
      animation: scale-animation 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
      .icon{
        filter: drop-shadow(0 0 5px rgba(0,0,0,.4));
      }
    }
  }

  .swing-in-top-fwd {
    -webkit-animation: swing-in-top-fwd 0.5s both;
    animation: swing-in-top-fwd 0.5s both;
  }

  @keyframes scale-animation {
    0%{
      transform: scale(1);
    }
    80%{
      transform: scale(1.7);
    }
    100%{
      transform: scale(1.6);
    }
  }
</style>