<template>
  <a-row class="ly-row" :gutter="16">
    <a-col class="gutter-row" :span="12" v-for="(item, index) of indexRight" :key="index">
      <a-card class="gutter-box" :class="item.color == 'blue' ? 'isShow' : ''" @click="toLink(item.path)">
        <p>{{ item.title }}</p>
        <span>{{ item.footer }}</span>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { indexRight } from '../data';
  import { router } from '/@/router';
  const toLink = (path) => {
    if (!path) return message.warning('暂无链接页面');
    router.push(path);
  };
</script>

<style lang="less" scoped>
  .isShow {
    background-image: linear-gradient(90deg, #0781baea, #0d73a1) !important;
  }
  .ly-row {
    height: 100%;
  }
  .gutter-row:nth-child(1),
  .gutter-row:nth-child(2) {
    margin-bottom: 20px;
  }
  .gutter-box {
    background-image: linear-gradient(90deg, #7f7f7f, #737373);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    height: 100%;
    cursor: pointer;
    p {
      font-size: 24px;
      margin-bottom: 0;
    }
  }
</style>
