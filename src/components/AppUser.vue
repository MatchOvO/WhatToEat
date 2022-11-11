<template>
  <div class="user-container">
    <UserInfo/>
    <UserBottom/>
    <transition>
      <component :is="coverComponent"/>
    </transition>
  </div>
</template>

<script setup>
import UserInfo from '@/components/UserInfo'
import UserBottom from '@/components/UserBottom'
import bus from "@/bus";
import UserLogin from '@/components/UserLogin'
import UserRegister from '@/components/UserRegister'
import {markRaw, onBeforeUnmount, onMounted, ref} from "vue";

const coverComponent = ref(undefined)

onMounted(()=>{
  bus.on('openUserLogin',()=>{
    coverComponent.value = markRaw(UserLogin)
  })
  bus.on('closeUserLogin',()=>{
    coverComponent.value = undefined
  })
  bus.on('openUserRegister',()=>{
    coverComponent.value = markRaw(UserRegister)
  })
  bus.on('closeUserRegister',()=>{
    coverComponent.value = undefined
  })
})

onBeforeUnmount(()=>{
  bus.off('openUserLogin')
  bus.off('closeUserLogin')
  bus.off('openUserRegister')
  bus.off('closeUserRegister')

})
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