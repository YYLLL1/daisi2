<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" ref="formRef" />
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="订单票类" key="sysOrderTicket" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="sysOrderTicket"
          :loading="sysOrderTicketTable.loading"
          :columns="sysOrderTicketTable.columns"
          :dataSource="sysOrderTicketTable.dataSource"
          :height="340"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="订单客户" key="sysOrderCustomer" :forceRender="true">
        <SysOrderCustomerForm ref="sysOrderCustomerForm" :disabled="formDisabled" />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods';
  import SysOrderCustomerForm from './SysOrderCustomerForm.vue';
  import { formSchema, sysOrderTicketColumns } from '../SysOrderMain.data';
  import { saveOrUpdate, sysOrderTicketList, sysOrderCustomerList } from '../SysOrderMain.api';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const formDisabled = ref(false);
  const refKeys = ref(['sysOrderTicket', 'sysOrderCustomer']);
  const activeKey = ref('sysOrderTicket');
  const sysOrderTicket = ref();
  const sysOrderCustomerForm = ref();
  const tableRefs = { sysOrderTicket };
  const sysOrderTicketTable = reactive({
    loading: false,
    dataSource: [],
    columns: sysOrderTicketColumns,
  });
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await reset();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    formDisabled.value = !data?.showFooter;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      sysOrderCustomerForm.value.initFormData(sysOrderCustomerList, data?.record?.id);
      requestSubTableData(sysOrderTicketList, { id: data?.record?.id }, sysOrderTicketTable);
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //方法配置
  const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(requestAddOrEdit, classifyIntoFormData, tableRefs, activeKey, refKeys, validateSubForm);

  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function reset() {
    await resetFields();
    activeKey.value = 'sysOrderTicket';
    sysOrderTicketTable.dataSource = [];
    sysOrderCustomerForm.value.resetFields();
  }
  function classifyIntoFormData(allValues) {
    let main = Object.assign({}, allValues.formValue);
    return {
      ...main, // 展开
      sysOrderTicketList: allValues.tablesValue[0].tableData,
      sysOrderCustomerList: sysOrderCustomerForm.value.getFormData(),
    };
  }
  //校验所有一对一子表表单
  function validateSubForm(allValues) {
    return new Promise((resolve) => {
      Promise.all([sysOrderCustomerForm.value.validateForm(1)])
        .then(() => {
          resolve(allValues);
        })
        .catch((e) => {
          if (e.error === VALIDATE_FAILED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            activeKey.value = e.index == null ? unref(activeKey) : refKeys.value[e.index];
          } else {
            console.error(e);
          }
        });
    });
  }
  //表单提交事件
  async function requestAddOrEdit(values) {
    try {
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
