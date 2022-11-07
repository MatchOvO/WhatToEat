<template>
  <div class="clock-shell">
    <span class="hour">{{hour}}</span>
    <span class="spacer"> : </span>
    <span class="minute">{{minutes}}</span>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
const nowTime = new Date();
const hour = ref(nowTime.getHours() < 10 ? "0" + nowTime.getHours() : nowTime.getHours())
const minutes = ref(nowTime.getMinutes() < 10 ? "0" + nowTime.getMinutes() : nowTime.getMinutes())

onMounted(()=>{
  setInterval(()=>{
    const time = new Date();
    hour.value = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    minutes.value = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
  },1000)
})
</script>

<style scoped lang="less">
  .clock-shell{
    position: relative;
    z-index: 1;
    margin-top: -30px;
    margin-bottom: 30px;
    width: 200px;
    height: 80px;
    display: flex;
    justify-content: space-around;
    span{
      font-size: 80px;
      font-family: 'YouShe';
      letter-spacing: 5px;
    }
    .spacer{
      animation: spark-animation 1s infinite;
    }
  }
  @keyframes spark-animation {
    0%{
      opacity: 0;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>