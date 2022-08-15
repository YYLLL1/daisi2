<template>
  <a-modal :width="1000" :visible="props.successVisible" title="支付成功！" @ok="handleOk" @cancel="closeModal">
    <a-table :columns="columns" :data-source="data.sysOrderTicketList" :pagination="false" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'phone'">
          <div>
            <a-button type="primary" @click="phoneHandel(column, record)">点击录入</a-button>
            <a-input v-model:value="phoneValue" placeholder="请扫描用户手机号" />
          </div>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  const columns = [
    {
      title: '票号',
      dataIndex: 'sysTicketId',
      key: 'sysTicketId',
    },
    {
      title: '票种',
      dataIndex: 'ticketName',
      key: 'ticketName',
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '单价',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '掌静脉',
      key: 'sysPalmarveinId',
      dataIndex: 'sysPalmarveinId',
    },
    {
      title: '人脸信息',
      key: 'sysHumanfaceId',
      dataIndex: 'sysHumanfaceId',
    },
    {
      title: '手环租赁',
      key: 'sysBraceletId',
      dataIndex: 'sysBraceletId',
    },
    {
      title: '支付押金',
      key: 'deposit',
      dataIndex: 'deposit',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  const props = defineProps({
    successData: { type: Object },
    successVisible: { type: Boolean },
  });
  let data = reactive({
    id: '',
    orderCode: '',
    sysOrderTicketList: [],
  });
  watch(
    () => props.successData,
    () => {
      console.log(props.successData);
      data.id = props.successData?.id || '';
      data.orderCode = props.successData?.orderCode || '';
      data.sysOrderTicketList = props.successData?.sysOrderTicketList || [];
    }
  );
  // const formData = reactive([]);
  const phoneValue = ref('');
  const phoneHandel = (column, record) => {
    console.log(column, record);
  };
  const emit = defineEmits(['closeSuccessModal', 'close']);
  const handleOk = () => {
    emit('closeSuccessModal', false);
  };
  const closeModal = () => {
    emit('close', 'success');
  };
</script>
