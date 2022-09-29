<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :width="700">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './position.data';
  import { saveOrUpdatePosition, getUserDepartList } from './position.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const departOptions = ref([]);
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const showFooter = ref(true);
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    showFooter.value = data?.showFooter ?? true;
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //查所属部门/赋值
      const userDepart = await getUserDepartList({ userId: data.record.id });
      if (userDepart && userDepart.length > 0) {
        data.record.selecteddeparts = userDepart;
        let selectDepartKeys = Array.from(userDepart, ({ key }) => key);
        data.record.selecteddeparts = selectDepartKeys.join(',');
        departOptions.value = userDepart.map((item) => {
          return { label: item.title, value: item.key };
        });
      }
      //负责部门/赋值
      data.record.departIds && !Array.isArray(data.record.departIds) && (data.record.departIds = data.record.departIds.split(','));
      //update-begin---author:zyf   Date:20211210  for：避免空值显示异常------------
      data.record.departIds = data.record.departIds == '' ? [] : data.record.departIds;
      //update-begin---author:zyf   Date:20211210  for：避免空值显示异常------------
      console.log(data.record);
      // 无论新增还是编辑，都可以设置表单值
      if (typeof data.record === 'object') {
        setFieldsValue({
          ...data.record,
        });
      }
      // 隐藏底部时禁用整个表单
      //update-begin-author:taoyan date:2022-5-24 for: VUEN-1117【issue】0523周开源问题
      setProps({ disabled: !showFooter.value });
      //update-end-author:taoyan date:2022-5-24 for: VUEN-1117【issue】0523周开源问题
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增职务' : '编辑职务'));
  //表单提交事件
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdatePosition(values, isUpdate.value);

      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
