<template>
  <a-row class="ly-row" type="flex" justify="space-between" align="bottom">
    <a-col class="ly-col" :span="4" v-for="(item, index) of indexTop" :key="index">
      <div class="ly-const" :class="item.color == 'skyBlue' ? 'isShow' : ''">
        <p>{{ item.total }}</p>
        <span>{{ item.title }}</span>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { indexTop } from '../data';
</script>

<style lang="less" scoped>
  @themFc: #fff;
  @themBg: #3c77cb;
  @themShow: #69a1f1;
  .isShow {
    background-color: @themShow;
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      background-color: @themShow;
      position: absolute;
      right: -10px;
      bottom: 30px;
    }
  }
  .ly-row {
    background-color: @themBg;
    .ly-col {
      height: 100px;
      position: relative;
      .ly-const {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        color: @themFc;
        p {
          font-size: 40px;
          line-height: 1;
          margin-bottom: 0;
        }
      }
    }
  }
</style>
