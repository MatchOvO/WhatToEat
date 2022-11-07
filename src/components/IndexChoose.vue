<template>
<div class="index-choose-shell cover-shell">
  <div class="index-choose-container cover-container">
    <i class="fas fa-plus quit-icon" @click.prevent="closeIndexChoose"></i>
    <h1 class="index-choose-title">{{titleText}}</h1>
    <transition>
      <ChooseResult v-show="titleText==='结果'" :randomMenu="props.randomMenu"/>
    </transition>
      <div class="loading-box" v-if="titleText==='loading'">
        <i class="fas as fa-spinner fa-pulse"></i>
      </div>
    <transition>
      <ChooseQuestion v-show="titleText==='问题'" :randomQuestion="props.randomQuestion"/>
    </transition>
  </div>
</div>
</template>

<script setup>
import ChooseQuestion from '@/components/ChooseQuestion'
import ChooseResult from  '@/components/ChooseResult'
import bus from "@/bus";
import {reactive, ref} from "vue";

const titleText = ref('问题')
const props = defineProps({
  randomMenu: {
    type:String,
    default:'火柴'
  },
  randomQuestion:{
    type:Object,
    default:()=>{
      return{
        question:'错误',
        option:[]
      }
    }
  }
})

bus.on('switchToResult',()=>{
  titleText.value = 'loading'
  setTimeout(()=>{
    titleText.value = '结果'
  },1000)
})

bus.on('normalizeTitle',()=>{
  titleText.value = '问题'
})

const closeIndexChoose = ()=>{
  titleText.value = '问题'
  bus.emit('closeIndexChoose')
}
</script>

<style scoped lang="less">
.index-choose-shell{
  .index-choose-container{
    display: flex;
    flex-direction: column;
    font-family: YouShe;
    position: relative;
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
    .index-choose-title{
      font-size: 25px;
      text-align: center;
    }
    .loading-box{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-color: var(--first-theme-color);
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-size: 50px;
      }
    }
  }
}
</style>