<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">
          <LeftChart1 />
          <LeftChart2 />
          <LeftChart3 />
        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3 class="rmctc-left-container">
              <CenterCmp />
            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">
                <RightChart1 />
              </dv-border-box-3>

              <dv-border-box-4 class="rmctc-chart-2" :reverse="true">
                <RightChart2 />
              </dv-border-box-4>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">
            <BottomCharts />
          </dv-border-box-4>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import LeftChart1 from './LeftChart1.vue';
  import LeftChart2 from './LeftChart2.vue';
  import LeftChart3 from './LeftChart3.vue';

  import CenterCmp from './CenterCmp.vue';

  import RightChart1 from './RightChart1.vue';
  import RightChart2 from './RightChart2.vue';

  import BottomCharts from './BottomCharts.vue';
</script>

<style lang="less">
  #data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;

    #dv-full-screen-container {
      background-image: url('./img/bg.png');
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
    }

    .main-container {
      height: calc(~'100% - 80px');

      .border-box-content {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
      }
    }

    .left-chart-container {
      width: 22%;
      padding: 10px;
      box-sizing: border-box;

      .border-box-content {
        flex-direction: column;
      }
    }

    .right-main-container {
      width: 78%;
      padding-left: 5px;
      box-sizing: border-box;
    }

    .rmc-top-container {
      height: 65%;
      display: flex;
    }

    .rmctc-left-container {
      width: 65%;
    }

    .rmctc-right-container {
      width: 35%;
    }

    .rmc-bottom-container {
      height: 35%;
    }

    .rmctc-chart-1,
    .rmctc-chart-2 {
      height: 50%;
    }
  }
</style>
