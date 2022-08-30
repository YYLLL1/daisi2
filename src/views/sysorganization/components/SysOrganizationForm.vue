<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="组织名字" v-bind="validateInfos.orgname">
            <a-input v-model:value="formData.orgname" placeholder="请输入组织名字" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="组织描述" v-bind="validateInfos.description">
            <a-input v-model:value="formData.description" placeholder="请输入组织描述" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="组织等级" v-bind="validateInfos.orglevel">
            <a-input-number v-model:value="formData.orglevel" placeholder="请输入组织等级" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="父级节点" v-bind="validateInfos.pid">
            <j-tree-select
              placeholder="请选择父级节点"
              v-model:value="formData.pid"
              dict="sys_organization,orgname,id"
              pidField="pid"
              pidValue="0"
              hasChildField="has_child"
              :disabled="props.disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="租户ID" v-bind="validateInfos.tenantId">
            <a-input-number v-model:value="formData.tenantId" placeholder="请输入租户ID" style="width: 100%" :disabled="props.disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JTreeSelect from '/@/components/Form/src/jeecg/components/JTreeSelect.vue';
  import { getValueType } from '/@/utils';
  import { loadTreeData, saveOrUpdateDict } from '../SysOrganization.api';
  import { Form } from 'ant-design-vue';

  const useForm = Form.useForm;
  const formRef = ref();
  const expandedRowKeys = ref([]);
  const treeData = ref([]);
  // const pidField = ref<string>('pid');
  const emit = defineEmits(['register', 'ok']);
  let model: Nullable<Recordable> = null;
  let isUpdate = ref(true);
  const formData = reactive<Record<string, any>>({
    id: '',
    orgname: '',
    id: '',
    description: '',
    id: '',
    orglevel: undefined,
    id: '',
    pid: '',
    id: '',
    tenantId: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {};
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });

  /**
   * 新增
   */
  function add(obj = {}) {
    edit(obj);
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(async () => {
      resetFields();
      expandedRowKeys.value = [];
      treeData.value = await loadTreeData({ async: false, pcode: '' });
      //赋值
      Object.assign(formData, record);
      model = record;
    });
  }

  /**
   * 根据pid获取展开的节点
   * @param pid
   * @param arr
   */
  function getExpandKeysByPid(pid, arr) {
    if (pid && arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].key == pid && unref(expandedRowKeys).indexOf(pid) < 0) {
          expandedRowKeys.value.push(arr[i].key);
          getExpandKeysByPid(arr[i]['parentId'], unref(treeData));
        } else {
          getExpandKeysByPid(pid, arr[i].children);
        }
      }
    }
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    isUpdate.value = false;
    //时间格式化
    if (formData.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in formData) {
      //如果该数据是数组并且是字符串类型
      if (formData[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          formData[data] = formData[data].join(',');
        }
      }
    }
    await saveOrUpdateDict(formData, isUpdate.value)
      .then(async (res) => {
        if (res.success) {
          await getExpandKeysByPid(formData['pid'], unref(treeData));
          emit('ok', {
            isUpdate: unref(isUpdate),
            values: { ...formData },
            expandedArr: unref(expandedRowKeys).reverse(),
            // 是否更改了父级节点
            changeParent: model != null && model['pid'] != formData['pid'],
          });
          createMessage.success(res.message);
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  /**
   * 值改变事件触发
   * @param key
   * @param value
   */
  // function handleFormChange(key, value) {
  //   formData[key] = value;
  // }

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
