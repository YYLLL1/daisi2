<template>
  <a-card class="ly-card">
    <div class="ly-card-container">
      <a-form class="ly-info-content" :model="selectObj" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish">
        <a-form-item class="ly-form-item" label="会员卡种">
          <b> {{ selectObj.cardType_dictText || '无' }} </b>
        </a-form-item>
        <!-- 储蓄卡 -->
        <template v-if="selectObj.cardType == 1">
          <a-form-item class="ly-form-item" name="recharge" label="充值金额">
            <a-input :value="selectObj.recharge" disabled style="width: 183px; display: inline-block" />
            <span style="line-height: 32px; display: inline-block; width: 32px; text-align: center">元</span>
            <span>（赠：{{ selectObj.giftAmount || 0 }} 元）</span>
          </a-form-item>
        </template>
        <!-- 次卡 -->
        <template v-if="selectObj.cardType == 2">
          <a-form-item class="ly-form-item" name="numberOf" label="充值次数">
            <a-input :value="numberSum" disabled style="width: 183px; display: inline-block" />
            <span style="line-height: 32px; display: inline-block; width: 32px; text-align: center">次</span>
            <span>（赠：{{ selectObj.numberOfGifts || 0 }} 次）</span>
          </a-form-item>
          <a-form-item class="ly-form-item" name="endDate" label="有效期至" :rules="[{ type: 'string' as const, required: true, message: '请选择有效期!' }]">
            <a-date-picker v-model:value="selectObj.endDate" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
          </a-form-item>
        </template>
        <!-- 时段卡 -->
        <template v-if="selectObj.cardType == 3">
          <a-form-item class="ly-form-item" name="startDate" label="启用日期" :rules="[{ type: 'string' as const, required: true, message: '请选择启用日期!' }]">
            <a-date-picker v-model:value="selectObj.startDate" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
          </a-form-item>
          <a-form-item class="ly-form-item" label="有效期">
            <b> {{ selectObj.termOfValidity }} </b>
          </a-form-item>
        </template>
        <a-form-item class="ly-form-item" label="售价">
          <b style="color: #1892d0">{{ selectObj.price.toFixed(2) }}</b> 元
        </a-form-item>
        <a-button class="ly-form-button" type="primary" html-type="submit" size="large">确定</a-button>
      </a-form>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { Dayjs } from 'dayjs';
  import moment from 'moment';
  import { computed, reactive, watch } from 'vue';
  const props = defineProps({
    ticketSelectObj: { type: Object, default: () => {} },
  });
  const emit = defineEmits(['payInfo']);

  let selectObj = reactive<any>({
    cardType: 1,
    price: 0,
    recharge: 0,
    numberOf: 0,
    numberOfGifts: 0,
  });
  // 限定只能选今天往后的日期
  const disabledDate = (current: Dayjs) => {
    return current && current < moment().subtract(1, 'days').endOf('day');
  };
  const numberSum = computed(() => {
    return selectObj.numberOf + selectObj.numberOfGifts || 0;
  });
  watch(
    () => props.ticketSelectObj,
    () => {
      Object.assign(selectObj, props.ticketSelectObj);
      selectObj.recharge = selectObj.price + selectObj.giftAmount;
    },
    { deep: true }
  );
  const onFinish = (values: any) => {
    values.numberOf = numberSum.value;
    emit('payInfo', selectObj.cardType, values);
  };
  // 清空支付信息
  const refreshPay = () => {
    selectObj = {
      cardType: 1,
      price: 0,
      recharge: 0,
      numberOf: 0,
      numberOfGifts: 0,
    };
  };
  defineExpose({
    refreshPay,
  });
</script>

<style lang="less" scoped>
  .ly-info-content {
    min-width: 500px;
    width: 40%;
    position: relative;
    .ly-form-item {
      margin-bottom: 12px;
      span {
        color: #999;
      }
    }
    .ly-form-button {
      position: absolute;
      left: 100%;
      bottom: 0;
      width: 120px;
    }
  }
</style>
