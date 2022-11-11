<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="所属门店" v-bind="validateInfos.store">
            <a-input v-model:value="formData.store" placeholder="请输入所属门店" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="课程名称" v-bind="validateInfos.courseName">
            <a-input v-model:value="formData.courseName" placeholder="请输入课程名称" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="满班人数" v-bind="validateInfos.fullClassNumber">
            <a-input-number v-model:value="formData.fullClassNumber" placeholder="请输入满班人数" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="上课地点" v-bind="validateInfos.courseLocation">
            <a-input v-model:value="formData.courseLocation" placeholder="请输入上课地点" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开班日期" v-bind="validateInfos.classStartDate">
            <a-date-picker placeholder="请选择开班日期" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="formData.classStartDate" style="width: 200px" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="线上同步" v-bind="validateInfos.onLineIs">
            <a-radio-group v-model:value="formData.onLineIs" :disabled="disabled">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="2">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="排课方式" v-bind="validateInfos.arrangingType">
            <a-radio-group v-model:value="formData.arrangingType" :disabled="disabled">
              <a-radio :value="1">单次</a-radio>
              <a-radio :value="2">按周循环</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="formData.arrangingType == 2">
          <a-form-item label="选择循环天" v-bind="validateInfos.cycleDays">
            <a-checkbox-group v-model:value="formData.cycleDays">
              <a-checkbox value="1">周一</a-checkbox>
              <a-checkbox value="2">周二</a-checkbox>
              <a-checkbox value="3">周三</a-checkbox>
              <a-checkbox value="5">周五</a-checkbox>
              <a-checkbox value="6">周六</a-checkbox>
              <a-checkbox value="7">周日</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开始日期" v-bind="validateInfos.classBeginDate">
            <a-date-picker :showTime="false" valueFormat="YYYY-MM-DD" placeholder="开始日期" v-model:value="formData.classBeginDate" style="width: 200px; margin-right: 20px" :disabled="disabled" />
            <a-date-picker :showTime="false" valueFormat="YYYY-MM-DD" placeholder="结束日期" v-model:value="formData.classEndDate" style="width: 200px" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开始时间" v-bind="validateInfos.startTime">
            <TimePicker style="width: 200px; margin-right: 20px" v-model:value="formData.startTime" value-format="HH:mm:ss" use12-hours placeholder="请输入起始时间" :disabled="disabled" />
            <TimePicker style="width: 200px" v-model:value="formData.endTime" value-format="HH:mm:ss" use12-hours placeholder="请输入结束时间" :disabled="disabled" />
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
  import { ref, reactive, nextTick } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SysCourse.api';
  import { Form, TimePicker } from 'ant-design-vue';
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    store: '',
    courseName: '',
    fullClassNumber: 0,
    courseLocation: '',
    classStartDate: '',
    onLineIs: 1,
    arrangingType: 1,
    classBeginDate: '',
    classEndDate: '',
    startTime: '',
    endTime: '',
    cycleDays: ['1'],
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
      if (record.cycleDays.indexOf(',') == -1) {
        record.cycleDays = [record.cycleDays];
      } else {
        record.cycleDays = record.cycleDays.split(',');
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
