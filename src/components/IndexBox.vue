<template>
<div class="index-box-shell" id="first-step">
  <p>到饭点了...</p>
  <p>还在纠结今天吃什么吗？</p>
  <div class="index-box-img-container">
    <img :src="imgPath">
  </div>
  <p>点击下方按钮，让我帮你选择~</p>
  <button class="short-button index-button" @click.prevent="openIndexChoose"><span>GO</span><i>➞</i></button>
</div>
</template>

<script setup>
import {ref} from "vue";
import bus from "@/bus";

const randomNum = Math.trunc(Math.random() * 6) + 1
const imgPath = ref(`/img/people${randomNum}.png`)

const openIndexChoose = ()=>{
  bus.emit('openIndexChoose')
}
</script>

<style scoped lang="less">
.index-box-shell{
  position: relative;
  z-index: 1;
  width: 75%;
  padding: 20px;
  background-color: var(--first-theme-color);
  box-sizing: border-box;
  height: 360px;
  border-radius: 20px;
  box-shadow: 0 10px 50px var(--first-theme-color), 0 0 0 15px rgba(255,255,255,.7);
  font-family: YouShe;
  p{
    font-size: 18px;
  }
  .index-box-img-container{
    height: 180px;
    margin-bottom: 20px;
    img{
      height: 100%;
    }
  }
  .index-button{
    margin-top: 20px;
    font-size: 20px;
    position: relative;
    font-family: YouShe;
    span{
      position: relative;
      left: -5px;
    }
    i{
      font-size: 20px;
      position: absolute;
      right: 15px;
      transition: all .3s;
    }
    &:hover{
      i{
        right: 10px;
      }
    }
  }

}
</style>