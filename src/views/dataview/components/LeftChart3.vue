<template>
  <div class="left-chart-3">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="chart-box">
        <div class="lc1-header"> 柜控统计 </div>
        <div class="lc1-details"> 设备运行总数<span>245</span> </div>
        <div id="LeftChart3"></div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';

  onMounted(() => {
    let myChart = echarts.init(document.getElementById('LeftChart3'));

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '4%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        show: false,
      },
      yAxis: {
        axisLabel: {
          color: '#fff',
          with: 60,
        },
        type: 'category',
        data: ['其他', '维护中', '空闲', '已开柜', '正在使用'],
      },
      series: [
        {
          type: 'bar',
          data: [21, 54, 123, 167, 77],
          colorBy: 'data',
        },
      ],
    });
  });
</script>

<style lang="less">
  #LeftChart3 {
    width: 100%;
    height: 100%;
  }
  .chart-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .left-chart-3 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .lc1-header {
      font-size: 24px;
    }

    .lc1-details {
      font-size: 16px;
      display: flex;
      height: 30px;
      align-items: center;
      span {
        font-weight: bold;
        font-size: 30px;
        margin-left: 20px;
      }
    }
    .lc3-chart {
      .label-column {
        width: 60px !important;
        div {
          height: 40px !important;
          line-height: 40px !important;
          padding-bottom: 0 !important;
        }
      }
      .capsule-item {
        height: 30px !important;
        margin: 5px 0 !important;
      }
    }
  }
</style>
