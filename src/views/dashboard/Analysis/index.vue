<template>
  <div class="ly-container">
    <IndexTop :ticketCount="data.ticketCount" />
    <IndexCenter :revenue="data.revenue" :ticketCount="data.ticketCount" />
    <div class="gutter-example">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <IndexLeft :selectHomePage="data.ticketList" />
        </a-col>
        <a-col class="gutter-row" :span="12">
          <IndexRight />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IndexTop from './components/indexTop.vue';
  import IndexCenter from './components/indexCenter.vue';
  import IndexLeft from './components/indexLeft.vue';
  import IndexRight from './components/indexRight.vue';
  import { getSelectHomePage } from './api';
  import { onMounted, reactive } from 'vue';

  const data = reactive({
    revenue: 0,
    ticketCount: 0,
    ticketList: [],
  });
  const getSelectHomePageData = async () => {
    let result = await getSelectHomePage();
    data.ticketList = result[0].data;
    data.revenue = result[0].revenue;
    data.ticketCount = result[0].ticketCount;
  };
  onMounted(() => {
    getSelectHomePageData();
  });
</script>
<style lang="less" scoped>
  @themeBg: #1890ff;
  @themeFc: #fff;
  @themeBg: #000;
  .gutter-example {
    margin-top: 20px;
    :deep(.ant-row > div) {
      background: transparent;
      border: 0;
    }
  }
</style>
