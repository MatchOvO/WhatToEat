<template>
<div class="custom-type-shell cover-shell">
  <div class="custom-type-container cover-container">
    <i class="fas fa-plus quit-icon" @click.prevent="closeCustomAdd"></i>
    <h1 class="custom-type-title">我的菜谱</h1>
    <div class="menuList-nav">
      <transition>
        <component :is="coverComponent"/>
      </transition>
      <ul class="menuList-ul">
        <li v-for="menu in user.personalMenu" :key="menu._id">
          <span class="menuName-text">{{ menu.menuName }}</span>
          <span class="menuType-text">种类:{{ menu.type }}</span>
          <i class="fas fa-trash-alt" @click="confirmDelete(menu._id)"></i>
        </li>
      </ul>
<!--      <ul class="menuList-ul">-->
<!--        <li>-->
<!--          <span class="menuName-text">汉堡包</span>-->
<!--          <span class="menuType-text">种类:主食</span>-->
<!--          <i class="fas fa-trash-alt" @click="confirmDelet()"></i>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span class="menuName-text">汉堡包</span>-->
<!--          <span class="menuType-text">种类:主食</span>-->
<!--          <i class="fas fa-trash-alt"></i>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span class="menuName-text">汉堡包</span>-->
<!--          <span class="menuType-text">种类:主食</span>-->
<!--          <i class="fas fa-trash-alt"></i>-->
<!--        </li>-->
<!--      </ul>-->
    </div>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";
import {useUserStore} from "@/stores/user";
import {markRaw, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import LoadingCover from '@/components/LoadingCover'
import axios from "axios";

const user = useUserStore()
// const coverComponent = ref(undefined)
const coverComponent = ref(markRaw(LoadingCover))

const confirmDelete = (_id)=>{
  if( confirm('是否删除') ){
    axios.post('/api/deleteMenu',{
      _id
    },{
      headers:{
        Authorization:'Bearer '+localStorage.jwtToken
      }
    }).then(()=>{
      user.personalMenu.forEach((menu,index)=>{
        if (menu._id === _id){
          user.personalMenu.splice(index,1)
        }
      })
    }).catch(e=>{
      console.log(e.message)
      bus.emit('onTinyAlert','网络错误，删除失败')
    })
  }
}
const getMenuList = ()=>{
  axios.get('/api/personalMenu',{
    headers:{
      Authorization:'Bearer '+localStorage.jwtToken
    }
  }).then(res=>{
    const data = res.data
    user.personalMenu = data
    coverComponent.value = undefined
  }).catch(e=>{
    setTimeout(()=>{
      console.log(e.message)
      bus.emit('onTinyAlert','网络错误，查询失败')
      bus.emit('closeCustomCheck')
      coverComponent.value = undefined
    },500)
  })
}
const closeCustomAdd = ()=>{
  bus.emit('closeCustomCheck')
}

onMounted(()=>{
  bus.on('openCheckLoading',()=>{
    coverComponent.value = markRaw(LoadingCover)
    getMenuList()
  })
})

onBeforeUnmount(()=>{
  bus.off('openCheckLoading')
})

</script>

<style scoped lang="less">
.custom-type-shell{
  .custom-type-container{
    display: flex;
    flex-direction: column;
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
    .custom-type-title{
      margin-bottom: 20px;
      font-size: 25px;
      text-align: left;
    }
    .menuList-nav{
      position: relative;
      flex-grow: 1;
      overflow: auto;
      .menuList-ul{
        li{
          box-sizing: content-box;
          height: 60px;
          margin: 10px;
          padding: 0 20px;
          background-color: rgba(255,255,255,.8);
          box-shadow: 0 5px 10px rgba(0,0,0,.1);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          i{
            width: 40px;
            height: 40px;
            //border-radius: 50%;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            //background-color: rgba(255,255,255,.8);
            background-color: var(--first-theme-color);
            box-shadow: 0 5px 5px rgba(0,0,0,.1);
          }
          .menuName-text{
            font-size: 18px;
            width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .menuType-text{
            font-size: 14px;

          }
        }
      }
    }
  }
}
</style>