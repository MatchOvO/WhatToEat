<template>
  <div class="index-container">
    <h1 class="bg-text left">今天</h1>
    <h1 class="bg-text right">吃啥</h1>
    <transition>
      <IndexChoose v-show="showIndexChoose" :randomMenu="randomMenu" :randomQuestion="randomQuestion.question"/>
    </transition>
    <IndexClock/>
    <IndexBox/>
  </div>
</template>

<script setup>
import IndexClock from '@/components/IndexClock'
import IndexBox from '@/components/IndexBox'
import IndexChoose from '@/components/IndexChoose'
import bus from "@/bus";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/user";

const showIndexChoose = ref(false)
const randomMenu = ref(undefined)
const randomQuestion = reactive({question:{}})
const userInfo = useUserStore()

const questionList = [
  {
    question:'今天心情怎么样？',
    options:['开心','一般','郁闷','伤心']
  },
  {
    question:'选择一个颜文字代表你的心情',
    options:['૮₍ ˶ᵔᵕᵔ˶₎ა','૮₍ •ᴗ•₎ა','૮₍ •᎔•₎ა','૮₍ ◞‸◟₎ა ']
  },
  {
    question: '今天天气怎么样？',
    options: ['晴天','多云','阴天','下雨']
  },
  {
    question: '今天天气怎么样？',
    options: ['☀️','⛅️','☁️','🌧️']
  },
  {
    question: '今天有没有不愉快的事情呀？',
    options: ['有，哎～（叹气）','没有，我很开心～']
  },
  {
    question: '今天有没有特别愉快的事情？',
    options: ['有！！！','好像没有...']
  }

]

function getRandomMenu() {
  axios.get(`/api/randomMenu?source=${localStorage.source}&type=${userInfo.type}`,{
    headers:{
      Authorization:'Bearer '+localStorage.jwtToken
    }
  }).then(res=>{
    const data = res.data
    randomMenu.value = data.randomMenu
    if(!randomMenu.value){
      setTimeout(()=>{
        showIndexChoose.value = false
        if(localStorage.source === 'personal'){
          bus.emit('onTinyAlert','没有添加个人菜谱')
        }else if(localStorage.source === 'community'){
          bus.emit('onTinyAlert','社区无人添加(此种类)菜谱～')
        }else if(localStorage.source === 'public'){
          bus.emit('onTinyAlert','没有人添加(此种类)菜谱～')
        }
      },500)
    }
  }).catch(e=>{
    console.log(e.message)
    bus.emit('onTinyAlert','网络错误')
  })
}

onMounted(()=>{
  bus.on('getOtherMenu',()=>{
    getRandomMenu()
  })

  bus.on('openIndexChoose',()=>{
    const randomKey = Math.trunc(Math.random() * questionList.length)
    console.log(randomKey)
    randomQuestion.question = questionList[randomKey]
    getRandomMenu()
    setTimeout(()=>{
      showIndexChoose.value = true
    },200)
  })

  bus.on('closeIndexChoose',()=>{
    showIndexChoose.value = false
  })
})

onBeforeUnmount(()=>{
  bus.off('getOtherMenu')
  bus.off('openIndexChoose')
  bus.off('closeIndexChoose')

})

</script>

<style scoped lang="less">
  .index-container{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .bg-text{
      position: absolute;
      z-index: 0;
      width: 200px;
      font-size: 200px;
      color: #ff7575;
      opacity: .2;
      font-family: YouShe;
    }
    .left{
      top: 20%;
      left: -70px;
    }
    .right{
      top: 35%;
      right: -70px;
    }
  }
</style>