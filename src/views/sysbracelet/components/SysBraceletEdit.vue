<template>
  <a-modal v-model:visible="data.visible" :title="data.title" :footer="null" @ok="handleOk" @cancel="handleOk">
    <a-form class="ly-from" :model="formState" ref="formRef" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off" @finish="onFinish">
      <a-form-item label="环芯编号" name="braceletLockNo" :rules="[{ required: true, message: '请输入环芯编号！' }]">
        <a-input v-model:value="formState.braceletLockNo" />
      </a-form-item>

      <a-form-item label="手环编号：" name="braceletNo" :rules="[{ required: true, message: '请输入手环编号！' }]">
        <a-input v-model:value="formState.braceletNo" />
      </a-form-item>

      <a-form-item label="手环发放机位置：" name="dispenserPosition" :rules="[{ required: true, message: '请选择手环发放机位置！' }]">
        <a-select v-model:value="formState.dispenserPosition" style="width: 160px">
          <a-select-option value="1">闸机内</a-select-option>
          <a-select-option value="2">闸机外</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="手环回收机位置" name="reclaimerPosition" :rules="[{ required: true, message: '请选择手环回收机位置！' }]">
        <a-select v-model:value="formState.reclaimerPosition" style="width: 160px">
          <a-select-option value="1">闸机内</a-select-option>
          <a-select-option value="2">闸机外</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态设置：" name="braceletState" :rules="[{ required: true, message: '请选择手环状态！' }]">
        <a-select v-model:value="formState.braceletState" style="width: 160px">
          <a-select-option value="1">空闲</a-select-option>
          <a-select-option value="2">维护中</a-select-option>
          <a-select-option value="3">逾期</a-select-option>
          <a-select-option value="4">租借中</a-select-option>
          <a-select-option value="5">待开放</a-select-option>
        </a-select>
      </a-form-item>

      <div class="ly-button">
        <a-button @click="handleOk">返回</a-button>
        <a-button class="button" type="primary" html-type="submit">保存</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { nextTick, reactive, watch } from 'vue';
  const emit = defineEmits(['closeSuccessModal', 'submitModal']);
  const props = defineProps({
    braceletForm: { type: Object },
    braceletEditVisible: { type: Boolean },
  });
  let data = reactive<any>({
    id: '',
    title: '',
    visible: false,
  });
  let formState = reactive({
    braceletLockNo: '',
    braceletNo: '',
    dispenserPosition: '1',
    braceletState: '1',
    reclaimerPosition: '1',
  });
  watch(
    () => props.braceletForm,
    () => {
      data.id = props.braceletForm?.id;
      data.title = `编辑：${props.braceletForm?.braceletNo} 号手环`;
      data.visible = props.braceletEditVisible;

      nextTick(() => {
        formState.braceletLockNo = props.braceletForm?.braceletLockNo;
        formState.braceletNo = props.braceletForm?.braceletNo;
        formState.dispenserPosition = props.braceletForm?.dispenserPosition;
        formState.braceletState = props.braceletForm?.braceletState;
        formState.reclaimerPosition = props.braceletForm?.reclaimerPosition;
      });
    }
  );

  const onFinish = (values: any) => {
    values.id = data.id;
    emit('submitModal', '编辑', values);
  };

  const handleOk = () => {
    emit('closeSuccessModal', false);
  };
</script>

<style lang="less" scoped>
  .ly-from {
    padding: 24px !important;
    .ly-button {
      width: 100%;
      text-align: center;
      button {
        width: 100px;
      }
      .button {
        margin-left: 30px;
      }
    }
  }
</style>
