<template>
  <div class="right-chart-1">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div class="chart-box">
        <div class="rc1-header">
          <div class="header-left">
            <h4> {{ timeClock }} </h4>
            <img :src="icon" alt="" />
            <p>30℃</p>
          </div>
          <p class="date">{{ time }} {{ week }}</p>
        </div>
        <div id="rightChart1"></div>
        <dv-decoration2 style="width: 100%; height: 5px; margin-bottom: 5px" />
        <ul class="rc1-chart-bottom">
          <li>
            <h4>今日客流量来源：</h4>
          </li>
          <li v-for="(item, index) of data.flowList" :key="index">
            <h4>
              <b>{{ item.num }}</b>
              <span>{{ item.company }}</span>
            </h4>
            <p>{{ item.type }}</p>
          </li>
        </ul>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import icon1 from '../assets/img/weather.png';
  import * as echarts from 'echarts';
  const data = reactive({
    flowList: [
      { num: 17, company: '人', type: '票务' },
      { num: 48, company: '人', type: '会员' },
      { num: 10, company: '人', type: '培训学员' },
    ],
  });

  let icon = ref(icon1);
  let time = ref('');
  let timeClock = ref('');
  let weekArr = reactive(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
  let week = ref('');
  let timer = null;
  // 格式化日对象
  const getNowDate = () => {
    let date = new Date();
    let year = date.getFullYear(); // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分

    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (day >= 0 && day <= 9) {
      day = '0' + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes;
    }
    week.value = weekArr[date.getDay() - 1];
    time.value = year + '年' + month + '月' + day + '日';
    timeClock.value = hour + ':' + minutes;
  };
  /** 开启定时器 */
  function openTimer() {
    timer = setInterval(() => {
      getNowDate();
    }, 10000);
  }

  /** 关闭定时器 */
  function closeTimer() {
    if (timer) clearInterval(timer);
  }

  const myChartFunction = () => {
    let myChart = echarts.init(document.getElementById('rightChart1'));

    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '2%',
        left: '2%',
        right: '2%',
        bottom: '0',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        show: false,
      },
      yAxis: [
        {
          axisLabel: {
            color: '#fff',
            with: 10,
          },
          type: 'category',
          data: ['今日新增会员人数', '今日管内实时人数', '昨日总人数', '今日总人数'],
        },
      ],
      series: [
        {
          type: 'bar',
          data: [22, 96, 205, 210],
          colorBy: 'data',
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
        },
      ],
    });
  };
  onMounted(() => {
    myChartFunction();
    getNowDate();
    closeTimer();
    openTimer();
  });
  onUnmounted(() => {
    closeTimer();
  });
</script>

<style lang="less">
  #rightChart1 {
    width: 100%;
    height: 100%;
  }
  .right-chart-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;

    .chart-box {
      justify-content: space-between;
    }
    .rc1-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .header-left {
        display: flex;
        align-items: flex-end;
        margin-top: 10px;
        h4 {
          color: #fff;
          font-size: 32px;
          margin-bottom: 0;
          line-height: 1;
        }
        img {
          width: 27px;
          margin-left: 10px;
        }
        p {
          font-size: 20px;
          font-weight: 500;
          margin-left: 5px;

          line-height: 1;
        }
      }
      .date {
        font-size: 20px;
        margin-bottom: 0;
        line-height: 1;
      }
    }

    .rc1-chart-bottom {
      display: flex;
      width: 100%;
      color: #fff;
      text-align: center;
      justify-content: space-between;
      margin-bottom: 0;
      li {
        width: 25%;
        h4 {
          font-size: 12px;
          margin-bottom: 0;
          color: #fff;
          b {
            font-size: 30px;
            line-height: 1;
            font-weight: 700;
          }
        }
        p {
          font-size: 12px;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
