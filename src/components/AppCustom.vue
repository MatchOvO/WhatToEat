<template>
<div class="custom-container">
  <transition>
    <CustomAdd v-show="showCustomAdd"/>
  </transition>
  <transition>
    <CustomCheck v-show="showCustomCheck"/>
  </transition>
  <h1 class="custom-title">
    菜谱
    <i class="fas fa-ice-cream"></i>
  </h1>
  <div class="custom-list">
    <form>
      <div class="source-choose-nav">
        <div class="source-text-nav">
          <i class="fas fa-chart-pie"></i>
          <div class="content-nav">
            <h2>公共</h2>
<!--            <p>使用公共的菜谱，数据来源于所有参与者添加的菜谱</p>-->
          </div>
        </div>
        <input class="source-choose-btn" type="radio" name="customMenu" v-model="user.source" value="public" id="source-choose-btn">
      </div>
      <div class="source-choose-nav">
        <div class="source-text-nav">
          <i class="fas fa-user"></i>
          <div class="content-nav">
            <h2>个人</h2>
<!--            <p>使用个人的菜谱，数据来源于用个人添加的菜谱</p>-->
          </div>
        </div>
        <input class="source-choose-btn" type="radio" name="customMenu" v-model="user.source" value="personal">
      </div>
      <div class="source-choose-nav" >
        <div class="source-text-nav">
          <i class="fas fa-campground"></i>
          <div class="content-nav">
            <h2>社区</h2>
<!--            <p>使用你所在的社区的菜谱，数据来源于你所在社区参与者添加的菜谱</p>-->
          </div>
        </div>
        <input class="source-choose-btn" type="radio" name="customMenu" v-model="user.source" value="community" :disabled="communityDisabled">
      </div>
    </form>
    <div class="personal-nav">
      <h2 class="personal-title">
        我的菜谱
      </h2>
      <button class="person-button" @click.prevent="openCustomAdd">
        <i class="fas fa-plus-circle"></i>
        <span>添加菜谱</span>
      </button>
      <button class="person-button" @click.prevent="openCustomCheck">
        <span>查看我的菜谱</span>
      </button>
    </div>
    <div class="custom-footer"></div>
  </div>
</div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import CustomAdd from '@/components/CustomAdd'
import CustomCheck from '@/components/CustomCheck'
import bus from "@/bus";
import {computed, onBeforeUnmount, ref} from "vue";
const user = useUserStore()
const showCustomAdd = ref(false)
const showCustomCheck = ref(false)

bus.on('closeCustomAdd',()=>{
  showCustomAdd.value = false
})

bus.on('closeCustomCheck',()=>{
  showCustomCheck.value = false
})
const communityDisabled = computed(()=>{
  const result = (user.community === '')
  console.log(user.community,result)
  return result
})
const openCustomAdd = ()=>{
  setTimeout(()=>{
    showCustomAdd.value = true
  },200)
}
const openCustomCheck = ()=>{
  setTimeout(()=>{
    showCustomCheck.value = true
  },200)
}

onBeforeUnmount(()=>{
  bus.off('closeCustomAdd')
})

</script>

<style scoped lang="less">
.custom-container{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  font-family: YouShe;
  display: flex;
  flex-direction: column;
  .custom-title{
    display: flex;
    align-items: center;
    margin: 20px;
    text-align: left;
    font-size: 40px;
    i{
      font-size: 25px;
      margin-left: 10px;
    }
  }
  .custom-list{
    background-color: transparent;
    flex-grow: 1;
    overflow: hidden auto;
    form{
      display: flex;
      flex-direction: column;
      align-items: center;
      .source-choose-nav{
        width: 80%;
        position: relative;
        margin-bottom: 20px;
        .source-text-nav{
          display: flex;
          position: absolute;
          z-index: 2;
          align-items: center;
          left: 20px;
          top: 35px;
          width: 100%;
          i{
            font-size: 20px;
          }
          .content-nav{
            margin-left: 20px;
            h2{
              font-size: 20px;
              font-weight: bold;
              text-align: left;
            }
            p{
              width: 85%;
              font-size: 12px;
              text-align: left;
              margin-left: 10px;
            }
          }

        }
        .source-choose-btn{
          appearance: none;
          border-radius: 20px;
          width: 100%;
          height: 80px;
          background-color: rgba(255,255,255,.8);
          box-shadow: 0 5px 10px rgba(0,0,0,.1);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          transition: all .3s;
          &:checked{
            background-color: var(--first-theme-color);
          }
          &:disabled{
            background-color: rgba(0,0,0,.15);
          }
        }
      }
    }
    .personal-nav{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2{
        width: 100%;
        padding-left: 100px;
        text-align: left;
        font-size: 25px;
        margin-bottom: 20px;
      }
      .person-button{
        margin-bottom: 20px;
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
        span{
          line-height: 50px;
          font-size: 18px;
        }
        i{
          font-size: 18px;
        }
      }
    }
    .custom-footer{
      height: 50px;
    }
  }
}
</style>