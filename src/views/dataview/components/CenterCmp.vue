<template>
  <div class="center-cmp">
    <img src="../assets/img/bg.png" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
  .center-cmp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 5px;
    // background: url(../assets/img/bg.png) center no-repeat;
    // background-size: 100% 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
