<template>
<div class="custom-add-shell cover-shell">
  <div class="custom-add-container cover-container">
    <transition>
      <component :is="coverComponent"/>
    </transition>
    <i class="fas fa-plus quit-icon" @click.prevent="closeCustomAdd"></i>
    <h1 class="custom-add-title">添加菜谱</h1>
    <div class="input-box">
      <p>名称:</p>
      <input type="text" v-model="menuName">
    </div>
    <button class="short-button" @click.prevent="addMenu">添加</button>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";
import {useUserStore} from "@/stores/user";
import axios from 'axios'
import LoadingCover from "@/components/LoadingCover";
import {markRaw, ref} from "vue";
const user = useUserStore()
const menuName = ref('')
const coverComponent = ref(undefined)

const closeCustomAdd = ()=>{
  bus.emit('closeCustomAdd')
}

const addMenu = ()=>{
  const postPath = `/api/addMenu`
  console.log(postPath)
  if (menuName.value !== ''){
    coverComponent.value = markRaw(LoadingCover)
    axios.post(postPath,{
      menuName:menuName.value,
      community:user['community']
    },{
      headers:{
        Authorization:'Bearer '+localStorage.jwtToken
      }
    }).then(()=>{
      coverComponent.value = undefined
      bus.emit('onTinyAlert','添加成功')
      bus.emit('closeCustomAdd')
    }).catch(e=>{
      console.log(e.message)
      coverComponent.value = undefined
      bus.emit('onTinyAlert','网络错误，添加失败')
    })
  }else{
    bus.emit('onTinyAlert','名称不能为空')
  }
}

</script>

<style scoped lang="less">
.custom-add-shell{
  .custom-add-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
    .custom-add-title{
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
    }
    button{
      margin: 20px;
      font-family: YouShe;
      font-size: 18px;
    }
  }
}
</style>