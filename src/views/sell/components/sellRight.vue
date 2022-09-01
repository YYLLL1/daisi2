<template>
  <a-card class="ly-card" title="售票" size="small">
    <div class="ly-card-container">
      <div class="ly-card-header">
        <ul class="ly-card-title">
          <li class="name">项目名称</li>
          <li class="quantity">数量</li>
          <li class="price">单价</li>
          <li class="total">小计</li>
        </ul>
        <div class="ly-card-content">
          <ul v-for="item of data.selectData" :key="item.id">
            <li class="name">{{ item.ticketType_dictText }}</li>
            <li class="quantity">
              <a-button type="primary" size="small" shape="circle" :disabled="item.quantity == 1" @click="reduceQuantity(item.id)"><Icon icon="ant-design:minus-outlined" /></a-button>
              <p>{{ item.quantity }}</p>
              <a-button type="primary" size="small" shape="circle" @click="addQuantity(item.id)"><Icon icon="ant-design:plus-outlined" /></a-button>
            </li>
            <li class="price">￥ {{ item.price.toFixed(2) }}</li>
            <li class="total">￥ {{ (item.quantity * item.price).toFixed(2) }}</li>
            <li class="ticket-delete" @click="removeTicket(item.id)"><Icon icon="ant-design:delete-outlined" /></li>
          </ul>
        </div>
      </div>
      <div class="ly-card-footer">
        <div class="ly-footer-info">
          <a-form class="ly-info-content" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="formState" :rules="formRules" name="basic" autocomplete="off" @finish="onFinish">
            <a-form-item label="购票姓名:" name="name" :wrapper-col="{ offset: 1, span: 23 }">
              <a-input v-model:value="formState.name" placeholder="请输入姓名" />
            </a-form-item>

            <a-form-item label="手机号:" name="phone" :rules="formRules.phone" :wrapper-col="{ offset: 1, span: 23 }">
              <a-input v-model:value="formState.phone" placeholder="请输入手机号" />
            </a-form-item>

            <a-form-item class="sell-submit">
              <a-button type="primary" html-type="submit" block>结账</a-button>
            </a-form-item>
          </a-form>
          <h3 class="ly-info-total">
            总计：<span>{{ total }}</span> 元
          </h3>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue';
  interface FormState {
    name: string;
    phone: string;
  }
  const props = defineProps({
    selectData: { type: Array, default: () => [] },
  });
  const data = reactive<any>({
    selectData: [],
  });
  const emit = defineEmits(['reduce', 'add', 'remove', 'openPaymentModal']);

  const formState = reactive<FormState>({
    name: '',
    phone: '',
  });
  const formRules = reactive({
    phone: {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      required: true,
      message: '请输入正确手机号！',
    },
  });

  watch(
    () => props.selectData,
    () => {
      data.selectData = props.selectData;
    },
    { deep: true }
  );
  const onFinish = (values: any) => {
    sellSubmit(values);
  };

  const total = computed((): number => {
    let tal: any = 0;
    data.selectData.forEach((item) => {
      tal += item.quantity * item.price;
    });
    return tal.toFixed(2);
  });

  const sellSubmit = (list) => {
    if (data.selectData.length == 0) {
      message.warning('未添加票种！');
      return;
    }
    emit('openPaymentModal', list);
  };
  const reduceQuantity = (id) => {
    emit('reduce', id);
  };
  const addQuantity = (id) => {
    emit('add', id);
  };
  const removeTicket = (id) => {
    emit('remove', id);
  };
</script>

<style lang="less" scoped>
  @themFc: #1892d0;
  ::v-deep(.ant-card-head) {
    color: #fff;
    background-color: @themFc;
  }
  ::v-deep(.ant-card-body) {
    padding: 0;
  }
  .ly-card {
    height: 100%;
  }
  .ly-card-header {
    border-bottom: 1px solid #aaa;

    .ly-card-content {
      height: 220px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .ticket-delete {
        position: absolute;
        z-index: 10;
        right: 0;
        top: 14px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        padding: 0;
        color: @themFc;
        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #f7f8fc;
      margin-bottom: 0;
      li {
        width: 100%;
        padding: 10px;
        text-align: center;
        &.name {
          padding-left: 0;
        }
        &.quantity {
          min-width: 160px;
          button {
            line-height: 24px;
          }
          p {
            padding: 0 5px;
            border: 1px solid #ddd;
            border-radius: 10px;
            min-width: 50px;
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
    .ly-card-title {
      border-bottom: 1px solid #ddd;
    }
  }
  .ly-card-footer {
    padding: 20px;
    .ly-footer-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding-bottom: 80px;
      .ly-info-content,
      .ly-info-total {
        width: 100%;
        margin-bottom: 0;
      }
      .ly-info-total {
        text-align: center;
        h3 {
          font-size: 16px;
          font-weight: 700;
        }
        span {
          font-size: 40px;
          font-weight: 700;
          color: @themFc;
        }
      }
    }
    .sell-submit {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 10;
      bottom: 0;
      margin: 0;
      ::v-deep(.ant-col) {
        max-width: 100%;
      }
      button {
        height: 80px;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
</style>
