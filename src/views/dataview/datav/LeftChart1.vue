<template>
  <div class="left-chart-1">
    <div class="lc1-header"> 更衣室 </div>
    <div class="lc1-details"> 当前运行总数<span>280</span> </div>
    <dv-capsule-chart class="lc1-chart" :config="state.config" />
    <dv-decoration-2 style="height: 10px" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const state = reactive({
    config: {
      data: [
        {
          name: '男更智能柜',
          value: 167,
        },
        {
          name: '女更智能柜',
          value: 67,
        },
        {
          name: '淋浴间',
          value: 12,
        },
        {
          name: '室内温度',
          value: 26,
        },
        {
          name: '水温',
          value: 45,
        },
      ],
      colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
      unit: '件',
    },
  });
</script>

<style lang="less">
  .left-chart-1 {
    width: 100%;
    height: 37%;
    display: flex;
    flex-grow: 0;
    flex-direction: column;

    .lc1-header {
      text-align: center;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      margin-bottom: 20px;
    }

    .lc1-details {
      height: 50px;
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

    .lc1-chart {
      flex: 1;
    }
  }
</style>
