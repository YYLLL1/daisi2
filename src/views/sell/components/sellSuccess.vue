<template>
  <a-modal :width="1000" :visible="props.successVisible" title="支付成功！" okText="保存" cancelText="关闭" @ok="handleOk" @cancel="closeModal">
    <h3>订单信息</h3>
    <a-descriptions bordered>
      <a-descriptions-item label="订单id">{{ data.id }}</a-descriptions-item>
      <a-descriptions-item label="订单编号">{{ data.orderCode }}</a-descriptions-item>
      <a-descriptions-item label="订单金额">{{ props.successData?.money }}</a-descriptions-item>
      <a-descriptions-item label="订单联系人电话">
        <span class="f-red">{{ props.successData?.phone }}</span>
      </a-descriptions-item>
    </a-descriptions>
    <h3>订单绑定</h3>
    <a-table class="ly-table" ref="tabel" :columns="sellColumns" :data-source="data.sysOrderTicketList" :pagination="false" rowKey="id" :scroll="{ x: 1400, y: 300 }" bordered>
      <template #phone="{ record }">
        <div class="ly-table-input">
          <a-input v-model:value="record.phone" placeholder="输入手机号" block />
        </div>
      </template>
      <template #sysPalmarveinId="{ record, index }">
        <div class="ly-table-input">
          <a-input readonly v-model:value="record.sysPalmarveinId" placeholder="扫描掌静脉" block />
          <a-button type="primary" @click="inputHandel('sysPalmarveinId', index)" preIcon="ant-design:scan-outlined" title="点击录入" />
        </div>
      </template>
      <template #sysHumanfaceId="{ record, index }">
        <div class="ly-table-input">
          <a-input readonly v-model:value="record.sysHumanfaceId" placeholder="扫描人脸识别" block />
          <a-button type="primary" @click="inputHandel('sysHumanfaceId', index)" preIcon="ant-design:scan-outlined" title="点击录入" />
        </div>
      </template>
      <template #sysBraceletId="{ record }">
        <div class="ly-table-input">
          <a-input v-model:value="record.sysBraceletId" placeholder="扫描手环" block />
        </div>
      </template>
      <template #deposit="{ record }">
        <a-input-number v-model:value="record.deposit" :min="0" :max="9999" placeholder="输入押金" style="min-width: 100%" />
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  import { sellColumns } from '../data';
  import { saveBind } from '../api';

  const props = defineProps({
    successData: { type: Object },
    successVisible: { type: Boolean },
  });
  let data = reactive<any>({
    id: '',
    orderCode: '',
    bindTicketList: [],
    bindBraceletList: [],
    sysOrderTicketList: [],
  });
  watch(
    () => props.successData,
    () => {
      data.id = props.successData?.id || '';
      data.orderCode = props.successData?.orderCode || '';
      data.sysOrderTicketList = props.successData?.sysOrderTicketList || [];
    }
  );

  const inputHandel = async (inputRefs, index) => {
    let { sysOrderTicketList } = data;
    switch (inputRefs) {
      //掌静脉
      case 'sysPalmarveinId':
        sysOrderTicketList[index].sysPalmarveinId = '掌静脉' + index;
        break;
      //人脸
      case 'sysHumanfaceId':
        sysOrderTicketList[index].sysHumanfaceId = '人脸' + index;
        break;
    }
  };
  const submitHandel = async () => {
    data.bindTicketList = [];
    data.sysOrderTicketList.forEach((item) => {
      data.bindTicketList.push({
        id: item.id,
        sysBraceletId: item.sysBraceletId,
        sysPalmarveinId: item.sysPalmarveinId,
        sysHumanfaceId: item.sysHumanfaceId,
        sysCustomer: {
          phone: item.phone,
          deposit: item.deposit,
        },
      });
    });
    console.log(data.bindTicketList);
    await saveBind(data.bindTicketList);
  };
  const emit = defineEmits(['closeSuccessModal']);
  const handleOk = () => {
    submitHandel();
  };
  const closeModal = () => {
    emit('closeSuccessModal', false);
  };
</script>
<style lang="less" scoped>
  .f-red {
    color: red;
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 20px 0 10px 20px;
  }
  .ly-table-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin-left: 5px;
    }
  }
  .ly-table-button {
    padding: 0 !important;
  }
</style>
