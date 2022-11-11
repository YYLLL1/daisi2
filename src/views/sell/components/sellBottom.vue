<template>
  <a-card class="ly-card">
    <h4 class="title">手环办理</h4>
    <div class="ly-card-container">
      <div class="ly-card-content ly-card-customer">
        <div class="w390">
          <label>客户信息：</label>
          <a-input v-model:value="phone" placeholder="请输入手机号" />
          <a-button type="primary" @click="rentH">查询</a-button>
        </div>
        <ul class="customer-info pd10 w390 mg-t10">
          <li>
            <span class="info-label">姓名：<i></i></span>
            <span class="info-value">张先生</span>
          </li>
          <li>
            <span class="info-label">手机号：<i></i></span>
            <span class="info-value">15302769987</span>
          </li>
          <li>
            <span class="info-label">可选票：<i></i></span>
            <div class="info-value">
              <a-radio-group v-model:value="customerInfo" :options="options" />
            </div>
          </li>
        </ul>
      </div>
      <div class="ly-card-content">
        <div>
          <label>租手环：</label>
          <a-input v-model:value="phone" placeholder="请输入手机号" />
          <a-button type="primary" @click="rentH">确定</a-button>
        </div>
        <div class="mg-t20">
          <label>退手环：</label>
          <a-input v-model:value="returnBracelet" placeholder="读手环/读卡/手机号/手环号" />
          <a-button type="primary" @click="returnH">确定</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { cabinetOut, cabinetPhone } from '../api';
  const phone = ref<string>('');
  const returnBracelet = ref<string>('');
  const customerInfo = ref<string>('1');
  const options = [
    { label: '成人单次票 9987', value: '1' },
    { label: '成人单次票 9988', value: '2' },
    { label: '儿童单次票 9989', value: '3' },
  ];
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
  .w390 {
    width: 390px;
  }
  .ly-card {
    margin-top: 20px;
    position: relative;
    .ly-card-container {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
      .ly-card-customer {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
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
    }
    .customer-info {
      border: 1px solid #999;
      margin-bottom: 0;
      li {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .info-label {
          width: 60px;
          text-align: right;
        }
        .info-value {
          margin-left: 10px;
          width: calc(100% - 70px);
        }
      }
    }
  }
</style>
