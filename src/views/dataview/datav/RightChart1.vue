<template>
  <div class="right-chart-1">
    <div class="rc1-header"> 今日信息 </div>

    <div class="rc1-chart-container">
      <div class="left">
        <div class="number"> 262人 </div>
        <div>今日客流量</div>
      </div>
      <div class="right">
        <div class="number">15:44 周五</div>
        <div class="number">2022年08月26日</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
  .right-chart-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .rc1-header {
      font-size: 24px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }

    .rc1-chart-container {
      flex: 1;
      display: flex;
    }

    .left {
      width: 30%;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .number {
        font-size: 34px;
        color: #e57807;
        font-weight: bold;
        margin-bottom: 30px;
      }
    }

    .right {
      flex: 1;
      padding-bottom: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .number {
        font-size: 34px;
        color: #e57807;
        font-weight: bold;
        margin-bottom: 0;
      }
    }
  }
</style>
