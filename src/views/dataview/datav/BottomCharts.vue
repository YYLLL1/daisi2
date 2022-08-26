<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">
      <div class="bcci-header"> 当前水温 </div>
      <dv-water-level-pond :config="state.config1" style="margin: 0 auto; width: 200px; height: 200px" />
    </div>
    <dv-decoration-2 class="decoration-1" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header"> 空气湿度 </div>
      <dv-water-level-pond :config="state.config2" style="margin: 0 auto; width: 200px; height: 200px" />
    </div>

    <dv-decoration-2 class="decoration-2" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header"> 水质PH </div>
      <dv-water-level-pond :config="state.config3" style="margin: 0 auto; width: 200px; height: 200px" />
    </div>

    <dv-decoration-2 class="decoration-3" :reverse="true" style="width: 5px" />

    <div class="bc-chart-item">
      <div class="bcci-header"> 余氯含量 </div>
      <dv-water-level-pond :config="state.config4" style="margin: 0 auto; width: 200px; height: 200px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const state = reactive({
    config1: {
      data: [24],
      shape: 'round',
      colors: ['#f7f8fc', '#fff'],
      formatter: '{value} C',
    },
    config2: {
      data: [70, 80],
      colors: ['#f7f8fc', '#fff'],
      waveHeight: 5,
      shape: 'round',
    },

    config3: {
      data: [50],
      shape: 'round',
      colors: ['#f7f8fc', '#fff'],
      waveHeight: 5,
      formatter: '7.1',
    },

    config4: {
      data: [55],
      colors: ['#f7f8fc', '#fff'],
      shape: 'round',
    },
  });
</script>

<style lang="less">
  .bottom-charts {
    width: 100%;
    height: 100%;
    color: #ffbc13;
    display: flex;
    position: relative;

    .bc-chart-item {
      width: 25%;
      height: 100%;
      padding-top: 20px;
      box-sizing: border-box;
    }

    .bcci-header {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
    }

    .label-tag {
      height: 30px;
    }

    .active-ring-name {
      font-size: 18px !important;
    }

    .decoration-1,
    .decoration-2,
    .decoration-3 {
      display: absolute;
      left: 0%;
    }
  }
</style>
