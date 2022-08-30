<template>
  <div class="gutter-example">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6" v-for="(item, index) of indexCenter.data" :key="index">
        <a-card class="gutter-box">
          <h4 v-if="item.title">{{ item.title }}</h4>
          <h5 v-if="item.total >= 0">{{ item.total }}</h5>
          <p v-if="item.footer">{{ item.footer }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';

  const props = defineProps({
    revenue: { type: Number, default: 0 },
    ticketCount: { type: Number, default: 0 },
  });
  const indexCenter = reactive<any>({
    data: [
      {
        title: '戴思乐深圳南山分馆',
        icon: 'visit-count|svg',
        footer: '深圳',
      },
      {
        title: '',
        icon: 'total-sales|svg',
        total: 0,
        footer: '今日营收（元）',
      },
      {
        total: 0,
        footer: '今日新增会员',
        icon: 'download-count|svg',
      },
      {
        total: 0,
        footer: '当前客流量',
        icon: 'transaction|svg',
      },
    ],
  });
  watch(
    () => props.revenue,
    () => {
      indexCenter.data[1].total = props.revenue;
      indexCenter.data[2].total = props.ticketCount;
    }
  );
</script>

<style lang="less" scoped>
  @themFc: #fff;
  @themBg: #3c77cb;
  @themShow: #69a1f1;
  .gutter-example {
    margin-top: 20px;
    ::v-deep(.ant-row > div) {
      background: transparent;
      border: 0;
    }
  }
  .gutter-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    p {
      margin-bottom: 0;
    }
    h4 {
      // font-size: 18px;
      font-weight: 700;
    }
    h5 {
      font-size: 24px;
      color: @themBg;
      margin-bottom: 0;
    }
  }
</style>
