<template>
  <div class="ly-container">
    <a-card class="ly-card">
      <div class="jeecg-basic-table-form-container">
        <h2>模拟出/入闸</h2>
        <a-form :model="mockList" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :lg="6">
              <a-form-item label="票ID">
                <a-input placeholder="请输入票ID" v-model:value="mockList.id" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="闸机号">
                <a-input placeholder="请输入闸机号" v-model:value="mockList.lockerNo" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-button type="primary" @click="mockGateEntry">入闸</a-button>
              <a-button type="primary" @click="mockExitGate" style="margin-left: 8px">出闸</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
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
        <template #orderStatus="{ record }">
          <span v-if="record.orderStatus == '1'">已完成</span>
          <span v-if="record.orderStatus == '2'">已付款</span>
          <span v-if="record.orderStatus == '3'">使用中</span>
          <span v-if="record.orderStatus == '4'">退款成功</span>
          <span v-if="record.orderStatus == '5'">待付款</span>
          <span v-if="record.orderStatus == '6'">待评价</span>
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
          @showSizeChange="onShowSizeChange"
        />
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { columns, childrenColumn } from './SysOrderMain.data';
  import { list, entranceGate, exitGate } from './SysOrderMain.api';
  import { Pagination } from 'ant-design-vue';

  const APagination = Pagination;
  let data = reactive<any>({
    isLoading: true,
    parentPagination: {
      size: 10,
      total: 1,
      pages: 1,
      current: 1,
    },
    parentData: [],
  });
  const labelCol = reactive({
    xs: { span: 24 },
    sm: { span: 7 },
  });
  const wrapperCol = reactive({
    xs: { span: 24 },
    sm: { span: 16 },
  });
  // 模拟出入闸数据
  const mockList = reactive({
    id: '',
    lockerNo: '',
  });
  // 模拟入闸
  const mockGateEntry = async () => {
    let result = await entranceGate(mockList);
    if (result == '入闸成功') getList(data.parentPagination.current, data.parentPagination.size);
  };
  // 模拟出闸;
  const mockExitGate = async () => {
    let result = await exitGate(mockList);
    if (result == '出闸成功') getList(data.parentPagination.current, data.parentPagination.size);
  };
  // 初始化列表数据
  onMounted(() => {
    getList();
  });
  // 获取列表数据
  const getList = async (pageNo = 1, pageSize = 10) => {
    data.isLoading = true;
    let { size, total, pages, current, records } = await list({ pageNo, pageSize });
    data.parentPagination = { size, total, pages, current };
    data.parentData = records[0];
    data.isLoading = false;
  };
  //切换当前页
  const onChange = (isCur: number) => {
    data.parentPagination.current = isCur;
    getList(isCur, data.parentPagination.size);
  };
  //切换每页显示数据量
  const onShowSizeChange = (current: number, pageSize: number) => {
    data.parentPagination.current = current;
    data.parentPagination.size = pageSize;
    getList(current, pageSize);
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
  .jeecg-basic-table-form-container {
    background-color: #fff;
    padding: 0;
    .query-group-cust {
      width: calc(50% - 15px);
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }
  }
</style>
