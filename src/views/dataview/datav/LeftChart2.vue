<template>
  <div class="left-chart-2">
    <div class="lc2-header"> 设备运行总数 </div>
    <div class="lc2-details"> 设备运行总数<span>245</span> </div>
    <BarMulti :chartData="state.config" :option="multiBarOption" />
    <dv-decoration-2 style="height: 10px" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import BarMulti from '/@/components/chart/BarMulti.vue';
  const multiBarOption = {
    title: { left: 'center' },
  };
  const state = reactive({
    config: [
      { name: '', value: 146, type: 2022.06 },
      { name: '', value: 95, type: 2022.07 },
      { name: '', value: 178, type: 2022.08 },
    ],
  });
</script>

<style lang="less">
  .left-chart-2 {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;

    .lc2-header {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      text-indent: 20px;
      margin-top: 10px;
    }

    .lc2-details {
      height: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      text-indent: 20px;

      span {
        color: #e57807;
        font-weight: bold;
        font-size: 35px;
        margin-left: 20px;
      }
    }

    .lc2-chart {
      height: calc(~'100% - 80px');
    }
  }
</style>
