<template>
  <transition name="loadingBox" appear>
    <LoadingBox v-if="!isLoaded"/>
  </transition>
  <transition>
    <component :is="appCoverEl"/>
  </transition>
  <MainApp/>
</template>

<script setup>
import LoadingBox from "@/components/LoadingBox"
import MainApp from "@/components/MainApp"
import TinyAlert from '@/components/TinyAlert'
import {useUserStore} from "@/stores/user";
import {useStatusStore} from "@/stores/status";
import bus from '@/bus/index'
import axios from 'axios'
import {ref, onMounted, watch, markRaw} from "vue";

const status = useStatusStore()
const user = useUserStore()
const isLoaded = ref(false)
const appCoverEl = ref(undefined)
const randomNum = (max)=>Math.trunc(Math.random() * max) + 1
bus.on('onTinyAlert',(text)=>{
  status.alertText = text
  appCoverEl.value = markRaw(TinyAlert)
  setTimeout(()=>{
    appCoverEl.value = undefined
  },3000)
})
/**
 * AJAX or register
 */
const source = localStorage.source
if (!source) localStorage.source = 'public'
user.source = source
const jwtToken = localStorage.jwtToken

function guestLogin() {
  axios.get('/apiG/guestLogin').then(res => {
    const data = res.data
    user.username = data.username
    user.avatarUrl = data.avatarUrl ? data.avatarUrl : ''
    user.avatar = data.avatar ? data.avatar : `${randomNum(6)}`
    user.community = data.community ? data.community : ''
    user.isGuest = data.isGuest ? data.isGuest : true
    localStorage.jwtToken = data.jwtToken
  }).catch(e => {
    console.log(e.message)
    user.username = '网络错误'
    user.isGuest = true
    user.avatar = `${randomNum(6)}`
    bus.emit('onTinyAlert', '网络错误')
  })
}

function getUser() {
  axios.get('/api/getUser', {
    headers: {
      Authorization: 'Bearer ' + jwtToken
    }
  }).then(res => {
    const data = res.data
    user.username = data.username
    user.avatarUrl = data.avatarUrl ? data.avatarUrl : ''
    user.avatar = data.avatar ? data.avatar : `${randomNum(6)}`
    user.community = data.community ? data.community : ''
    user.isGuest = data.isGuest ? data.isGuest : false
    if (data.personalMenu) {
      data.personalMenu.forEach(item => {
        user.personalMenu.push(item)
      })
    }
  }).catch(e => {
    console.log(e.message)
    if (e.response.status === 401){
      localStorage.removeItem('jwtToken')
      bus.emit('onTinyAlert', '登陆失败，请重新登陆')
      guestLogin()
    }else{
      user.username = '网络错误'
      user.isGuest = true
      user.avatar = `${randomNum(6)}`
      bus.emit('onTinyAlert', '网络错误')
    }
  })
}

if (!jwtToken) {
  guestLogin();
}else{
  getUser();
}

onMounted(()=>{
  setTimeout(()=>{
    isLoaded.value = true
  },1000)
  bus.on('onLoaded',()=>{
    console.log('onLoaded')
  })
})

watch(()=>user.source,
    (source)=>{
      localStorage.source = source
    }
)
</script>

<style lang="less">
:root{
  --first-theme-color:#ff7575;
  --second-theme-color:#ffdcdc;
  /*--second-theme-color:aqua;*/
  /*--first-theme-color:blue;*/
}

html {
  height: 100%;
  width: 100vw;
  overflow: hidden;
}

html,
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: var(--second-theme-color);
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.bg-blur{
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.short-button{
  width: 100px;
  height: 40px;
  border: none;
  background-color: var(--second-theme-color);
  box-shadow: 0 3px 5px rgba(0,0,0,.3),0 0 0 5px rgba(255,255,255,.5);
  border-radius: 20px;
  transition: all .3s;
  color: #2c3e50;
}

.short-button:hover{
  background-color: var(--first-theme-color);
  box-shadow: 0 3px 5px rgba(0,0,0,0),0 0 0 5px rgba(255,255,255,.8);
}

.long-button{
  width: 60%;
  height: 50px;
  border: none;
  border-radius: 25px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #2c3e50;
  font-family: YouShe;
  transition: all .5s;
  cursor: pointer;
  &:hover{
     background-color: var(--first-theme-color);
   }
}

.cover-shell{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.cover-container,
.cover-shell>div{
  width: 75%;
  height: 400px;
  padding: 20px;
  position: relative;
  z-index: 9999;
  border-radius: 20px;
  background-color: var(--first-theme-color);
  box-shadow: 0 10px 50px var(--first-theme-color), 0 0 0 15px rgba(255,255,255,.7);
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.loadingBox-leave-active{
  -webkit-animation: fade-out 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-out 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.v-enter-active{
  -webkit-animation: fade-in .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.v-leave-active{
  -webkit-animation: fade-out .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-out .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.shake-animation {
  -webkit-animation: shake-horizontal 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  animation: shake-horizontal 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}
@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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
@-webkit-keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
  }
}
@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
  }
}
.swing-enter-active{
  -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
  animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.swing-leave-active{
  -webkit-animation: swing-in-top-fwd .3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
  animation: swing-in-top-fwd .3s  both;
  animation-direction: reverse;
  -webkit-animation-direction: reverse;
}

@-webkit-keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}

</style>

