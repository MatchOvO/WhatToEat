<template>
<div class="tiny-alert-nav">
  <span>{{status.alertText}}</span>
</div>
</template>

<script setup>
import {useStatusStore} from '@/stores/status'
const status = useStatusStore()
</script>

<style scoped lang="less">
  .tiny-alert-nav{
    width: 140px;
    height: 40px;
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;
    background-color: rgba(0,0,0,.8);
    transform: translateX(-70px) translateY(-20px);
    span{
      color: white;
      font-size: 12px;
      line-height: 40px;
      font-family: YouShe;
    }
  }
</style>