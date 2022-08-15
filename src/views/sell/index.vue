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
    <SellBottom @returnHandel="returnHandel" @rentHandel="rentHandel" />
    <SellSuccess :successData="data.successData" :successVisible="data.successVisible" @closeSuccessModal="closeSuccessModal" @close="close" />
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
  import { list, save } from './api';

  const data = reactive({
    ticketData: [],
    selectData: [],
    paymentData: [],
    sysOrder: {},
    successData: {},
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
    console.log(data.selectData);
  };

  //删除票种
  const remove = (id) => {
    data.selectData = data.selectData.filter((item) => item.id != id);
  };

  //租手环
  const rentHandel = (id) => {
    console.log(id);
  };

  //退手环
  const returnHandel = (id) => {
    console.log(id);
  };

  //关闭弹出窗
  const close = (type) => {
    if (type == 'payment') {
      data.paymentVisible = false;
    } else {
      data.successVisible = false;
    }
  };

  //结账
  const submit = async () => {
    await save(data.sysOrder, openSuccessModal);
  };

  // 打开支付弹窗
  const openPaymentModal = ({ name, phone }) => {
    let sysOrderTicketList = [];
    data.selectData?.forEach((item) => {
      let sysTicked = {
        sysTicketId: item.id,
        num: item.quantity,
      };
      sysOrderTicketList.push(sysTicked);
    });
    data.sysOrder = {
      sysOrderTicketList,
      sysOrderCustomerList: [{ name: name || '', phone: phone || '' }],
    };
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
    data.successData = res;
  };

  // 关闭支付成功弹窗
  const closeSuccessModal = (isShow: boolean) => {
    data.selectData = [];
    data.paymentData = [];
    data.sysOrder = {};
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
