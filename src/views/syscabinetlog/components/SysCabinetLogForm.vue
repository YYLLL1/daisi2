<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="租柜状态" v-bind="validateInfos.rentCabinetStatus">
            <j-dict-select-tag v-model:value="formData.rentCabinetStatus" dictCode="rent_cabinet_status" placeholder="请选择租柜状态" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="更衣柜编号" v-bind="validateInfos.lockerNo">
            <a-input v-model:value="formData.lockerNo" placeholder="请输入更衣柜编号" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="使用者" v-bind="validateInfos.username">
            <a-input v-model:value="formData.username" placeholder="请输入使用者" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手机号" v-bind="validateInfos.phone">
            <a-input v-model:value="formData.phone" placeholder="请输入手机号" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="柜子订单号" v-bind="validateInfos.cabinetOrderCode">
            <a-input v-model:value="formData.cabinetOrderCode" placeholder="请输入柜子订单号" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开柜方式" v-bind="validateInfos.openCabinetType">
            <j-dict-select-tag v-model:value="formData.openCabinetType" dictCode="open_cabinet_type" placeholder="请选择开柜方式" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="绑定ID" v-bind="validateInfos.bindingId">
            <a-input v-model:value="formData.bindingId" placeholder="请输入绑定ID" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开柜时间" v-bind="validateInfos.openCabinetTime">
            <a-date-picker placeholder="请选择开柜时间" v-model:value="formData.openCabinetTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="退柜时间" v-bind="validateInfos.returnCabinetTime">
            <a-date-picker placeholder="请选择退柜时间" v-model:value="formData.returnCabinetTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps } from 'vue';
  // import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import moment from 'moment';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysCabinetLog.api';
  import { Form } from 'ant-design-vue';

  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    rentCabinetStatus: '',
    id: '',
    lockerNo: '',
    id: '',
    username: '',
    id: '',
    phone: '',
    id: '',
    cabinetOrderCode: '',
    id: '',
    openCabinetType: '',
    id: '',
    bindingId: '',
    id: '',
    openCabinetTime: '',
    id: '',
    returnCabinetTime: '',
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
