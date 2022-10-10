<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="门票名称" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入门票名称" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="门票类型" v-bind="validateInfos.ticketType">
            <j-dict-select-tag v-model:value="formData.ticketType" dictCode="ticket_type" placeholder="请选择门票类型" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="门票价格" v-bind="validateInfos.price">
            <a-input-number v-model:value="formData.price" placeholder="请输入门票价格" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="售卖状态" v-bind="validateInfos.sellStatus">
            <j-dict-select-tag v-model:value="formData.sellStatus" dictCode="sell_status" placeholder="请选择售卖状态" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="人数" v-bind="validateInfos.peopleNumber">
            <a-input-number v-model:value="formData.peopleNumber" placeholder="请输入人数" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="特殊说明" v-bind="validateInfos.special">
            <a-input v-model:value="formData.special" placeholder="请输入特殊说明" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单位" v-bind="validateInfos.unit">
            <j-dict-select-tag v-model:value="formData.unit" dictCode="unit" placeholder="请选择单位" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="二维码闸机核销" v-bind="validateInfos.edTicketWriteOff">
            <j-dict-select-tag type="radio" v-model:value="formData.edTicketWriteOff" dictCode="ed_ticket_write_off" placeholder="请选择二维码闸机核销" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="线上同步" v-bind="validateInfos.onLineIs">
            <j-dict-select-tag type="radio" v-model:value="formData.onLineIs" dictCode="is_exist" placeholder="请选择线上同步" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="可用时段">
            <TimePicker style="width: 200px; margin-right: 20px" v-model:value="formData.startTime" use12-hours placeholder="请输入起始时间" :disabled="disabled" />
            <TimePicker style="width: 200px" v-model:value="formData.endTime" use12-hours placeholder="请输入结束时间" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="有效期天数" v-bind="validateInfos.validDays">
            <a-input-number v-model:value="formData.validDays" placeholder="请输入有效期天数" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="有效日期" v-bind="validateInfos.termOfValidity">
            <a-range-picker style="width: 400px" v-model:value="formData.termOfValidity" :disabled-date="disabledDate" format="YYYY-MM-DD" placeholder="请选择有效日期" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.remarks">
            <a-input v-model:value="formData.remarks" placeholder="请输入备注" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { Dayjs } from 'dayjs';
  import moment from 'moment';
  import { ref, reactive, nextTick } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysTicket.api';
  import { Form, TimePicker } from 'ant-design-vue';

  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    name: '',
    ticketType: undefined,
    price: undefined,
    sellStatus: undefined,
    peopleNumber: 1,
    special: '',
    unit: undefined,
    edTicketWriteOff: undefined,
    onLineIs: undefined,
    startTime: '',
    endTime: '',
    validDays: undefined,
    termOfValidity: '',
    remarks: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    name: [{ required: true, message: '请输入门票名称!' }],
    ticketType: [{ required: true, message: '请输入门票类型!' }],
    price: [{ required: true, message: '请输入门票价格!' }],
    sellStatus: [{ required: true, message: '请输入售卖状态!' }],
    peopleNumber: [{ required: true, message: '请输入人数!' }],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // 限定只能选今天往后的日期
  const disabledDate = (current: Dayjs) => {
    return current && current < moment().subtract(1, 'days').endOf('day');
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
