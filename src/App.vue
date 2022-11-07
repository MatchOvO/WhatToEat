<template>
  <transition name="loadingBox" appear>
    <LoadingBox v-if="!isLoaded"/>
  </transition>
  <transition>
    <TinyAlert v-if="onTinyAlert"/>
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
import {ref, onMounted, watch} from "vue";

const status = useStatusStore()
const user = useUserStore()
const isLoaded = ref(false)
const onTinyAlert = ref(false)
bus.on('onTinyAlert',(text)=>{
  status.alertText = text
  onTinyAlert.value = true
  setTimeout(()=>{
    onTinyAlert.value = false
  },3000)
})
/**
 * AJAX or register
 */
const source = localStorage.source
if (!source) localStorage.source = 'public'
user.source = source
const jwtToken = localStorage.jwtToken
if (!jwtToken) {
  axios.get('/api/guestLogin').then(res=>{
    const data = res.data
    user.username = data.username
    user.community = data.community
    user.isGuest = data.isGuest
    localStorage.jwtToken = data.jwtToken
  }).catch(e=>{
    console.log(e.message)
    user.username = '网络错误'
    user.isGuest = true
    bus.emit('onTinyAlert','网络错误')
  })
}else{
  axios.get('/api/getUser',{
    headers:{
      Authorization:'Bearer '+jwtToken
    }
  }).then(res=>{
    const data = res.data
    user.username = data.username
    user.community = data.community
    user.isGuest = data.isGuest
    data.personalMenu.forEach(item=>{
      user.personalMenu.push(item)
    })
  }).catch(e=>{
    console.log(e.message)
    user.username = '网络错误'
    user.isGuest = true
    bus.emit('onTinyAlert','网络错误')
  })
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

<style>
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
</style>
