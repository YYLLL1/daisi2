<template>
  <div class="ly-container">
    <a-table :columns="columns" :data-source="data.parentData" class="components-table-demo-nested" @expand="handel" rowKey="key">
      <template #expandedRowRender="{ record }">
        <a-table :columns="childrenColumn" :data-source="record.childrenData" :pagination="false" :rowKey="record.id">
          <template #ticket_status="{ record }">
            <span v-if="record.ticket_status == '1'">已付款</span>
            <span v-if="record.ticket_status == '2'">使用中</span>
            <span v-if="record.ticket_status == '3'">退款完成</span>
            <span v-if="record.ticket_status == '4'">已完成</span>
          </template>
          <template #payment_method="{ record }">
            <span v-if="record.payment_method == '1'">微信</span>
            <span v-if="record.payment_method == '2'">支付宝</span>
          </template>
          <template #order_form="{ record }">
            <span v-if="record.order_form == '1'">线上</span>
            <span v-if="record.order_form == '2'">门店</span>
            <span v-if="record.order_form == '3'">地推</span>
          </template>
          <template #ticket_write_off="{ record }">
            <a-button size="small" type="primary" v-if="record.ticket_write_off == '1'">未核销</a-button>
            <a-button size="small" v-if="record.ticket_write_off == '2'">已核销</a-button>
          </template>
          <template #ticket_access_gate="{ record }">
            <a-button size="small" v-if="record.ticket_access_gate == '1'" @click="mockHandel(1, record.id)">未入闸</a-button>
            <a-button size="small" type="primary" v-if="record.ticket_access_gate == '2'" @click="mockHandel(2, record.id)">申请出闸</a-button>
            <a-button size="small" type="primary" v-if="record.ticket_access_gate == '3'" disabled>已出闸</a-button>
          </template>
        </a-table>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { columns, childrenColumn } from './SysOrderMain.data';
  import { list, childrenList, entranceGate, exitGate } from './SysOrderMain.api';

  const data = reactive({
    id: '',
    parentData: [],
  });
  onMounted(() => {
    getList();
  });
  const getList = async () => {
    let { records } = await list();
    data.parentData = records;
  };
  const handel = async (a, record) => {
    data.id = record.id;
    console.log(a);
    let result = await childrenList({ sysOrderMainId: record.id });
    let orderMainId = result[0].sys_order_main_id;
    data.parentData.forEach((item) => {
      if (item.id == orderMainId) {
        item.childrenData = result;
      }
    });
  };

  const mockHandel = async (type, id) => {
    switch (type) {
      case 1:
        await entranceGate({ id }, getList());
        break;
      case 2:
        await exitGate({ id }, getList());
        break;
    }
  };
</script>
