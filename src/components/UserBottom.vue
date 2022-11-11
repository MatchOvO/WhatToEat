<template>
  <div class="user-bottom-shell">
    <div class="guest-operation" v-show="user.isGuest">
      <button class="long-button operation-button" @click.prevent="userLogin">登陆</button>
      <button class="long-button operation-button" @click.prevent="userRegister">注册</button>
    </div>
    <div class="onLogin-operation" v-show="!user.isGuest">
      <button class="long-button operation-button" @click.prevent="updateInfo">修改个人信息</button>
      <button class="long-button operation-button" @click.prevent="userLogout">退出登陆</button>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import bus from "@/bus";
import router from "@/router";

const user = useUserStore()

const userLogin = ()=>{
  setTimeout(()=>{
    bus.emit('openUserLogin')
  },200)
}
const userRegister = ()=>{
  setTimeout(()=>{
    bus.emit('openUserRegister')
  })
}
const updateInfo = ()=>{
  bus.emit('onTinyAlert','当前版本暂不支持')
}
const userLogout = ()=>{
  setTimeout(()=>{
    localStorage.removeItem('jwtToken')
    location.reload()
  },200)
}
</script>

<style scoped lang="less">
.user-bottom-shell{
  .operation-button{
    margin-bottom: 20px;
    font-size: 18px;
  }
}
</style>