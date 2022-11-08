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

const user = useUserStore()

const userLogin = ()=>{

}
const userRegister = ()=>{

}
const updateInfo = ()=>{

}
const userLogout = ()=>{

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