<template>
  <div id="data-view">
    <div class="chart-container">
      <div class="top-chart">
        <div class="left-chart">
          <LeftChart1 />
          <LeftChart2 />
        </div>
        <div class="canter-chart">
          <CenterCmp />
        </div>
        <div class="right-chart">
          <div class="right-info"> <RightChart1 /> </div>
          <div class="right-income"> <RightChart2 /> </div>
        </div>
      </div>
      <div class="bottom-chart">
        <div class="left-chart">
          <LeftChart3 />
        </div>
        <div class="right-chart">
          <BottomCharts />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import './assets/font/font.css';
  import LeftChart1 from './components/LeftChart1.vue';
  import LeftChart2 from './components/LeftChart2.vue';
  import LeftChart3 from './components/LeftChart3.vue';
  import CenterCmp from './components/CenterCmp.vue';
  import RightChart1 from './components/RightChart1.vue';
  import RightChart2 from './components/RightChart2.vue';
  import BottomCharts from './components/BottomCharts.vue';
</script>

<style lang="less">
  #data-view {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    color: #fff;
    .dv-capsule-chart {
      padding: 10px 0 0 0;
      .capsule-container {
        justify-content: flex-start;
      }

      .label-column {
        width: 50px;
        text-align: left;

        div {
          height: auto;
          line-height: 13px;
          padding-bottom: 10px;
          &:first-child {
            display: none;
          }
        }
      }
      .capsule-item {
        height: 26px;
        margin: 0 0 10px 0;
        border-radius: 0;
        &:first-child {
          display: none;
        }
        .capsule-item-column {
          height: 100%;
          border-radius: 0;
          margin: 0;
          .capsule-item-value {
            transform: translate(120%) !important;
          }
        }
      }
    }
    .view-title {
      color: #fff;
      font-size: 24px;
      margin-bottom: 10px;
      padding: 10px;
    }
    .border-box-content {
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }
    .chart-container {
      background-color: #191a33;
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      .top-chart {
        display: flex;
        width: 100%;
        height: 65%;
        padding-bottom: 5px;
        .left-chart {
          width: 20%;
        }
        .canter-chart {
          width: 55%;
        }
        .right-chart {
          width: 25%;
          height: 100%;
          .right-info {
            height: 55%;
          }
          .right-income {
            height: 45%;
          }
        }
      }
      .bottom-chart {
        display: flex;
        height: 35%;
        .left-chart {
          width: 20%;
        }
        .right-chart {
          width: 80%;
          padding-left: 5px;

          // .border-box-content {
          //   padding: 10px 20px 20px !important;
          // }
        }
      }
    }
  }
</style>
