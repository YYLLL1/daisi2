<template>
  <div class="left-chart-3">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="chart-box">
        <div class="lc1-header"> 淋浴间情况 </div>
        <div class="lc1-details"> 淋浴间水控设备情况 </div>
        <div id="LeftChart3"></div>
        <ul class="chart-bottom">
          <li v-for="(item, index) of data.showerData" :key="index">
            <h4>
              {{ item.num }} <span>{{ item.company }}</span>
            </h4>
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import * as echarts from 'echarts';
  const data = reactive({
    showerData: [
      { num: 100, company: '分钟/次', title: '男更沐浴露添加频率' },
      { num: 50, company: '℃', title: '热水水温' },
      { num: 100, company: '分钟/次', title: '女更沐浴露添加频率' },
      { num: 2.23, company: '吨', title: '今日总用水量' },
    ],
  });
  onMounted(() => {
    let myChart = echarts.init(document.getElementById('LeftChart3'));

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{b}：{c}吨',
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
        },
        type: 'category',
        data: ['女浴用水量', '男浴用水量'],
      },
      series: [
        {
          type: 'bar',
          data: [1.37, 0.86],
          colorBy: 'data',
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
            formatter: '{c}吨',
          },
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
  .dv-decoration-2 > svg {
    height: 5px;
  }
  .chart-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    .chart-bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 0;
      text-align: center;
      li {
        width: calc(50% - 10px);
        color: #fff;
        h4 {
          margin: 0;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          line-height: 30px;
          span {
            font-size: 12px;
            font-weight: 500;
          }
        }
        p {
          font-size: 12px;
        }
      }
    }
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
      font-size: 12px;
      display: flex;
      height: 30px;
      align-items: center;
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
