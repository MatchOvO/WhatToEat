<template>
  <div class="custom-type-shell cover-shell">
    <div class="custom-type-container cover-container">
      <i class="fas fa-plus quit-icon" @click.prevent="closeCustomType"></i>
      <h1 class="custom-type-title">选择自定义种类</h1>
      <div class="input-box">
        <p>种类:</p>
        <input type="text" v-model="inputType" >
<!--        <transition>-->
<!--          <ul class="typeList">-->
<!--            <li>主食</li>-->
<!--            <li>主食</li>-->
<!--            <li>主食</li>-->
<!--            <li>主食</li>-->
<!--          </ul>-->
<!--        </transition>-->
        <transition>
          <ul class="typeList" v-if="typeList.length">
            <li v-for="item in typeList" :key="item">{{item}}</li>
          </ul>
        </transition>
      </div>
      <button class="short-button" @click.prevent="confirmType">确认</button>
    </div>
  </div>
</template>

<script setup>
import bus from "@/bus";
import {useUserStore} from "@/stores/user";
import {reactive, ref} from "vue";

const user = useUserStore()
const typeList = reactive([])
const inputType = ref('')

const closeCustomType = ()=>{
  bus.emit('closeCustomType')
}
const confirmType = ()=>{
  if (inputType.value){
    user.typeCustom = inputType.value
    user.type = inputType.value
    bus.emit('closeCustomType')
  }else{
    bus.emit('onTinyAlert','种类名称不能为空')
  }

}
</script>

<style scoped lang="less">
.custom-type-shell{
  .custom-type-container{
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
    .custom-type-title{
      width: 100%;
      font-size: 25px;
      text-align: left;
    }
    .input-box{
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
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
      .typeList{
        padding-top: 10px;
        padding-bottom: 10px;
        margin: -5px 10px 10px 20px;
        border-radius: 10px;
        overflow: hidden;
        background-color: rgba(255,255,255,.5);
        li{
          width: 95%;
          height: 35px;
          padding-left: 25px;
          line-height: 35px;
          text-align: left;
          font-size: 15px;
          transition: all .3s;
          &:active{
            background-color: rgba(0,0,0,.2);
          }
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