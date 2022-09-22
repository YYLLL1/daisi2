<template>
  <div class="ly-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="14">
        <BusinessInfo />
      </a-col>
      <a-col class="gutter-row" :span="10">
        <BusinessCard :ticketData="data.ticketData" />
      </a-col>
    </a-row>
    <BusinessPay />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { list } from './business.api';
  import BusinessInfo from './components/businessInfo.vue';
  import BusinessCard from './components/businessCard.vue';
  import BusinessPay from './components/businessPay.vue';

  const data = reactive({
    ticketData: [],
  });
  const getList = async () => {
    let result = await list();
    data.ticketData = result.records;
    console.log(result, data.ticketData);
  };
  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped></style>
