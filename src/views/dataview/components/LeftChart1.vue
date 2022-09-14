<template>
  <div class="left-chart-1">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="lc1-header"> 更衣室 </div>
      <div class="lc1-details"> 当前运行总数<span>340</span> </div>
      <dv-capsule-chart class="lc1-chart" :config="state.config" />
      <dv-decoration-2 style="height: 10px" />
      <div class="chart-footer">
        <div class="footer-box">
          <p>26℃</p>
          <span>室内温度</span>
        </div>
        <div class="footer-box">
          <p>30℃</p>
          <span>水温</span>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const state = reactive({
    config: {
      showValue: true,
      data: [
        {
          name: 'all',
          value: 200,
        },
        {
          name: '男更衣智能柜',
          value: 160,
        },
        {
          name: '女更衣智能柜',
          value: 80,
        },
        {
          name: '淋浴间',
          value: 20,
        },
      ],
      colors: ['#00baff', '#3de7c9', '#fff'],
    },
  });
</script>

<style lang="less">
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
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
