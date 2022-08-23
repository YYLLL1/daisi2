<template>
  <a-modal v-model:visible="data.visible" :title="data.title" :footer="null" @ok="handleOk" :cancel="handleOk">
    <a-form class="ly-from" :model="data.formState" ref="formRef" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off" @finish="onFinish">
      <a-form-item label="柜锁编号：" name="cabinetLockNo" :rules="[{ required: true, message: '请输入柜锁编号！' }]">
        <a-input v-model:value="data.formState.cabinetLockNo" />
      </a-form-item>

      <a-form-item label="更衣柜编号：" name="lockerNo" :rules="[{ required: true, message: '请输入更衣柜编号！' }]">
        <a-input v-model:value="data.formState.lockerNo" />
      </a-form-item>

      <a-form-item label="存放位置：" name="position">
        <a-select ref="select" v-model:value="data.formState.position" style="width: 120px">
          <a-select-option value="1">男更衣柜</a-select-option>
          <a-select-option value="2">女更衣柜</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态设置：" name="cabinetState">
        <a-select v-model:value="data.formState.cabinetState" style="width: 120px">
          <a-select-option value="1">空闲</a-select-option>
          <a-select-option value="2">维护中</a-select-option>
          <a-select-option value="3">逾期</a-select-option>
          <a-select-option value="4">租借中</a-select-option>
          <a-select-option value="5">待开放</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="开合状态：" name="switchState">
        <span v-if="data.formState.switchState == '开'" style="color: green">已打开</span>
        <span v-else style="color: red">已关闭</span>
      </a-form-item>
      <a-form-item label="开合控制：" name="switchControl">
        <a-switch v-model:checked="data.formState.switchControl" checked-children="开" un-checked-children="关" />
      </a-form-item>

      <div class="ly-button">
        <a-button @click="handleOk">返回</a-button>
        <a-button class="button" type="primary" html-type="submit">保存</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { getCurrentInstance, reactive, watch } from 'vue';
  const emit = defineEmits(['closeSuccessModal', 'submitModal']);
  const props = defineProps({
    cabinetForm: { type: Object },
    cabinetTitle: { type: String },
    cabinetVisible: { type: Boolean },
  });
  let data = reactive<any>({
    id: '',
    title: '',
    visible: false,
    formState: {},
  });
  // let formState = reactive<any>()
  watch(
    () => props.cabinetForm,
    () => {
      data.title = props.cabinetTitle || '';
      data.visible = props.cabinetVisible || false;
      data.formState = props.cabinetForm || {};
      data.id = props.cabinetForm?.id || '';
      console.log(data.formState);
    }
  );

  const onFinish = (values: any) => {
    let params = values;
    params.id = data.id;
    console.log(params);
    emit('submitModal', params);
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
