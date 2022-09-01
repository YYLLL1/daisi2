<template>
  <a-modal v-model:visible="data.visible" title="新增闸机" :footer="null" @ok="handleOk" @cancel="handleOk">
    <a-form class="ly-from" :model="formState" ref="formRef" name="addBasic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off" @finish="onFinish">
      <a-form-item label="机芯编号：" name="gateLockNo" :rules="[{ required: true, message: '请输入机芯编号！' }]">
        <a-input v-model:value="formState.gateLockNo" />
      </a-form-item>

      <a-form-item label="闸机编号：" name="lockerNo" :rules="[{ required: true, message: '请输入闸机编号！' }]">
        <a-input v-model:value="formState.lockerNo" />
      </a-form-item>

      <a-form-item label="存放位置：" name="position" :rules="[{ required: true, message: '请选择存放位置！' }]">
        <a-select v-model:value="formState.position" style="width: 160px">
          <a-select-option value="1">游泳馆入口</a-select-option>
          <a-select-option value="2">游泳馆出口</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态设置：" name="gateState">
        <a-select v-model:value="formState.gateState" style="width: 160px">
          <a-select-option value="1">在线状态</a-select-option>
          <a-select-option value="2">离线状态</a-select-option>
          <a-select-option value="3">维护中</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-show="formState.gateState == '1'" label="进出方向：" name="accessDirection">
        <a-select v-model:value="formState.accessDirection" style="width: 160px">
          <a-select-option value="1">可进可出</a-select-option>
          <a-select-option value="2">可进不可出</a-select-option>
          <a-select-option value="3">不可进可出</a-select-option>
          <a-select-option value="4">不可进不可出</a-select-option>
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
  import { reactive, watch } from 'vue';
  const emit = defineEmits(['closeSuccessModal', 'submitModal']);
  const props = defineProps({
    gateAddVisible: { type: Boolean },
  });
  let data = reactive({
    visible: false,
  });
  let formState = reactive({
    gateLockNo: '',
    lockerNo: '',
    position: '1',
    gateState: '1',
    accessDirection: '1',
  });
  watch(
    () => props.gateAddVisible,
    () => {
      data.visible = props.gateAddVisible;
    }
  );

  const onFinish = (values: any) => {
    emit('submitModal', '新增', values);
    handleOk();
  };

  const handleOk = () => {
    formState.gateLockNo = '';
    formState.lockerNo = '';
    formState.position = '1';
    formState.gateState = '1';
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
