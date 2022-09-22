<template>
  <a-card class="ly-card">
    <a-spin :spinning="spinning">
      <div class="ly-card-container">
        <template v-for="item of data.ticketData" :key="item.id">
          <div class="sell-ticket">
            <div class="ticket-left"> {{ item.cardType_dictText }} </div>
            <div class="ticket-right">
              <p class="ticket-price">￥{{ item.price.toFixed(2) }} </p>
              <span class="ticket-name">{{ item.name }}</span>
            </div>
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
  // const emit = defineEmits(['ticketSelect']);
  const data = reactive<any>({
    ticketData: [],
  });
  const spinning = ref(true);

  watch(
    () => props.ticketData,
    () => {
      data.ticketData = props.ticketData;
      spinning.value = false;
    },
    { deep: true }
  );
  // const isSelect = (item) => {
  //   emit('ticketSelect', item);
  // };
</script>

<style lang="less" scoped>
  .ly-card {
    height: 100%;
    max-height: 600px;
    min-height: 400px;
    overflow-y: auto;
  }
  .ly-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .sell-ticket {
      width: calc(50% - 20px);
      background-color: #1892d0;
      display: flex;
      color: #fff;
      margin-bottom: 20px;
      font-size: 16px;
      padding: 5px;
      cursor: pointer;
      .ticket-left {
        border-right: 1px dashed rgba(0, 0, 0, 0.3);
        width: 50px;
        height: 120px;
        text-align: center;
        padding: 30px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
      }
      .ticket-right {
        width: calc(100% - 50px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        .ticket-price {
          margin-bottom: 0;
          font-size: 36px;
          font-weight: 700;
        }
        .ticket-name {
          font-size: 12px;
        }
      }
    }
  }
</style>
