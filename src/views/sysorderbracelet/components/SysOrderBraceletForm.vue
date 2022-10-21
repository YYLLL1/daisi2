<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="手环状态" v-bind="validateInfos.braceletStatu">
            <j-dict-select-tag v-model:value="formData.braceletStatu" dictCode="bracelet_statu" placeholder="请选择手环状态" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手环编号" v-bind="validateInfos.sysBraceletId">
            <a-input v-model:value="formData.sysBraceletId" placeholder="请输入手环编号" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="使用者" v-bind="validateInfos.username">
            <a-input v-model:value="formData.username" placeholder="请输入使用者" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手机号" v-bind="validateInfos.phone">
            <a-input v-model:value="formData.phone" placeholder="请输入手机号" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手环订单号" v-bind="validateInfos.braceletOrderCode">
            <a-input v-model:value="formData.braceletOrderCode" placeholder="请输入手环订单号" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="已收押金" v-bind="validateInfos.deposit">
            <a-input-number v-model:value="formData.deposit" placeholder="请输入已收押金" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款方式" v-bind="validateInfos.paymentMethod">
            <j-dict-select-tag v-model:value="formData.paymentMethod" dictCode="payment_method" placeholder="请选择收款方式" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="下单方式" v-bind="validateInfos.orderForm">
            <j-dict-select-tag v-model:value="formData.orderForm" dictCode="order_form" placeholder="请选择下单方式" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="下单时间" v-bind="validateInfos.orderTime">
            <a-date-picker placeholder="请选择下单时间" v-model:value="formData.orderTime" value-format="YYYY-MM-DD" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="储柜状态" v-bind="validateInfos.cabinetStatu">
            <j-dict-select-tag v-model:value="formData.cabinetStatu" dictCode="cabinet_statu" placeholder="请选择储柜状态" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysOrderBracelet.api';
  import { Form } from 'ant-design-vue';

  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    braceletStatu: '',
    sysBraceletId: '',
    username: '',
    phone: '',
    braceletOrderCode: '',
    deposit: undefined,
    paymentMethod: '',
    orderForm: '',
    orderTime: '',
    cabinetStatu: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

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
    nextTick(() => {
      resetFields();
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
