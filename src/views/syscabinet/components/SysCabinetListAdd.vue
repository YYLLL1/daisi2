<template>
  <a-modal v-model:visible="data.visible" title="新增更衣柜" :footer="null" @ok="handleOk" @cancel="handleOk">
    <a-form class="ly-from" :model="formState" ref="formRef" name="addBasic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off" @finish="onFinish">
      <a-form-item label="柜锁编号：" name="cabinetLockNo" :rules="[{ required: true, message: '请输入柜锁编号！' }]">
        <a-input v-model:value="formState.cabinetLockNo" />
      </a-form-item>

      <a-form-item label="更衣柜编号：" name="lockerNo" :rules="[{ required: true, message: '请输入更衣柜编号！' }]">
        <a-input v-model:value="formState.lockerNo" />
      </a-form-item>

      <a-form-item label="存放位置：" name="position" :rules="[{ required: true, message: '请选择存放位置！' }]">
        <a-select ref="select" v-model:value="formState.position" style="width: 120px">
          <a-select-option value="1">男更衣柜</a-select-option>
          <a-select-option value="2">女更衣柜</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态设置：" name="cabinetState" :rules="[{ required: true, message: '请选择更衣柜状态！' }]">
        <a-select v-model:value="formState.cabinetState" style="width: 120px">
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
  import { reactive, watch } from 'vue';
  const emit = defineEmits(['closeSuccessModal', 'submitModal']);
  const props = defineProps({
    cabinetAddVisible: { type: Boolean },
  });
  let data = reactive({
    visible: false,
  });
  let formState = reactive({
    cabinetLockNo: '',
    lockerNo: '',
    position: '1',
    cabinetState: '1',
  });
  watch(
    () => props.cabinetAddVisible,
    () => {
      data.visible = props.cabinetAddVisible;
    }
  );

  const onFinish = (values: any) => {
    emit('submitModal', '新增', values);
  };

  const handleOk = () => {
    formState.cabinetLockNo = '';
    formState.lockerNo = '';
    formState.position = '1';
    formState.cabinetState = '1';
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
