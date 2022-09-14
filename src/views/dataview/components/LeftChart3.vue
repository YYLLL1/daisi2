<template>
  <div class="left-chart-3">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div dv-bg>
        <div class="lc1-header"> 柜控统计 </div>
        <div class="lc1-details"> 设备运行总数<span>245</span> </div>
        <dv-capsule-chart class="lc3-chart" :config="state.config" />
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
          name: '维护中',
          value: 21,
        },
        {
          name: '空闲',
          value: 54,
        },
        {
          name: '已开柜',
          value: 123,
        },
        {
          name: '正在使用',
          value: 167,
        },
        {
          name: '其他',
          value: 77,
        },
      ],
      colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
    },
  });
</script>

<style lang="less">
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
