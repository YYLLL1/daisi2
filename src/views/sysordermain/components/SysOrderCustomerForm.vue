<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.customerCode">
            <a-input v-model:value="formData.customerCode" placeholder="请输入客户编码" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名字" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入名字" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="性别" v-bind="validateInfos.sex">
            <a-input v-model:value="formData.sex" placeholder="请输入性别" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="注册手机" v-bind="validateInfos.phone">
            <a-input v-model:value="formData.phone" placeholder="请输入注册手机" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户类型" v-bind="validateInfos.customerType">
            <j-dict-select-tag v-model:value="formData.customerType" dictCode="customer_type" placeholder="请选择客户类型" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="充值金额" v-bind="validateInfos.recharge">
            <a-input-number v-model:value="formData.recharge" placeholder="请输入充值金额" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="人脸信息存在" v-bind="validateInfos.isHumanface">
            <j-dict-select-tag v-model:value="formData.isHumanface" dictCode="is_exist" placeholder="请选择人脸信息存在" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="掌静脉信息存在" v-bind="validateInfos.isPalmarvein">
            <j-dict-select-tag v-model:value="formData.isPalmarvein" dictCode="is_exist" placeholder="请选择掌静脉信息存在" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="来源" v-bind="validateInfos.source">
            <j-dict-select-tag v-model:value="formData.source" dictCode="order_form" placeholder="请选择来源" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="注册时间" v-bind="validateInfos.registerTime">
            <a-date-picker placeholder="请选择注册时间" v-model:value="formData.registerTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单ID" v-bind="validateInfos.sysOrderMainId">
            <a-input v-model:value="formData.sysOrderMainId" placeholder="请输入订单ID" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRaw } from 'vue';
  import { querySysOrderCustomerListByMainId } from '../SysOrderMain.api';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'SysOrderCustomerForm',
    components: {
      JDictSelectTag,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const isForm = true;
      const loading = ref(false);
      const formData = reactive<Record<string, any>>({
        id: '',
        customerCode: '',
        name: '',
        sex: '',
        phone: '',
        customerType: '',
        recharge: '',
        isHumanface: '',
        isPalmarvein: '',
        source: '',
        registerTime: '',
        sysOrderMainId: '',
      });
      //表单验证
      const validatorRules = reactive({});
      const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };

      async function initFormData(mainId) {
        resetFields();
        if (mainId) {
          let list = await querySysOrderCustomerListByMainId(mainId);
          if (list && list.length > 0) {
            let temp = list[0];
            Object.keys(temp).map((k) => {
              formData[k] = temp[k];
            });
          }
        }
      }

      async function getFormData() {
        await validate();
        let subFormData = toRaw(formData);
        if (Object.keys(subFormData).length > 0) {
          return subFormData;
        }
        return false;
      }

      function setFieldsValue(values) {
        if (values) {
          Object.keys(values).map((k) => {
            formData[k] = values[k];
          });
        }
      }

      /**
       * 值改变事件触发-树控件回调
       * @param key
       * @param value
       */
      function handleFormChange(key, value) {
        formData[key] = value;
      }

      return {
        loading,
        formData,
        formItemLayout,
        initFormData,
        getFormData,
        setFieldsValue,
        handleFormChange,
        isForm,
        validateInfos,
      };
    },
  });
</script>
