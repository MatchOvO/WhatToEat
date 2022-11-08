<template>
<div class="choose-result-container">
  <h2 class="result-h2">为你选择：</h2>
  <h3 class="result-h3">{{randomMenu}}</h3>
  <div class="btn-container">
    <button class="switch" @click.prevent="switchMenu">
      <span>更换</span>
    </button>
    <button class="confirm" @click.prevent="confirmMenu">
      <span>确认</span>
    </button>
  </div>
</div>
</template>

<script setup>
import bus from '@/bus'
import axios from "axios";

const props = defineProps({
  randomMenu:String
})
const switchMenu = ()=>{
  bus.emit('getOtherMenu')
  bus.emit('switchToResult')
}
const confirmMenu = ()=>{
  function confirmAxios(times) {
    console.log(props.randomMenu)
    axios.post('/api/confirmMenu',{
      menuName:props.randomMenu
    }).catch(e=>{
      if (times <= 0){
        setTimeout(()=>{
          confirmAxios(times-1)
        },500)
      }else{
        console.log(e)
      }
    })
  }
  confirmAxios(5)
  bus.emit('closeIndexChoose')
  setTimeout(()=>{
    bus.emit('normalizeTitle')
  },500)
}
</script>

<style scoped lang="less">
.choose-result-container{
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  .result-h2{
    margin-top: -60px;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: left;
    margin-left: 40px;
    transition: all .3s;
  }
  .result-h3{
    font-size: 30px;
    transition: all .3s;
  }
  .btn-container{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0;
  }
  button{
      margin-bottom: 20px;
      width: 100px;
      height: 50px;
      border: none;
      border-radius: 25px;
      background-color: rgba(255,255,255,.5);
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      color: #2c3e50;
      font-family: YouShe;
      transition: all .5s;
      cursor: pointer;
      &:active{
        transform: scale(.9);
      }
      span{
        line-height: 50px;
        font-size: 18px;
      }
      i{
        font-size: 18px;
      }
  }
}
</style>