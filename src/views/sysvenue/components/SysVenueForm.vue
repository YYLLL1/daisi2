<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-row>
        <a-col :span="24">
          <a-form-item label="场馆名字" v-bind="validateInfos.venueName">
            <a-input v-model:value="formData.venueName" placeholder="请输入场馆名字" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="场馆图片" v-bind="validateInfos.venuePhotos">
            <j-image-upload v-model:value="formData.venuePhotos" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="场馆电话" v-bind="validateInfos.venueTel">
            <a-input v-model:value="formData.venueTel" placeholder="请输入场馆电话" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="场馆介绍" v-bind="validateInfos.venueIntroduction">
            <a-textarea v-model:value="formData.venueIntroduction" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="请输入场馆介绍" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="运营时间" v-bind="validateInfos.venueTime">
            <a-textarea v-model:value="formData.venueTime" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="请输入运营时间" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="入场须知" v-bind="validateInfos.venueNotice">
            <a-textarea v-model:value="formData.venueNotice" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="请输入入场须知" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysVenue.api';
  import { Form } from 'ant-design-vue';

  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    venueName: '',
    venuePhotos: '',
    venueIntroduction: '',
    venueTel: '',
    venueTime: '',
    venueNotice: '',
  });
  const { createMessage } = useMessage();
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

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
