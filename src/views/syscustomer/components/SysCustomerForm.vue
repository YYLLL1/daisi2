<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.customerCode">
            <a-input v-model:value="formData.customerCode" placeholder="请输入客户编码" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名字" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入名字" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="性别" v-bind="validateInfos.sex">
            <j-dict-select-tag type="radio" v-model:value="formData.sex" dictCode="sex" placeholder="请选择性别" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="注册手机" v-bind="validateInfos.phone">
            <a-input v-model:value="formData.phone" placeholder="请输入注册手机" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="掌静脉ID" v-bind="validateInfos.sysPalmarveinId">
            <a-input v-model:value="formData.sysPalmarveinId" placeholder="请输入掌静脉ID" disabled style="width: calc(100% - 79px); margin-right: 10px" />
            <a-button type="primary" preIcon="ant-design:scan-outlined" title="点击录入" :loading="palmarVeinLoading" @click="handlePalmarVein" style="width: 69px" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="人脸ID" v-bind="validateInfos.sysHumanfaceId">
            <a-input v-model:value="formData.sysHumanfaceId" placeholder="请输入人脸ID" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="关联实体卡" v-bind="validateInfos.sysPcVipCardId">
            <a-input v-model:value="formData.sysPcVipCardId" placeholder="请输入关联实体卡" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="实体卡工本费" v-bind="validateInfos.costOfProduction">
            <j-dict-select-tag type="radio" v-model:value="formData.costOfProduction" dictCode="cost_of_production" placeholder="请选择实体卡工本费" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24">
          <a-form-item label="客户类型" v-bind="validateInfos.customerType">
            <j-dict-select-tag v-model:value="formData.customerType" dictCode="customer_type" placeholder="请选择客户类型" :disabled="props.disabled" />
          </a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item label="折扣" v-bind="validateInfos.discount">
            <a-input-number v-model:value="formData.discount" placeholder="请输入折扣" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="押金" v-bind="validateInfos.deposit">
            <a-input-number v-model:value="formData.deposit" placeholder="请输入押金" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="充值金额" v-bind="validateInfos.recharge">
            <a-input-number v-model:value="formData.recharge" placeholder="请输入充值金额" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24">
          <a-form-item label="来源" v-bind="validateInfos.source">
            <j-dict-select-tag v-model:value="formData.source" dictCode="order_form" placeholder="请选择来源" :disabled="props.disabled" />
          </a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item label="注册时间" v-bind="validateInfos.registerTime">
            <a-date-picker placeholder="请选择注册时间" v-model:value="formData.registerTime" value-format="YYYY-MM-DD" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="协议签名" v-bind="validateInfos.agreementSignature">
            <a-input v-model:value="formData.agreementSignature" placeholder="请输入协议签名" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="身份证号" v-bind="validateInfos.idNumber">
            <a-input v-model:value="formData.idNumber" placeholder="请输入身份证号" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="照片" v-bind="validateInfos.memberPhotos">
            <j-image-upload v-model:value="formData.memberPhotos" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="紧急联系人" v-bind="validateInfos.urgentPeople">
            <a-input v-model:value="formData.urgentPeople" placeholder="请输入紧急联系人" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="紧急联系人电话" v-bind="validateInfos.urgentPeopleTel">
            <a-input v-model:value="formData.urgentPeopleTel" placeholder="请输入紧急联系人电话" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="说明" v-bind="validateInfos.remarks">
            <a-textarea v-model:value="formData.remarks" rows="4" placeholder="请输入说明" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
  <a-modal v-model:visible="palmarVeinLoading" title="录入掌静脉信息" :ok="resetModal">
    <template #footer>
      <a-button key="back" @click="resetModal">取消</a-button>
      <a-button key="submit" type="primary" :loading="submitLoading" @click="resetModal">完成</a-button>
    </template>
    <div style="padding: 24px">
      <p v-for="(item, index) of palmarVeinList" :key="index">{{ index + 1 }} - {{ item.text }}</p>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick, onMounted, onUnmounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate, customerCode, enterPalMarVein } from '../SysCustomer.api';
  import { Form, message } from 'ant-design-vue';
  import { onWebSocket, offWebSocket } from '/@/hooks/web/useWebSocket';
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    customerCode: '',
    name: '',
    sex: '1',
    phone: '',
    sysPalmarveinId: '',
    sysHumanfaceId: '',
    sysPcVipCardId: '',
    costOfProduction: '1',
    customerType: '2',
    discount: undefined,
    deposit: undefined,
    recharge: undefined,
    source: '2',
    registerTime: '',
    agreementSignature: '',
    idNumber: '',
    memberPhotos: '',
    urgentPeople: '',
    urgentPeopleTel: '',
    remarks: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // socket通讯，返回掌静脉信息
  let palmarVeinList = reactive([{ text: '等待信息录入...' }]);
  const palmarVeinLoading = ref(false);
  const submitLoading = ref(true);
  const handlePalmarVein = async () => {
    palmarVeinLoading.value = true;
    palmarVeinList.splice(0, palmarVeinList.length);
    palmarVeinList.push({ text: '等待信息录入...' });
    let result = await enterPalMarVein({ userId: 'userId999' });
    if (result == '10000') {
      palmarVeinList.push({ text: '该掌静脉已有数据!' });
      submitLoading.value = false;
    } else {
      formData.sysPalmarveinId = result;
    }
  };
  onMounted(() => {
    onWebSocket(onWebSocketMessage);
  });
  onUnmounted(() => {
    offWebSocket(onWebSocketMessage);
  });
  const onWebSocketMessage = (data) => {
    if (data.cmd === 'sign') {
      palmarVeinList.push({ text: data.msgTxt });
    }
    if (data.msgTxt == '采集成功') {
      message.success(data.msgTxt);
      submitLoading.value = false;
    }
  };
  const resetModal = () => {
    palmarVeinLoading.value = false;
    submitLoading.value = true;
  };
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(async () => {
      resetFields();
      if (!record.customerCode) {
        let result = await customerCode();
        record.customerCode = result;
      }
      //赋值
      Object.assign(formData, record);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
</style>
