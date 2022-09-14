<template>
  <dv-border-box-10 :color="['#054769', '#2394d0']">
    <h4 class="view-title"> 各项监测数据 </h4>
    <div class="bottom-charts">
      <div class="chart-item" v-for="(item, index) of data.status" :key="index">
        <div class="chart-title">
          <img :src="item.icon" alt="" />
          <span>{{ item.iconTitle }}</span>
        </div>
        <div class="chart-center">
          <h4>{{ item.num }}</h4>
          <p>{{ item.numUnit }}</p>
        </div>
        <dv-decoration2 style="width: 100%; height: 5px" />
        <div class="chart-footer">
          <p>{{ item.footerTitle }}</p>
        </div>
      </div>
    </div>
  </dv-border-box-10>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import icon1 from '../assets/icon1.png';
  import icon2 from '../assets/icon2.png';
  import icon3 from '../assets/icon3.png';
  import icon4 from '../assets/icon4.png';
  import icon5 from '../assets/icon5.png';

  const data = reactive({
    status: [
      {
        icon: icon1,
        iconTitle: '水温',
        num: '27',
        numUnit: '℃',
        footerTitle: '27-30℃',
      },
      {
        icon: icon2,
        iconTitle: '室温',
        num: '30',
        numUnit: '℃',
        footerTitle: '25-35℃',
      },
      {
        icon: icon3,
        iconTitle: '湿度',
        num: '80',
        numUnit: '%',
        footerTitle: '27-30℃',
      },
      {
        icon: icon4,
        iconTitle: 'PH值',
        num: '7.0',
        numUnit: '',
        footerTitle: '7.0-7.8',
      },
      {
        icon: icon5,
        iconTitle: '余氯',
        num: '0.3',
        numUnit: 'mg/L',
        footerTitle: '0.3-1.0',
      },
    ],
  });
</script>

<style lang="less">
  .bottom-charts {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: space-between;
    margin-bottom: 10px;
    .chart-item {
      background-color: #283f78;
      width: calc(20% - 15px);
      padding: 10px 10px 0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .chart-title {
        padding: 0 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
      .chart-center {
        display: flex;
        align-items: baseline;
        justify-content: center;
        h4 {
          margin: 0;
          font-size: 88px;
          font-weight: 700;
          color: #fff;
        }
        p {
          margin: 0;
          margin-left: 10px;
        }
      }
      .chart-footer p {
        text-align: right;
        line-height: 36px;
        margin: 0;
      }
    }
  }
</style>
