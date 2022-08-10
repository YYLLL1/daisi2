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
          <ul v-for="item of props.selectData" :key="item.id">
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
          <ul class="ly-info-content">
            <li class="name">
              <span>购票人姓名:</span>
              <a-input v-model:value="sellName" placeholder="请输入姓名" />
            </li>
            <li class="phone">
              <span>手机号:</span>
              <a-input v-model:value="sellPhone" placeholder="请输入手机号" />
            </li>
          </ul>
          <div class="ly-info-total">
            <h3>
              总计：<span>{{ total }}</span> 元
            </h3>
          </div>
        </div>
        <a-button class="sell-submit" type="primary" @click="sellSubmit" block>结账</a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  const props = defineProps({
    selectData: { type: Array },
  });
  const emit = defineEmits(['reduce', 'add', 'remove', 'submit']);
  const total = computed((): number => {
    let tal: any = 0;
    props.selectData?.forEach((item) => {
      tal += item.quantity * item.price;
    });
    return tal.toFixed(2);
  });
  const sellName = ref<string>();
  const sellPhone = ref<number>();

  const sellSubmit = () => {
    emit('submit', { name: sellName.value, phone: sellPhone.value });
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
      .ly-info-content,
      .ly-info-total {
        width: 100%;
        margin-bottom: 0;
      }
      .ly-info-content {
        li {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
          span {
            width: 70px;
            font-weight: 700;
            margin-right: 10px;
            font-size: 12px;
            text-align: justify;
            text-align-last: justify;
            display: inline-block;
          }
          input {
            width: calc(100% - 120px);
            padding: 2px 5px;
          }
        }
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
      height: 80px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }
</style>
