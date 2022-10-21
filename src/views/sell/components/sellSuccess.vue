<template>
  <a-modal :width="1000" :visible="props.successVisible" title="支付成功！" okText="关闭" @ok="handleOk" @cancel="closeModal">
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
    <a-table class="ly-table" :columns="sellColumns" :data-source="data.sysOrderTicketList" :pagination="false" rowKey="id" :scroll="{ x: 1400, y: 300 }" bordered>
      <template #phone="{ record }">
        <div class="ly-table-input">
          <a-input v-model:value="record.phone" placeholder="输入手机号" block />
        </div>
      </template>
      <template #sysPalmarveinId="{ record, index }">
        <div class="ly-table-input">
          <a-input :ref="'sysPalmarveinId' + index" readonly v-model:value="record.sysPalmarveinId" placeholder="扫描掌静脉" block />
          <a-button type="primary" @click="inputHandel('sysPalmarveinId', index)" preIcon="ant-design:scan-outlined" title="点击录入" />
        </div>
      </template>
      <template #sysHumanfaceId="{ record, index }">
        <div class="ly-table-input">
          <a-input :ref="'sysHumanfaceId' + index" readonly v-model:value="record.sysHumanfaceId" placeholder="扫描人脸识别" block />
          <a-button type="primary" @click="inputHandel('sysHumanfaceId', index)" preIcon="ant-design:scan-outlined" title="点击录入" />
        </div>
      </template>
      <template #sysBraceletId="{ record, index }">
        <div class="ly-table-input">
          <a-input :ref="'sysBraceletId' + index" readonly v-model:value="record.sysBraceletId" placeholder="扫描手环" block />
          <a-button type="primary" @click="bracelet('sysBraceletId', index)" preIcon="ant-design:scan-outlined" title="点击录入" />
        </div>
      </template>
      <template #deposit="{ record, index }">
        <div class="ly-table-input">
          <a-input :ref="'deposit' + index" v-model:value="record.deposit" placeholder="输入押金" block />
        </div>
      </template>
      <template #operation="{ record, index }">
        <a-button class="ly-table-button" type="primary" @click="submitHandel(record, index)" block>绑定</a-button>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
  import { getCurrentInstance, reactive, watch } from 'vue';
  import { sellColumns, SysOrderTicket } from '../data';
  import { saveBind, getBraceletNo } from '../api';
  import { message } from 'ant-design-vue';
  // 获取ref
  const ComponentInternalInstance = getCurrentInstance();

  const props = defineProps({
    successData: { type: Object },
    successVisible: { type: Boolean },
  });
  let data = reactive({
    id: '',
    orderCode: '',
    sysOrderTicketList: [],
  });
  let sysOrderTicket = reactive<SysOrderTicket>({});
  watch(
    () => props.successData,
    () => {
      data.id = props.successData?.id || '';
      data.orderCode = props.successData?.orderCode || '';
      data.sysOrderTicketList = props.successData?.sysOrderTicketList || [];
    }
  );

  const inputHandel = (inputRefs, index) => {
    const refsI = inputRefs + index;
    const { $refs } = (ComponentInternalInstance as any).proxy;
    $refs[refsI].stateValue = '等待数据录入...';
    setTimeout(() => {
      $refs[refsI].stateValue = refsI + '测试数据';
      sysOrderTicket[`${inputRefs}`] = refsI + '测试数据';
    }, 1000);
  };
  //测试手环提交
  const bracelet = async (inputRefs, index) => {
    const refsI = inputRefs + index;
    const { $refs } = (ComponentInternalInstance as any).proxy;
    console.log($refs);
    $refs[refsI].stateValue = '等待数据录入...';
    let result = await getBraceletNo();
    if (result) {
      $refs[refsI].stateValue = result;
      sysOrderTicket[`${inputRefs}`] = result;
    } else {
      $refs[refsI].stateValue = '';
      message.error('未检测到手环数据！');
    }
  };
  const submitHandel = (record, index) => {
    sysOrderTicket.id = record.id;
    sysOrderTicket.phone = record.phone;
    sysOrderTicket.deposit = record.deposit;
    const { $refs } = (ComponentInternalInstance as any).proxy;
    if (record.deposit) {
      save();
    } else {
      $refs['deposit' + index].focus();
      message.error('请输入押金！');
    }
  };

  //提交绑定
  const save = async () => {
    await saveBind(sysOrderTicket);
  };

  const emit = defineEmits(['closeSuccessModal']);
  const handleOk = () => {
    emit('closeSuccessModal', false);
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
