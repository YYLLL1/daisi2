<template>
  <div class="ly-container">
    <a-row :gutter="16" style="margin-bottom: 16px">
      <a-col class="gutter-row" :span="9">
        <BusinessInfo ref="customerData" @customerId="customerId" />
      </a-col>
      <a-col class="gutter-row" :span="15">
        <BusinessCard ref="cardData" :ticketData="data.ticketData" @ticketSelect="ticketSelect" />
      </a-col>
    </a-row>
    <BusinessPay ref="payData" @payInfo="payInfo" :ticketSelectObj="data.ticketSelectObj" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { list, addList } from './business.api';
  import BusinessInfo from './components/businessInfo.vue';
  import BusinessCard from './components/businessCard.vue';
  import BusinessPay from './components/businessPay.vue';
  import { message } from 'ant-design-vue';
  const customerData = ref();
  const cardData = ref();
  const payData = ref();
  const data = reactive({
    ticketData: [],
    ticketSelectObj: {},
  });
  let submitFrom = reactive<any>({
    //票卡类型
    cardType: 1,
    //票卡ID
    cardId: '',
    //票卡名称
    cardName: '',
    //客户ID
    customerId: '',
    //票卡属性
    cardAttribute: 0,
  });
  const getList = async () => {
    let result = await list();
    data.ticketData = result.records;
  };

  const ticketSelect = (item) => {
    submitFrom.cardId = item.id;
    submitFrom.cardName = item.cardType_dictText;
    submitFrom.cardAttribute = item.cardAttribute;
    // 赋值选中的票卡给支付组件
    data.ticketSelectObj = item;
  };
  const customerId = (id) => {
    submitFrom.customerId = id;
  };
  //清空数据
  const refresh = () => {
    customerData.value.refreshInfo();
    payData.value.refreshPay();
    cardData.value.refreshCard();
    submitFrom = {};
    // submitFrom.cardId = '';
    // submitFrom.cardName = '';
    // submitFrom.customerId = '';
    // submitFrom.cardAttribute = 0;
  };
  // 提交会员业务数据
  const submit = async (data) => {
    await addList(data, refresh);
  };
  const payInfo = (type, data) => {
    switch (type) {
      case 1:
        submitFrom.recharge = data.recharge;
        break;
      case 2:
        submitFrom.numberOf = data.numberOf;
        submitFrom.endDate = data.endDate;
        break;
      case 3:
        submitFrom.startDate = data.startDate;
        break;
    }

    if (submitFrom.customerId == '') {
      message.warning('请先搜索会员信息！');
      return;
    }
    if (submitFrom.cardId == '') {
      message.warning('请选择票卡！');
      return;
    }
    submit(submitFrom);
  };
  onMounted(() => {
    getList();
  });
</script>

<style lang="less"></style>
