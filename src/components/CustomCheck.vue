<template>
<div class="custom-add-shell cover-shell">
  <div class="custom-add-container cover-container">
    <i class="fas fa-plus quit-icon" @click.prevent="closeCustomAdd"></i>
    <h1 class="custom-add-title">我的菜谱</h1>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";
const closeCustomAdd = ()=>{
  bus.emit('closeCustomCheck')
}
</script>

<style scoped lang="less">
.custom-add-shell{
  .custom-add-container{
    display: flex;
    flex-direction: column;
    .quit-icon{
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 9999;
      right: 10px;
      top: 10px;
      border-radius: 50%;
      background-color: rgba(255,255,255,.5);
      transform: rotateZ(45deg);
    }
    .custom-add-title{
      font-size: 25px;
      text-align: left;
    }
  }
}
</style>