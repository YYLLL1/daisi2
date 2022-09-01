<template>
  <a-modal class="ly-modal" :visible="paymentVisible" title="结算" :footer="false" :width="1000" @cancel="close">
    <div class="ly-sell-payment">
      <div class="ly-sell-payment-info ly-card-container">
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
                <p>{{ item.quantity }}</p>
              </li>
              <li class="price">￥ {{ item.price.toFixed(2) }}</li>
              <li class="total">￥ {{ (item.quantity * item.price).toFixed(2) }}</li>
            </ul>
          </div>
        </div>
        <h3 class="ly-card-footer">
          <span>总计：</span><span>{{ total }} 元</span>
        </h3>
      </div>
      <div class="ly-sell-payment-confirm">
        <a-form :model="formState" name="basic" layout="vertical" autocomplete="off" @finish="onFinish">
          <a-form-item name="remember" label="收款方式">
            <a-radio-group v-model:value="formState.remember" size="large" button-style="solid">
              <a-radio-button value="a">微信/支付宝/云闪付</a-radio-button>
              <a-radio-button value="b">POS</a-radio-button>
              <a-radio-button value="c">现金</a-radio-button>
              <a-radio-button value="d">其他</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="扫码" name="code" :rules="[{ required: true, message: '请扫描用户付款码!' }]">
            <a-input v-model:value="formState.code" placeholder="请扫描用户付款码" />
          </a-form-item>
          <a-form-item label="备注" name="introduction">
            <a-textarea v-model:value="formState.introduction" placeholder="请输入备注" />
          </a-form-item>
          <a-button class="ly-confirm-button" type="primary" html-type="submit">确认收款</a-button>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
  interface FormState {
    code: string;
    introduction: string;
    remember: string;
  }
</script>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { computed, reactive, watch } from 'vue';
  const emit = defineEmits(['closePaymentModal', 'close']);
  const props = defineProps({
    paymentVisible: { type: Boolean, default: false },
    selectData: { type: Array, default: () => [] },
  });
  const data = reactive<any>({
    paymentVisible: true,
    selectData: [],
  });
  const formState = reactive<FormState>({
    code: '',
    introduction: '',
    remember: 'a',
  });

  watch(
    () => props.selectData,
    () => {
      data.selectData = props.selectData;
    },
    { deep: true }
  );

  const total = computed((): number => {
    let tal: any = 0;
    data.selectData.forEach((item) => {
      tal += item.quantity * item.price;
    });
    return tal.toFixed(2);
  });

  const onFinish = () => {
    if (data.selectData?.length == 0) {
      message.warning('未添加票种！');
      return;
    }
    emit('closePaymentModal');
  };

  const close = () => {
    data.selectData = [];
    emit('close', 'payment');
  };
</script>
<style lang="less" scoped>
  @themFc: #1892d0;
  .ly-modal {
    ::v-deep(.ant-modal-header) {
      background-color: @themFc;
      color: #fff;
      text-align: center;
    }
    .ant-modal-close {
      right: 20px;
    }
  }
  .ly-sell-payment {
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    justify-content: space-between;
  }
  .ly-sell-payment-info {
    width: 50%;
    border-right: 1px solid #f0f0f0;
    padding: 20px;
    .ly-card-header {
      .ly-card-content {
        height: 420px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
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
      font-size: 24px;
      font-weight: 700;
      color: @themFc;
      display: flex;
      justify-content: space-between;
    }
  }
  .ly-sell-payment-confirm {
    width: 50%;
    padding: 20px;
    position: relative;
    ::v-deep(.ant-form-item-label label) {
      font-weight: 700;
    }
    .ant-radio-group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      label {
        font-size: 14px;
        border-radius: 4px;
      }
    }
    .ly-confirm-button {
      position: absolute;
      width: calc(100% - 40px);
      height: 50px;
      left: 20px;
      bottom: 20px;
      z-index: 10;
    }
  }
</style>
