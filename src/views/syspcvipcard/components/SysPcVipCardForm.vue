<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="卡号" v-bind="validateInfos.cardNumber">
            <a-input v-model:value="formData.cardNumber" placeholder="请输入卡号" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="卡名称" v-bind="validateInfos.cardName">
            <a-input v-model:value="formData.cardName" placeholder="请输入卡名称" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="卡类型" v-bind="validateInfos.cardType">
            <j-dict-select-tag v-model:value="formData.cardType" dictCode="card_type" placeholder="请选择卡类型" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="卡属性" v-bind="validateInfos.cardAttribute">
            <j-dict-select-tag v-model:value="formData.cardAttribute" dictCode="card_attribute" placeholder="请选择卡属性" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="通用属性" v-bind="validateInfos.commonAttributes">
            <j-dict-select-tag v-model:value="formData.commonAttributes" dictCode="common_attributes" placeholder="请选择通用属性" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="限制" v-bind="validateInfos.astrict">
            <a-input-number v-model:value="formData.astrict" placeholder="请输入限制" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="有效期" v-bind="validateInfos.termOfValidity">
            <a-input-number v-model:value="formData.termOfValidity" placeholder="请输入有效期" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="有效期累加" v-bind="validateInfos.accumulation">
            <j-dict-select-tag v-model:value="formData.accumulation" dictCode="accumulation" placeholder="请选择有效期累加" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="线上同步" v-bind="validateInfos.onLineIs">
            <j-dict-select-tag type="radio" v-model:value="formData.onLineIs" dictCode="is_exist" placeholder="请选择线上同步" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="次数" v-bind="validateInfos.numberOf">
            <a-input-number v-model:value="formData.numberOf" placeholder="请输入次数" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="赠送次数" v-bind="validateInfos.numberOfGifts">
            <a-input-number v-model:value="formData.numberOfGifts" placeholder="请输入赠送次数" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="价格" v-bind="validateInfos.price">
            <a-input-number v-model:value="formData.price" placeholder="请输入价格" style="width: 100%" :disabled="props.disabled" />
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
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysPcVipCard.api';
  import { Form } from 'ant-design-vue';

  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    cardNumber: '',
    cardName: '',
    cardType: undefined,
    cardAttribute: undefined,
    commonAttributes: undefined,
    astrict: undefined,
    termOfValidity: undefined,
    accumulation: undefined,
    onLineIs: undefined,
    numberOf: undefined,
    numberOfGifts: undefined,
    price: undefined,
    remarks: '',
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
