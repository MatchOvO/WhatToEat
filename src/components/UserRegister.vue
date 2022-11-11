<template>
<div class="register-shell cover-shell">
  <div class="register-container cover-container">
    <transition>
      <component :is="coverComponent"/>
    </transition>
    <i class="fas fa-plus quit-icon" @click.prevent="closeBox"></i>
    <h1 class="register-title">注册</h1>
    <div class="input-box">
      <p>用户名：</p>
      <input type="text" v-model="username">
      <p>密码：</p>
      <input type="password" v-model="password">
      <p>确认你的密码：</p>
      <input type="password" v-model="confirmPassword">
    </div>
    <button class="short-button" @click.prevent="nextStep">下一步</button>
    <transition>
      <div class="register-step2-nav" v-if="onNextStep">
        <i class="fas fa-plus quit-icon" @click.prevent="closeBox"></i>
        <h1 class="register-title">选择你的社区</h1>
        <div class="input-box2">
          <p>社区：</p>
          <input type="text" v-model="community" placeholder="例如:吉林大学-南湖校区" >
          <div class="communityList-place" v-if="!(communityList.length)"></div>
            <transition>
              <ul class="communityList" v-if="communityList.length">
                <li v-for="item in communityList" :key="item" @click="useCommunityList(item)">{{ item }}</li>
              </ul>
            </transition>
        </div>
        <button class="short-button" @click.prevent="register">注册</button>
      </div>
    </transition>
  </div>
</div>
</template>

<script setup>
import bus from "@/bus";
import {useUserStore} from "@/stores/user";
import axios from 'axios'
import LoadingCover from "@/components/LoadingCover";
import {markRaw, reactive, ref, watch} from "vue";
const user = useUserStore()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const community = ref('')
const onNextStep = ref(false)
const communityList = reactive([])
const coverComponent = ref(undefined)
let axiosId = undefined

const randomNum = (max)=>Math.trunc(Math.random() * max) + 1

const closeBox = ()=>{
  bus.emit('closeUserLogin')
}

const nextStep = ()=>{
  if (
      username.value !== ''
      && password.value !== ''
      && password.value === confirmPassword.value
  ){
      onNextStep.value = true
  }else if(username.value === ''){
    bus.emit('onTinyAlert','用户名不能为空')
  }else if(password.value !== ''){
    bus.emit('onTinyAlert','密码不能为空')
  }else if (password.value === confirmPassword.value){
    bus.emit('onTinyAlert','前后密码不一致')
  }
}

const getCommunityList = ()=>{
  clearTimeout(axiosId)
  communityList.splice(0,5)
  axiosId = setTimeout(()=>{
    axios.get(`/apiG/communityList?keywords=${community.value}`).then((res)=>{
      res.data.forEach((item,index)=>{
        if (index < 6) communityList.push(item)
      })
    }).catch(e=>{
      console.log(e)
      bus.emit('onTinyAlert','网络错误')
    })
  },200)
}

const useCommunityList = (text)=>{
  community.value = text
}

const register = ()=>{
  const postPath = `/apiG/register`
  console.log(postPath)
  if (username.value !== ''
      && password.value !== ''
      && password.value === confirmPassword.value
      && community.value !== '')
    {
    coverComponent.value = markRaw(LoadingCover)
    axios.post(postPath,{
      username:username.value,
      password:password.value,
      community:community.value
    },{
      headers:{
        Authorization:'Bearer '+localStorage.jwtToken
      }
    }).then((res)=>{
      const data = res.data
      localStorage.jwtToken = data.jwtToken
      user.username = data.username
      user.avatarUrl = data.avatarUrl ? data.avatarUrl : ''
      user.avatar = data.avatar ? data.avatar : `${randomNum(6)}`
      user.community = data.community ? data.community : ''
      user.isGuest = data.isGuest ? data.isGuest : false
      if (data.personalMenu){
        data.personalMenu.forEach(item=>{
          user.personalMenu.push(item)
        })
      }
      coverComponent.value = undefined
      bus.emit('onTinyAlert','注册成功')
      bus.emit('closeUserRegister')
    }).catch(e=>{
      console.log(e.message)
      if(e.response.status === 409){
        coverComponent.value = undefined
        bus.emit('onTinyAlert','用户名已存在，注册失败')
        onNextStep.value = false
      }else{
        coverComponent.value = undefined
        bus.emit('onTinyAlert','网络错误，注册失败')
      }
    })
  }else{
    bus.emit('onTinyAlert','社区名称不能为空')
  }
}

watch(community, () => {
  getCommunityList()
})

</script>

<style scoped lang="less">
.register-shell{
  .register-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-family: YouShe;
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
    .register-title{
      width: 100%;
      font-size: 25px;
      text-align: left;
    }
    .input-box{
      height: 300px;
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
    .register-step2-nav{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      background-color: var(--first-theme-color);
      border-radius: 20px;
      padding: 20px;
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
      .register-title{
        width: 100%;
        font-size: 25px;
        text-align: left;
      }
      .input-box2{
        height: 300px;
        width: 100%;
        flex-grow: 1;
        p{
          width: 100%;
          font-size: 20px;
          text-align: left;
          margin-top: 10px;
          margin-left: 10px;
        }
        input{
          width: 220px;
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
        .communityList-place{
          height: 195px;
          box-sizing: border-box;
          padding-top: 10px;
          padding-bottom: 10px;
          //margin: -5px 10px 10px 20px;
          border-radius: 10px;
        }
        .communityList{
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
}
</style>