<template>
  <a-card class="ly-card">
    <h4 class="title">手环办理</h4>
    <div class="ly-card-container">
      <div class="rent ly-card-content">
        <label>租手环：</label>
        <a-input v-model:value="phone" placeholder="请输入手机号" />
        <a-button type="primary" @click="rentH">确定</a-button>
      </div>
      <div class="return ly-card-content">
        <label>退手环：</label>
        <a-input v-model:value="returnBracelet" placeholder="读手环/读卡/手机号/手环号" />
        <a-button type="primary" @click="returnH">确定</a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { cabinetOut, cabinetPhone } from '../api';
  const phone = ref<string>('');
  const returnBracelet = ref<string>('');

  const rentH = async () => {
    await cabinetPhone({ phone: phone.value }, res);
  };

  const returnH = async () => {
    await cabinetOut({ sysBraceletId: returnBracelet.value }, res);
  };
  const res = () => {
    phone.value = '';
    returnBracelet.value = '';
  };
</script>

<style lang="less" scoped>
  @themFc: #1892d0;
  .ly-card {
    margin-top: 20px;
    position: relative;
    .ly-card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .title {
      color: #fff;
      background-color: @themFc;
      width: 34px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px;
      margin-bottom: 0;
    }
    .ly-card-content {
      width: 50%;
      height: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        font-weight: 700;
      }
      input {
        width: 220px;
        margin-right: 20px;
      }
      button {
        width: 80px;
      }
      &.return {
        justify-content: flex-start;
      }
    }
  }
</style>
