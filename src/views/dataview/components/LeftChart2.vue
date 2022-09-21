<template>
  <div class="left-chart-2">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="charts-box">
        <div class="lc1-header"> 水处理机房 </div>
        <div class="lc1-details"> 水处理频率 </div>
        <div id="LeftChart2"></div>
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      axisLabel: {
        color: '#fff',
      },
      legend: {},
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        show: false,
        data: ['202206', '202207', '202208'],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [200, 210, 250],
          barWidth: 40,
          colorBy: 'data',
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
        },
      ],
    });
  });
</script>

<style lang="less">
  #LeftChart2 {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .charts-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .left-chart-2 {
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;

    .lc1-header {
      font-size: 24px;
    }

    .lc1-details {
      font-size: 12px;
      height: 30px;
      display: flex;
      align-items: center;
    }

    .lc2-chart {
      height: calc(~'100% - 80px');
    }
  }
</style>
