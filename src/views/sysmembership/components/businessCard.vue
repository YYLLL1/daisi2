<template>
  <a-card class="ly-card">
    <a-spin :spinning="spinning">
      <div class="ly-card-container">
        <template v-for="item of data.ticketData" :key="item.id">
          <div class="business-card" :class="active == item.id ? 'active' : ''" @click="isSelect(item)">
            <h4>￥{{ item.price.toFixed(2) }} </h4>
            <p>{{ item.cardName }}</p>
          </div>
        </template>
      </div>
    </a-spin>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';

  const props = defineProps({
    ticketData: { type: Array, default: () => [] },
  });
  const emit = defineEmits(['ticketSelect']);
  const data = reactive<any>({
    ticketData: [],
  });
  const spinning = ref(true);
  const active = ref('0');
  watch(
    () => props.ticketData,
    () => {
      data.ticketData = props.ticketData;
      spinning.value = false;
    },
    { deep: true }
  );
  const isSelect = (item) => {
    active.value = item.id;
    emit('ticketSelect', item);
  };
  // 清空票卡信息
  const refreshCard = () => {
    active.value = '0';
  };
  defineExpose({
    refreshCard,
  });
</script>

<style lang="less" scoped>
  .ly-card {
    height: 100%;
    max-height: 550px;
    min-height: 450px;
    overflow-y: auto;
    padding: 24px;
  }
  .ly-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .business-card {
      width: calc(50% - 12px);
      background-color: #1892d0;
      text-align: center;
      color: #fff;
      margin-bottom: 24px;
      padding: 16px;
      cursor: pointer;
      border: 3px solid #1892d0;
      transition: all 0.3s;
      &.active,
      &:hover {
        background-color: #fff;
        color: #1892d0;
        h4 {
          color: #1892d0;
        }
      }
      h4 {
        font-weight: 700;
        font-size: 32px;
        color: #fff;
        margin-bottom: 0;
      }
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
