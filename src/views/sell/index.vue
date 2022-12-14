<template>
  <div class="ly-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="14">
        <SellLeft :ticketData="data.ticketData" @ticketSelect="ticketSelect" />
      </a-col>
      <a-col class="gutter-row" :span="10">
        <SellRight :selectData="data.selectData" @reduce="reduce" @add="add" @remove="remove" @openPaymentModal="openPaymentModal" />
      </a-col>
    </a-row>
    <SellBottom />
    <SellSuccess :successData="data.successData" :successVisible="data.successVisible" @closeSuccessModal="closeSuccessModal" />
    <SellPayment :selectData="data.selectData" :paymentVisible="data.paymentVisible" @closePaymentModal="closePaymentModal" @close="close" />
  </div>
</template>

<script lang="ts" setup>
  import SellLeft from './components/sellLeft.vue';
  import SellRight from './components/sellRight.vue';
  import SellBottom from './components/sellBottom.vue';
  import SellPayment from './components/sellPayment.vue';
  import SellSuccess from './components/sellSuccess.vue';
  import { onMounted, reactive } from 'vue';
  import { list, payOrder } from './api';

  const data = reactive<any>({
    ticketData: [],
    selectData: [],
    paymentData: [],
    successData: {},
    orderId: '',
    successVisible: false,
    paymentVisible: false,
  });

  //初始化票种类
  const ticketList = async () => {
    const arr = await list();
    data.ticketData = arr.records;
  };
  onMounted(() => {
    ticketList();
  });

  //获取选中的票种
  const ticketSelect = (item) => {
    if (data.selectData.indexOf(item) != -1) {
      item.quantity++;
      item.zongPrice = item.quantity * item.price;
    } else {
      item.quantity = 1;
      item.zongPrice = 0;
      data.selectData.push(item);
    }
  };

  //减少票数
  const reduce = (id) => {
    data.selectData.forEach((item) => {
      if (item.id == id) {
        item.quantity -= 1;
      }
    });
  };

  //增加票数
  const add = (id) => {
    data.selectData.forEach((item) => {
      if (item.id == id) {
        item.quantity += 1;
      }
    });
  };

  //删除票种
  const remove = (id) => {
    data.selectData = data.selectData.filter((item) => item.id != id);
  };

  //关闭弹出窗
  const close = (type) => {
    if (type == 'payment') {
      data.paymentVisible = false;
    } else {
      data.successVisible = false;
    }
    data.selectData = [];
  };

  //结账
  const submit = async () => {
    await payOrder({ id: data.orderId }, openSuccessModal);
  };

  // 打开支付弹窗
  const openPaymentModal = (list) => {
    data.orderId = list.id;
    //打开支付弹窗
    data.paymentVisible = true;
  };
  //支付弹窗确认提交
  const closePaymentModal = () => {
    submit();
  };

  // 打开支付成功弹窗
  const openSuccessModal = (res) => {
    data.paymentVisible = false;
    data.successVisible = true;
    data.selectData = [];
    data.successData = res;
  };

  // // 关闭支付成功弹窗
  const closeSuccessModal = (isShow: boolean) => {
    data.selectData = [];
    data.paymentData = [];
    data.successData = {};
    data.successVisible = isShow;
    data.paymentVisible = isShow;
  };
</script>

<style lang="less" scoped>
  .gutter-row {
    min-height: 500px;
  }
</style>
