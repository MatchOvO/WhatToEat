<template>
  <div class="user-container">
    <UserInfo/>
    <UserBottom/>
  </div>
</template>

<script setup>
import UserInfo from '@/components/UserInfo'
import UserBottom from '@/components/UserBottom'
</script>

<style scoped lang="less">
  .user-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
</style>