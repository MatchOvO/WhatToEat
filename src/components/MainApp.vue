<template>
  <div class="main-app">
    <transition>
      <router-view></router-view>

    </transition>
    <AppFooter/>
  </div>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import AppFooter from '@/components/AppFooter'

  onMounted(()=>{
  })
</script>

<style scoped lang="less">
  .main-app{
    display: flex;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--second-theme-color);
  }
</style>