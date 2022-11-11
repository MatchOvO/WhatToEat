<template>
  <div class="user-info-shell">
    <div class="user-avatar-nav">
      <img :src="imgPath">
    </div>
    <div class="user-text-info">
      <span class="username-text">{{user.username}}</span>
      <span class="community-text">{{user.community}}</span>
    </div>
  </div>
</template>

<script setup>
import {markRaw, ref} from "vue";
import {useUserStore} from "@/stores/user";


const user = useUserStore()
const imgPath = ref(``)
imgPath.value = user.avatarUrl ? user.avatarUrl : `/img/people${user.avatar}.png`




</script>

<style scoped lang="less">
.user-info-shell{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: YouShe;
  .user-avatar-nav{
    width: 120px;
    height: 120px;
    margin: 25px;
    background-color: var(--first-theme-color);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 50px var(--first-theme-color), 0 0 0 12px rgba(255,255,255,.7);
    img{
      width: 120px;
    }
  }
  .user-text-info{
    display: flex;
    flex-direction: column;
    .username-text{
      font-size: 25px;
    }
    .community-text{
      margin: 5px;
      height: 14px;
      font-size: 14px;
      opacity: .8;
    }
  }
}
</style>