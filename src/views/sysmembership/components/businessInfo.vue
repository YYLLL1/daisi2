<template>
  <a-card class="ly-card">
    <div class="ly-card-header">
      <h4>客户信息：</h4>
      <a-form class="ly-info-content" :model="formState" :rules="formRules" name="basic" autocomplete="off" @finish="onFinish">
        <a-form-item name="phone" :rules="formRules.phone" style="margin-bottom: 0">
          <a-input-group compact class="input-button">
            <a-input v-model:value="formState.phone" placeholder="请输入手机号" style="margin-right: 20%" />
            <a-button type="primary" html-type="submit" :loading="spinning" size="large">确定</a-button>
          </a-input-group>
        </a-form-item>
      </a-form>
    </div>
    <a-spin :spinning="spinning">
      <div class="ly-card-container">
        <p>
          会员姓名：<b>{{ businessInfo.name }}</b>
          <span>
            会员手机号：<b>{{ businessInfo.phone }}</b>
          </span>
        </p>
        <p>
          会员编号：<b>{{ businessInfo.customerCode }}</b>
          <span>
            会员折扣：<b>{{ businessInfo.discount }}</b>
          </span>
        </p>
        <p>
          掌静脉ID：<b>{{ businessInfo.sysPalmarveinId }}</b>
        </p>
        <p>
          身份证号：<b>{{ businessInfo.idNumber }}</b>
        </p>
        <p>
          充值总额：<b>{{ businessInfo.recharge }}</b>
        </p>
        <p>
          实体卡号：<b>{{ businessInfo.sysPcVipCardId }}</b>
        </p>
        <p>
          卡包：
          <a-select v-model:value="typeCard" style="width: 120px">
            <a-select-option value="0">有效卡</a-select-option>
            <a-select-option value="1">无效卡</a-select-option>
          </a-select>
          <a-select v-model:value="selectCard" style="width: 120px; margin-left: 10px" @change="handleChange">
            <a-select-option value="0">未选择</a-select-option>
            <a-select-option v-for="item of data.selectCardList" :value="item.cardId" :key="item.id">{{ item.cardName }}</a-select-option>
          </a-select>
        </p>
        <p>
          卡属性：
          <b v-if="data.selectCard.cardAttribute == '1'">成人</b>
          <b v-else-if="data.selectCard.cardAttribute == '2'">儿童</b>
          <b v-else-if="data.selectCard.cardAttribute == '3'">无限制</b>
          <b v-else>无</b>
        </p>
        <template v-if="data.selectCard.cardAttribute">
          <p>
            办卡日期：<b>{{ data.selectCard.cardHandlingDate }}</b>
          </p>
          <p style="margin-bottom: 0">
            有效期至：<b>{{ data.selectCard.endDate }}</b>
          </p>
        </template>
      </div>
    </a-spin>
    <div class="ly-card-toolbar">
      <div class="toolbar-box">
        <a-button size="large" type="primary" disabled>签到</a-button>
        <a-button size="large" type="primary" disabled>消费记录</a-button>
        <a-button size="large" type="primary" disabled>增绑会员卡</a-button>
        <a-button size="large" type="primary" @click="toLink">新增会员</a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { info } from '../business.api';
  import { router } from '/@/router';
  const emit = defineEmits(['customerId']);
  const spinning = ref(false);
  const selectCard = ref('0');
  const typeCard = ref('0');
  const formState = reactive({
    phone: '15309679875',
  });
  const formRules = reactive({
    phone: {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      required: true,
      message: '请输入正确手机号！',
    },
  });
  let data = reactive<any>({
    selectCardList: [],
    selectCard: {},
  });

  const businessInfo = reactive({
    name: '无',
    phone: '无',
    customerCode: '无',
    discount: '无',
    sysPalmarveinId: '无',
    idNumber: '无',
    recharge: '无',
    sysPcVipCardId: '无',
    sysInValidCards: [],
    sysValidCards: [],
  });
  // 跳转会员页面
  const toLink = () => {
    router.push('/syscustomer/sysCustomerList');
  };

  const getInfo = async (value) => {
    spinning.value = true;
    let result = await info(value);
    //获取客户ID
    emit('customerId', result.id);
    Object.assign(businessInfo, result);
    //初始化有效卡
    data.selectCardList = businessInfo.sysValidCards;
    spinning.value = false;
  };
  const handleChange = (cardId) => {
    if (cardId != '0') {
      data.selectCard = data.selectCardList.filter((item) => item.cardId == cardId)[0];
    } else {
      data.selectCard = {};
    }
  };

  watch(
    () => typeCard.value,
    () => {
      // 初始化数据
      data.selectCardList = [];
      data.selectCard = {};
      selectCard.value = '0';
      switch (typeCard.value) {
        case '0':
          data.selectCardList = businessInfo.sysValidCards;

          break;
        case '1':
          data.selectCardList = businessInfo.sysInValidCards;
          break;
      }
    }
  );
  const onFinish = (values: any) => {
    getInfo(values);
  };
  // 清空会员信息
  const refreshInfo = () => {
    businessInfo.name = '无';
    businessInfo.phone = '无';
    businessInfo.customerCode = '无';
    businessInfo.discount = '无';
    businessInfo.sysPalmarveinId = '无';
    businessInfo.idNumber = '无';
    businessInfo.recharge = '无';
    businessInfo.sysPcVipCardId = '无';
    data.selectCardList = [];
    data.selectCard = {};
    selectCard.value = '0';
  };
  defineExpose({
    refreshInfo,
  });
</script>

<style lang="less" scoped>
  .ly-card {
    height: 100%;
    max-height: 650px;
    min-height: 550px;
    overflow-y: auto;
  }
  .ly-card-container {
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    min-height: 200px;
    p {
      margin-bottom: 6px;
      span {
        margin-left: 30px;
      }
    }
  }
  .toolbar-box {
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      width: calc(50% - 24px);
      margin-bottom: 20px;
    }
  }
  .input-button {
    display: flex;
    justify-content: space-between;
  }
</style>
