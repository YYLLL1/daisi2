<template>
  <div class="right-chart-2">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="chart-box">
        <div class="rc1-top">
          <div class="rc1-header"> 收入分类 </div>
          <div>
            <p>8500</p>
            <span>总收入</span>
          </div>
        </div>

        <div class="rc1-container">
          <div id="chart1" style="width: 100%; height: 220px"></div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';

  onMounted(() => {
    let myChart = echarts.init(document.getElementById('chart1'), 'dark');

    myChart.setOption({
      series: [
        {
          labelLine: {
            show: false,
          },
          type: 'pie',
          radius: [10, 70],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 30, name: '培训班' },
            { value: 34, name: '月卡' },
            { value: 28, name: '次卡' },
            { value: 26, name: '饮料' },
            { value: 28, name: '门票' },
            { value: 26, name: '会员卡' },
            { value: 30, name: '小吃' },
            { value: 26, name: '其他' },
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
    display: flex;
    flex-direction: column;
    .chart-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .rc1-top {
        width: 30%;
      }
      .rc1-container {
        width: 70%;
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
