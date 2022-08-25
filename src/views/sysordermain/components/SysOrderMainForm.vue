<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="订单编码" v-bind="validateInfos.orderCode">
            <a-input v-model:value="formData.orderCode" placeholder="请输入订单编码" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="下单时间" v-bind="validateInfos.xdDate">
            <a-date-picker placeholder="请选择下单时间" v-model:value="formData.xdDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单总额" v-bind="validateInfos.money">
            <a-input-number v-model:value="formData.money" placeholder="请输入订单总额" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.remark">
            <a-input v-model:value="formData.remark" placeholder="请输入备注" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单状态	" v-bind="validateInfos.orderStatus">
            <j-dict-select-tag v-model:value="formData.orderStatus" dictCode="order_status" placeholder="请选择订单状态	" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="类目	" v-bind="validateInfos.category">
            <j-dict-select-tag v-model:value="formData.category" dictCode="category" placeholder="请选择类目	" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手机号码" v-bind="validateInfos.phone">
            <a-input v-model:value="formData.phone" placeholder="请输入手机号码" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款方式" v-bind="validateInfos.paymentMethod">
            <j-dict-select-tag v-model:value="formData.paymentMethod" dictCode="payment_method" placeholder="请选择收款方式" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="下单方式" v-bind="validateInfos.orderForm">
            <j-dict-select-tag v-model:value="formData.orderForm" dictCode="order_form" placeholder="请选择下单方式" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane tab="订单票类" key="sysOrderTicket" :forceRender="true">
        <j-vxe-table
          :keep-source="true"
          ref="sysOrderTicketTableRef"
          :loading="sysOrderTicketTable.loading"
          :columns="sysOrderTicketTable.columns"
          :dataSource="sysOrderTicketTable.dataSource"
          :maxHeight="300"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="订单客户" key="sysOrderCustomer" :forceRender="true">
        <sys-order-customer-form ref="sysOrderCustomerFormRef" :disabled="formDisabled" />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, toRaw } from 'vue';
  import { useValidateAntFormAndTable } from '/@/hooks/system/useJvxeMethods';
  import { querySysOrderTicketListByMainId, queryDataById, saveOrUpdate } from '../SysOrderMain.api';
  import SysOrderCustomerForm from './SysOrderCustomerForm.vue';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { sysOrderTicketColumns } from '../SysOrderMain.data';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'SysOrderMainForm',
    components: {
      JDictSelectTag,
      JVxeTable,
      SysOrderCustomerForm,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const loading = ref(false);
      const sysOrderTicketTableRef = ref();
      const sysOrderTicketTable = reactive<Record<string, any>>({
        loading: false,
        columns: sysOrderTicketColumns,
        dataSource: [],
      });
      const sysOrderCustomerFormRef = ref();
      const activeKey = ref('sysOrderTicket');
      const formData = reactive<Record<string, any>>({
        id: '',
        orderCode: '',
        xdDate: '',
        money: '',
        remark: '',
        orderStatus: '',
        category: '',
        phone: '',
        paymentMethod: '',
        orderForm: '',
      });

      //表单验证
      const validatorRules = reactive({});
      const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
      const dbData = {};
      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };

      const formDisabled = computed(() => {
        return props.disabled;
      });

      function add() {
        resetFields();
        sysOrderTicketTable.dataSource = [];
        sysOrderCustomerFormRef.value.initFormData();
      }

      async function edit(row) {
        //主表数据
        await queryMainData(row.id);
        //子表数据
        const sysOrderTicketDataList = await querySysOrderTicketListByMainId(row['id']);
        sysOrderTicketTable.dataSource = [...sysOrderTicketDataList];
        await sysOrderCustomerFormRef.value.initFormData(row['id']);
      }

      async function queryMainData(id) {
        const row = await queryDataById(id);
        Object.keys(row).map((k) => {
          formData[k] = row[k];
        });
      }

      const { getSubFormAndTableData, transformData } = useValidateAntFormAndTable(activeKey, {
        sysOrderTicket: sysOrderTicketTableRef,
        sysOrderCustomer: sysOrderCustomerFormRef,
      });

      async function getFormData() {
        await validate();
        return transformData(toRaw(formData));
      }

      async function submitForm() {
        const mainData = await getFormData();
        const subData = await getSubFormAndTableData();
        const values = Object.assign({}, dbData, mainData, subData);
        console.log('表单提交数据', values);
        const isUpdate = values.id ? true : false;
        await saveOrUpdate(values, isUpdate);
        //关闭弹窗
        emit('success');
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
        sysOrderTicketTableRef,
        sysOrderTicketTable,
        sysOrderCustomerFormRef,
        validatorRules,
        validateInfos,
        activeKey,
        loading,
        formData,
        setFieldsValue,
        handleFormChange,
        formItemLayout,
        formDisabled,
        getFormData,
        submitForm,
        add,
        edit,
      };
    },
  });
</script>
