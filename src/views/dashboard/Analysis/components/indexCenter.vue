<template>
  <div class="gutter-example">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6" v-for="(item, index) of indexCenter" :key="index">
        <a-card class="gutter-box">
          <h4 v-if="item.title">{{ item.title }}</h4>
          <h5 v-if="item.total">{{ item.total }}</h5>
          <p v-if="item.footer">{{ item.footer }}</p>
          <span v-if="item.footerTotal">{{ item.footerTotal }}</span>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { indexCenter } from '../data';
</script>

<style lang="less" scoped>
  @themFc: #fff;
  @themBg: #3c77cb;
  @themShow: #69a1f1;
  .gutter-example {
    margin-top: 20px;
    ::v-deep(.ant-row > div) {
      background: transparent;
      border: 0;
    }
  }
  .gutter-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    p {
      margin-bottom: 0;
    }
    h4 {
      // font-size: 18px;
      font-weight: 700;
    }
    h5 {
      font-size: 24px;
      color: @themBg;
      margin-bottom: 0;
    }
    span {
      font-size: 12px;
      color: #ddd;
    }
  }
</style>
