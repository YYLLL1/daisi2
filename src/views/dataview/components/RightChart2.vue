<template>
  <div class="right-chart-2">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="chart-box">
        <div class="rc1-top">
          <div class="rc1-header"> 收入分类 </div>
          <div class="rc1-info">
            <p>8565 <span>元</span> </p>
            <span>总收入</span>
          </div>
        </div>

        <div class="rc1-container">
          <div id="chart1" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';

  onMounted(() => {
    let myChart = echarts.init(document.getElementById('chart1'));

    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      series: [
        {
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
          labelLine: {
            show: false,
          },
          type: 'pie',
          radius: [10, 120],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 24, name: '月卡' },
            { value: 30, name: '培训班' },
            { value: 28, name: '次卡' },
            { value: 22, name: '饮料' },
            { value: 30, name: '门票' },
            { value: 34, name: '会员卡' },
            { value: 20, name: '小吃' },
            { value: 16, name: '其他' },
          ],
        },
      ],
    });
  });
</script>

<style lang="less">
  .right-chart-2 {
    width: 100%;
    height: 100%;

    .chart-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .rc1-top {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rc1-info {
          text-align: center;
          margin-bottom: 20px;
          font-weight: 700;
          p {
            font-size: 32px;
            margin-bottom: 0;
            span {
              font-size: 16px;
            }
          }
        }
      }
      .rc1-container {
        width: 70%;
        display: flex;
        flex-direction: column;
      }
    }
    .rc1-header {
      font-size: 24px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
