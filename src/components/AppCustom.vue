<template>
<div class="custom-container">
  <transition>
    <CustomAdd v-show="showCustomAdd"/>
  </transition>
  <transition>
    <CustomCheck v-show="showCustomCheck"/>
  </transition>
  <transition>
    <CustomType v-show="showCustomType"/>
  </transition>
  <h1 class="custom-title">
    菜谱
    <i class="fas fa-ice-cream"></i>
  </h1>
  <div class="custom-list">
    <form class="source-form">
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
      <p class="custom-attention-text" v-if="communityDisabled">社区菜谱需要登陆后才能使用，点击右下角登陆</p>
    </form>
    <div class="type-nav">
      <h2 class="type-title">种类</h2>
      <form class="type-form">
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-list-alt"></i>
            <div class="content-nav">
              <h2>全部</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-hamburger"></i>
            <div class="content-nav">
              <h2>主食</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="主食" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-cocktail"></i>
            <div class="content-nav">
              <h2>饮品</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="饮品" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-coffee"></i>
            <div class="content-nav">
              <h2>奶茶</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="奶茶" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-apple-alt"></i>
            <div class="content-nav">
              <h2>水果</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="水果" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-ice-cream"></i>
            <div class="content-nav">
              <h2>甜品</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" value="甜品" id="type-choose-btn">
        </div>
        <div class="type-choose-nav">
          <div class="type-text-nav">
            <i class="fas fa-user-circle"></i>
            <div class="content-nav">
              <h2>自定义</h2>
            </div>
          </div>
          <input class="type-choose-btn" type="radio" name="customType" v-model="user.type" :value="user.typeCustom" id="type-choose-btn" @click="openCustomType">
        </div>
      </form>
    </div>
    <div class="personal-nav">
      <h2 class="personal-title">
        我的菜谱
      </h2>
      <button class="person-button long-button" @click.prevent="openCustomAdd">
        <i class="fas fa-plus-circle"></i>
        <span>添加菜谱</span>
      </button>
      <button class="person-button long-button" @click.prevent="openCustomCheck">
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
import CustomType from '@/components/CustomType'
import bus from "@/bus";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const user = useUserStore()
const showCustomAdd = ref(false)
const showCustomCheck = ref(false)
const showCustomType = ref(false)



onMounted(()=>{
  bus.on('closeCustomAdd',()=>{
    showCustomAdd.value = false
  })

  bus.on('closeCustomCheck',()=>{
    showCustomCheck.value = false
  })

  bus.on('closeCustomType',()=>{
    showCustomType.value = false
  })
})

onBeforeUnmount(()=>{
  bus.off('closeCustomAdd')
  bus.off('closeCustomCheck')
  bus.off('closeCustomType')
})

const communityDisabled = computed(()=>{
  const result = (user.community === '')
  return result
})
const openCustomType = ()=>{
  setTimeout(()=>{
    showCustomType.value = true
  },200)
}
const openCustomAdd = ()=>{
  setTimeout(()=>{
    showCustomAdd.value = true
  },200)
}
const openCustomCheck = ()=>{
  bus.emit('openCheckLoading')
  setTimeout(()=>{
    showCustomCheck.value = true
  },200)
}


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
    .source-form{
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
      .custom-attention-text{
        font-size: 12px;
        opacity: .5;
      }
    }
    .type-nav{
      width: 100%;
      margin-top: 10px;
      .type-title{
        font-size: 25px;
        text-align: left;
        padding-left: 50px;
      }
      .type-form{
        width: 80%;
        margin: 10px auto ;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .type-choose-nav{
          margin: 5px;
          width: 45%;
          position: relative;
          .type-text-nav{
            display: flex;
            position: absolute;
            z-index: 2;
            align-items: center;
            left: 20px;
            top: 20px;
            i{
              font-size: 20px;
            }
            .content-nav{
              margin-left: 20px;
              h2{
                font-size: 20px;
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
          .type-choose-btn{
            appearance: none;
            width: 100%;
            height: 50px;
            border-radius: 10px;
            background-color: rgba(255,255,255,.8);
            box-shadow: 0 5px 10px rgba(0,0,0,.1);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            transition: all .3s;
            &:checked{
              background-color: var(--first-theme-color);
            }
          }

        }
      }
    }
    .personal-nav{
      margin-top: 20px;
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