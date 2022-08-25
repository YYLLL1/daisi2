<template>
  <a-modal v-model:visible="data.visible" :title="data.title" :footer="null" @ok="handleOk" @cancel="handleOk">
    <a-form class="ly-from" :model="formState" ref="formRef" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off" @finish="onFinish">
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
      <a-form-item label="开合状态：" name="switchState">
        <span v-if="formState.switchControl" style="color: green">已打开</span>
        <span v-else style="color: red">已关闭</span>
      </a-form-item>
      <a-form-item label="开合控制：" name="switchControl">
        <a-switch v-model:checked="formState.switchControl" checked-children="开" un-checked-children="关" @change="changeHandel" />
      </a-form-item>

      <div class="ly-button">
        <a-button @click="handleOk">返回</a-button>
        <a-button class="button" type="primary" html-type="submit">保存</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { getCurrentInstance, nextTick, reactive, watch } from 'vue';
  import { IFormState } from '../SysCabinetList.data';
  const emit = defineEmits(['closeSuccessModal', 'submitModal']);
  const props = defineProps({
    cabinetForm: { type: Object },
    cabinetTitle: { type: String },
    cabinetEditVisible: { type: Boolean },
  });
  let data = reactive<any>({
    id: '',
    title: '',
    visible: false,
  });
  let formState = reactive<IFormState>({
    id: '',
    cabinetLockNo: '',
    lockerNo: '',
    position: '1',
    cabinetState: '1',
    switchState: '关',
    switchControl: false,
  });
  watch(
    () => props.cabinetForm,
    () => {
      data.id = props.cabinetForm?.id;
      data.title = props.cabinetTitle;
      data.visible = props.cabinetEditVisible;

      nextTick(() => {
        formState.cabinetLockNo = props.cabinetForm?.cabinetLockNo;
        formState.lockerNo = props.cabinetForm?.lockerNo;
        formState.position = props.cabinetForm?.position;
        formState.cabinetState = props.cabinetForm?.cabinetState;
        formState.switchState = props.cabinetForm?.switchState;
        formState.switchControl = props.cabinetForm?.switchControl;
      });
    }
  );

  const onFinish = (values: any) => {
    values.id = data.id;
    emit('submitModal', '编辑', values);
  };
  const changeHandel = (type) => {
    type ? (formState.switchState = '开') : (formState.switchState = '关');
  };
  const { proxy } = getCurrentInstance();
  const handleOk = () => {
    const { $refs } = proxy;
    $refs['formRef'].resetFields();
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
