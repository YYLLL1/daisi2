<template>
  <div class="ly-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="14">
        <SellLeft :ticketData="data.ticketData" @ticketSelect="ticketSelect" />
      </a-col>
      <a-col class="gutter-row" :span="10">
        <SellRight :selectData="data.selectData" @reduce="reduce" @add="add" @remove="remove" @submit="submit" />
      </a-col>
    </a-row>
    <SellBottom @returnHandel="returnHandel" @rentHandel="rentHandel" />
  </div>
</template>

<script lang="ts" setup>
  import SellLeft from './components/sellLeft.vue';
  import SellRight from './components/sellRight.vue';
  import SellBottom from './components/sellBottom.vue';
  import { onMounted, reactive } from 'vue';
  import { list, save } from './api';
  import { message } from 'ant-design-vue';

  const data = reactive({
    ticketData: [],
    selectData: [],
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
      message.warning('已添加该类型票种');
      return;
    }
    item.quantity = 1;
    item.zongPrice = 0;
    data.selectData.push(item);
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

  //租手环
  const rentHandel = (id) => {
    console.log(id);
  };

  //退手环
  const returnHandel = (id) => {
    console.log(id);
  };

  //结账
  const submit = async ({ name, phone }) => {
    let sysOrderTicketList = [];
    data.selectData?.forEach((item) => {
      let sysTicked = {
        sysTicketId: item.id,
        num: item.quantity,
      };
      sysOrderTicketList.push(sysTicked);
    });
    let sysOrder = {
      sysOrderTicketList,
      sysOrderCustomerList: [{ name: name || '', phone: phone || '' }],
    };
    await save(sysOrder, handleSuccess);
  };

  // 成功回调
  function handleSuccess() {
    data.selectData = [];
  }
</script>

<style lang="less" scoped>
  .gutter-row {
    height: 500px;
  }
</style>
