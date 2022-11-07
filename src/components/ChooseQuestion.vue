<template>
<div class="choose-question-container">
  <h2 class="question-text">Q:{{randomQuestion.question}}</h2>
  <div class="option-container">
    <button class="option-button" @click.prevent="switchToResult" v-for="option in randomQuestion.options" :key="option">
      <span>{{option}}</span>
    </button>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";

const props = defineProps({
  randomQuestion:{
    type:Object
  }
})
const switchToResult = ()=>{
  bus.emit('switchToResult')
}
</script>

<style scoped lang="less">
.choose-question-container{
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .question-text{
    height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 20px;
  }
  .option-container{
    .option-button{
      margin-bottom: 20px;
      width: 80%;
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
      &:hover{
        transform: scale(.9);
      }
      span{
        line-height: 50px;
        font-size: 18px;
      }
    }
  }
}
</style>