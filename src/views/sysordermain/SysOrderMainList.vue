<template>
  <div class="ly-container">
    <a-table :columns="columns" :data-source="data.parentData" class="components-table-demo-nested" rowKey="id">
      <template #expandedRowRender="{ record }">
        <a-table :columns="childrenColumn" :data-source="record.chirds" :pagination="false" :rowKey="record.id">
          <template #ticketStatus="{ record }">
            <span v-if="record.ticketStatus == '1'">已付款</span>
            <span v-if="record.ticketStatus == '2'">使用中</span>
            <span v-if="record.ticketStatus == '3'">退款完成</span>
            <span v-if="record.ticketStatus == '4'">已完成</span>
          </template>
          <template #paymentMethod="{ record }">
            <span v-if="record.paymentMethod == '1'">微信</span>
            <span v-if="record.paymentMethod == '2'">支付宝</span>
          </template>
          <template #orderForm="{ record }">
            <span v-if="record.orderForm == '1'">线上</span>
            <span v-if="record.orderForm == '2'">门店</span>
            <span v-if="record.orderForm == '3'">地推</span>
          </template>
          <template #ticketWriteOff="{ record }">
            <a-button size="small" type="primary" v-if="record.ticketWriteOff == '1'">未核销</a-button>
            <a-button size="small" v-if="record.ticketWriteOff == '2'">已核销</a-button>
          </template>
          <template #ticketAccessGate="{ record }">
            <a-button size="small" v-if="record.ticketAccessGate == '1'" @click="mockHandel(1, record.id)">未入闸</a-button>
            <a-button size="small" type="primary" v-if="record.ticketAccessGate == '2'" @click="mockHandel(2, record.id)">申请出闸</a-button>
            <a-button size="small" type="primary" v-if="record.ticketAccessGate == '3'" disabled>已出闸</a-button>
          </template>
        </a-table>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { columns, childrenColumn } from './SysOrderMain.data';
  import { list, entranceGate, exitGate } from './SysOrderMain.api';

  const data = reactive({
    parentData: [],
  });
  onMounted(() => {
    getList();
  });
  const getList = async () => {
    let result = await list();
    data.parentData = result;
  };

  const mockHandel = async (type, id) => {
    switch (type) {
      case 1:
        await entranceGate({ id }, getList);
        break;
      case 2:
        await exitGate({ id }, getList);
        break;
    }
  };
</script>
