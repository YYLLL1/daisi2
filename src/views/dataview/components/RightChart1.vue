<template>
  <div class="right-chart-1">
    <dv-border-box-10 :color="['#054769', '#2394d0']">
      <div dv-bg>
        <div class="rc1-header"> 今日信息 </div>
        <div>{{ timeClock }}</div>
        <div>{{ time }} {{ week }}</div>
        <div class="rc1-chart-container">
          <div class="number"> 262人 </div>
          <div>今日客流量</div>
        </div>
      </div>
    </dv-border-box-10>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  let time = ref('');
  let timeClock = ref('');
  let weekArr = reactive(['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']);
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
    let seconds = date.getSeconds(); //秒

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
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds;
    }
    week.value = weekArr[date.getDay() - 1];
    time.value = year + '-' + month + '-' + day;
    timeClock.value = hour + ':' + minutes + ':' + seconds;
  };
  /** 开启定时器 */
  function openTimer() {
    timer = setInterval(() => {
      getNowDate();
    }, 1000);
  }

  /** 关闭定时器 */
  function closeTimer() {
    if (timer) clearInterval(timer);
  }
  onMounted(() => {
    getNowDate();
    closeTimer();
    openTimer();
  });
  onUnmounted(() => {
    closeTimer();
  });
</script>

<style lang="less">
  .right-chart-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    .rc1-header {
      font-size: 24px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }

    .rc1-chart-container {
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
  }
</style>
