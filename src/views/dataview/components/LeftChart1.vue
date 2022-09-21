<template>
  <div class="left-chart-1">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="lc1-header"> 更衣室 </div>
      <div class="lc1-details"> 当前运行总数<span>340</span> </div>
      <div id="LeftChart1"></div>
      <dv-decoration-2 style="height: 10px" />
      <div class="chart-footer">
        <div class="footer-box">
          <p>26℃</p>
          <span>室内温度</span>
        </div>
        <div class="footer-box">
          <p>80<span style="font-size: 18px; font-weight: 500">%</span> </p>
          <span>空气湿度</span>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';

  onMounted(() => {
    let myChart = echarts.init(document.getElementById('LeftChart1'));

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{b}<br/>使用中：{c}<br/>最大设备数：150',
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
        max: 150,
      },
      yAxis: {
        axisLabel: {
          color: '#fff',
        },
        type: 'category',
        data: ['女淋浴间', '男淋浴间', '女更智能柜', '男更智能柜'],
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 120, 107],
          colorBy: 'data',
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
            formatter: '{c}/150',
          },
        },
      ],
    });
  });
</script>

<style lang="less">
  #LeftChart1 {
    width: 100%;
    height: 100%;
  }
  .left-chart-1 {
    width: 100%;
    height: 55%;
    padding-bottom: 5px;
    display: flex;
    flex-grow: 0;
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
    .chart-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      // font-family: 'SourceHanSansCN';
      .footer-box {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        p {
          font-size: 30px;
          font-weight: 700;
          line-height: 40px;
          margin: 0;
        }
      }
    }
  }
</style>
