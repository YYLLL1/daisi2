<template>
  <div class="ly-container">
    <a-card class="ly-card">
      <a-table
        :loading="data.isLoading"
        bordered
        :columns="columns"
        :data-source="data.parentData"
        class="components-table-demo-nested"
        :rowKey="
          (_record, index) => {
            return index;
          }
        "
        :pagination="false"
      >
        <template #paymentMethod="{ record }">
          <span v-if="record.paymentMethod == '1'">微信</span>
          <span v-if="record.paymentMethod == '2'">支付宝</span>
        </template>
        <template #orderForm="{ record }">
          <span v-if="record.orderForm == '1'">线上</span>
          <span v-if="record.orderForm == '2'">门店</span>
          <span v-if="record.orderForm == '3'">地推</span>
        </template>
        <template #category="{ record }">
          <span v-if="record.category == '1'">售票</span>
          <span v-if="record.category == '2'">租柜</span>
        </template>
        <template #expandedRowRender="{ record }">
          <a-table
            bordered
            :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
            :columns="childrenColumn"
            :data-source="record.childs"
            :pagination="false"
            :rowKey="
              (_record, index) => {
                return index;
              }
            "
          >
            <template #ticketStatus="{ record }">
              <a-tag v-if="record.ticketStatus == '1'" color="cyan">已付款</a-tag>
              <a-tag v-if="record.ticketStatus == '2'" color="blue">使用中</a-tag>
              <a-tag v-if="record.ticketStatus == '3'" color="purple">退款完成</a-tag>
              <a-tag v-if="record.ticketStatus == '4'" color="green">已完成</a-tag>
            </template>
            <template #paymentMethod="{ record }">
              <span v-if="record.paymentMethod == '1'">微信</span>
              <span v-if="record.paymentMethod == '2'">支付宝</span>
            </template>
            <template #orderForm="{ record }">
              <span v-if="record.orderForm == '1'">线上</span>
              <span v-if="record.orderForm == '2'">门店</span>
              <span v-if="record.orderForm == '3'">地推</span>
            </template>
            <template #ticketWriteOff="{ record }">
              <a-button size="small" type="primary" v-if="record.ticketWriteOff == '1'">未核销</a-button>
              <a-button size="small" v-if="record.ticketWriteOff == '2'">已核销</a-button>
            </template>
            <template #ticketAccessGate="{ record, index }">
              <template v-if="record.ticketAccessGate == '1'">
                <a-input :ref="`lockerNo${index}`" type="text" placeholder="请输入闸机号" style="width: 120px; margin-right: 10px" />
                <a-button size="small" @click="mockHandel(1, record.id, index)">未入闸</a-button>
              </template>
              <template v-if="record.ticketAccessGate == '2'">
                <a-input :ref="`lockerNo${index}`" type="text" placeholder="请输入闸机号" style="width: 120px; margin-right: 10px" />
                <a-button size="small" type="primary" @click="mockHandel(2, record.id, index)">申请出闸</a-button>
              </template>

              <a-button size="small" type="primary" v-if="record.ticketAccessGate == '3'" disabled>已出闸</a-button>
            </template>
          </a-table>
        </template>
      </a-table>
      <div class="ly-card-pagination">
        <a-pagination
          :total="data.parentPagination.total"
          :page-size="data.parentPagination.size"
          :current="data.parentPagination.current"
          show-size-changer
          show-quick-jumper
          :show-total="(total) => `总共 ${total} 个`"
          @change="onChange"
        />
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { getCurrentInstance, onMounted, reactive } from 'vue';
  import { columns, childrenColumn } from './SysOrderMain.data';
  import { list, entranceGate, exitGate } from './SysOrderMain.api';
  import { message, Pagination } from 'ant-design-vue';
  // 获取ref
  const ComponentInternalInstance = getCurrentInstance();

  const APagination = Pagination;
  let data = reactive({
    isLoading: true,
    parentPagination: {
      size: 10,
      total: 1,
      pages: 1,
      current: 1,
    },
    parentData: [],
  });
  onMounted(() => {
    getList();
  });
  const getList = async (pageNo = 1, pageSize = 10) => {
    data.isLoading = true;
    let { size, total, pages, current, records } = await list({ pageNo, pageSize });
    data.parentPagination = { size, total, pages, current };
    data.parentData = records[0];
    data.isLoading = false;
  };
  const onChange = (isCur: number) => {
    data.parentPagination.current = isCur;
    getList(isCur);
  };
  const mockHandel = async (type, id, index) => {
    const refsI = `lockerNo${index}`;
    const { $refs } = (ComponentInternalInstance as any).proxy;
    const lockerNo = $refs[refsI].stateValue;
    if (!lockerNo) {
      $refs[refsI].focus();
      message.error('未检测到闸机数据！');
      return;
    }
    switch (type) {
      case 1:
        await entranceGate({ id, lockerNo }, getList);
        break;
      case 2:
        await exitGate({ id, lockerNo }, getList);
        break;
    }
  };
</script>
<style lang="less" scoped>
  ::v-deep(.table-striped) {
    background-color: #f5f5f5;
  }

  .ly-card-pagination {
    margin-top: 16px;
    text-align: right;
  }
</style>
