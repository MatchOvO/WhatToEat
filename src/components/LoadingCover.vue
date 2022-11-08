<template>
  <div class="loading-cover-shell">
    <i class="fas fa-spinner fa-pulse"></i>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
.loading-cover-shell{
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: var(--first-theme-color);
  display: flex;
  justify-content: center;
  align-items: center;
  i{
    font-size: 50px;
  }
}
</style>