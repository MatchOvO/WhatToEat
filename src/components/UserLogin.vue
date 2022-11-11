<template>
<div class="login-shell cover-shell ">
  <div class="login-container cover-container">
    <transition>
      <component :is="coverComponent"/>
    </transition>
    <i class="fas fa-plus quit-icon" @click.prevent="closeBox"></i>
    <h1 class="login-title">登陆</h1>
    <div class="input-box">
      <p>用户名:</p>
      <input type="text" v-model="username">
      <p>密码:</p>
      <input type="password"  v-model="password">
      <span class="alert-text shake-animation" v-show="loginError">用户名/密码错误</span>
    </div>

    <button class="short-button" @click.prevent="login">登陆</button>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";
import {useUserStore} from "@/stores/user";
import axios from 'axios'
import LoadingCover from "@/components/LoadingCover";
import {markRaw, ref} from "vue";
import router from "@/router";

const user = useUserStore()
const username = ref('')
const password = ref('')
const coverComponent = ref(undefined)
const loginError = ref(false)

const randomNum = (max)=>Math.trunc(Math.random() * max) + 1

const closeBox = ()=>{
  bus.emit('closeUserLogin')
}

const login = ()=>{
  loginError.value = false
  const postPath = `/apiG/login`
  console.log(postPath)
  if (username.value !== '' && password.value !== ''){
    coverComponent.value = markRaw(LoadingCover)
    axios.post(postPath,{
      username:username.value,
      password:password.value
    }).then((res)=>{
      const data = res.data
      localStorage.jwtToken = data.jwtToken
      user.username = data.username
      user.avatarUrl = data.avatarUrl ? data.avatarUrl : ''
      user.avatar = data.avatar ? data.avatar : `${randomNum(6)}`
      user.community = data.community ? data.community : ''
      user.isGuest = data.isGuest ? data.isGuest : false
      if (data.personalMenu){
        data.personalMenu.forEach(item=>{
          user.personalMenu.push(item)
        })
      }
      coverComponent.value = undefined
      bus.emit('onTinyAlert','登陆成功')
      bus.emit('closeUserLogin')
      router.replace('/')
    }).catch(e=>{
      if (e.response.status === 404 || e.response.status === 500){
        bus.emit('onTinyAlert','网络错误')
        coverComponent.value = undefined
      }else{
        coverComponent.value = undefined
        loginError.value = true
      }
    })
  }else{
    bus.emit('onTinyAlert','用户名或密码不能为空')
  }
}

</script>

<style scoped lang="less">
.login-shell{
  .login-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-family: YouShe;
    .quit-icon{
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 10px;
      top: 10px;
      border-radius: 50%;
      background-color: rgba(255,255,255,.5);
      transform: rotateZ(45deg);
    }
    .login-title{
      width: 100%;
      font-size: 25px;
      text-align: left;
    }
    .input-box{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      p{
        width: 100%;
        font-size: 20px;
        text-align: left;
        margin-left: 10px;
      }
      input{
        margin: 10px 10px 10px 20px;
        padding-left: 10px;
        height: 35px;
        background-color: transparent;
        border-radius: 10px;
        border: 4px solid #2c3e50;
        font-size: 18px;
        font-family: YouShe;
        &:focus{
          border: 4px solid #2c3e50;
          outline: none;
        }
      }
      .alert-text{
        font-size: 14px;
        color: #fff;
        opacity: .5;
      }

    }
    button{
      margin: 20px;
      font-family: YouShe;
      font-size: 18px;
    }
  }
}
</style>