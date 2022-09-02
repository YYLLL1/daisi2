<template>
  <a-modal title="编辑" width="800px" :visible="visible" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">
    <SysVenueForm ref="registerForm" @ok="submitCallback" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import SysVenueForm from './SysVenueForm.vue';

  const visible = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    visible.value = true;
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }

  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleCancel();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    edit,
  });
</script>
