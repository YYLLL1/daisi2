<template>
  <div class="left-chart-2">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="charts-box">
        <div class="lc1-header"> 代替名称 </div>
        <div class="lc1-details"> 设备运行总数<span>245</span> </div>
        <div id="LeftChart2" style="width: 100%; height: 110px"></div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';

  onMounted(() => {
    let myChart = echarts.init(document.getElementById('LeftChart2'));

    myChart.setOption({
      color: ['#fff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {},
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['淋浴间', '女', '男'],
      },
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 62],
        },
      ],
    });
  });
</script>

<style lang="less">
  .left-chart-2 {
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;

    .lc1-header {
      font-size: 24px;
    }

    .lc1-details {
      font-size: 16px;
      height: 30px;
      display: flex;
      align-items: center;
      span {
        font-weight: bold;
        font-size: 30px;
        margin-left: 20px;
      }
    }

    .lc2-chart {
      height: calc(~'100% - 80px');
    }
  }
</style>
