<template>
  <div class="ly-container">
    <a-card class="ly-card">
      <div class="ly-card-container">
        <div class="ly-card-tool">
          <p v-for="(state, index) of gateList.statistics" :key="index">{{ state.gateState }}：{{ state.gateCount }}</p>
          <a-button type="primary" preIcon="ant-design:plus-outlined" @click="add">新增</a-button>
        </div>
        <div class="ly-card-content">
          <a-spin :spinning="spinning">
            <a-row :gutter="16" class="ly-card-list">
              <template v-for="item of gateList.records" :key="item.id">
                <a-col v-if="item.gateState == '1'" class="ly-card-item" :span="4">
                  <div class="gate" :class="gateState(item.gateState)">
                    <div class="ly-gate-info">
                      <Icon class="left" icon="ant-design:node-index-outlined" />
                      <div class="content">
                        <span>{{ item.gateState_dictText }}</span>
                        <br />
                        <span>{{ item.lockerNo }}</span>
                      </div>
                      <span class="right" v-if="item.accessDirection == '1'">可进可出</span>
                      <span class="right" v-else-if="item.accessDirection == '2'">可进不可出</span>
                      <span class="right" v-else-if="item.accessDirection == '3'">不可进可出</span>
                      <span class="right" v-else>不可出不可进</span>
                    </div>
                    <div class="ly-gate-edit">
                      <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="edit(item)" />
                      <a-button style="margin-left: 10px" type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="deleteGate(item.id)" />
                    </div>
                  </div>
                </a-col>
              </template>
            </a-row>
            <a-row :gutter="16" class="ly-card-list">
              <template v-for="item of gateList.records" :key="item.id">
                <a-col v-if="item.gateState == '2'" class="ly-card-item" :span="4">
                  <div class="gate" :class="gateState(item.gateState)">
                    <div class="ly-gate-info">
                      <Icon class="left" icon="ant-design:node-index-outlined" />
                      <div class="content">
                        <span>{{ item.gateState_dictText }}</span>
                        <br />
                        <span>{{ item.lockerNo }}</span>
                      </div>
                    </div>
                    <div class="ly-gate-edit">
                      <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="edit(item)" />
                      <a-button style="margin-left: 10px" type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="deleteGate(item.id)" />
                    </div>
                  </div>
                </a-col>
              </template>
            </a-row>
            <a-row :gutter="16" class="ly-card-list">
              <template v-for="item of gateList.records" :key="item.id">
                <a-col v-if="item.gateState == '3'" class="ly-card-item" :span="4">
                  <div class="gate" :class="gateState(item.gateState)">
                    <div class="ly-gate-info">
                      <Icon class="left" icon="ant-design:node-index-outlined" />
                      <div class="content">
                        <span>{{ item.gateState_dictText }}</span>
                        <br />
                        <span>{{ item.lockerNo }}</span>
                      </div>
                    </div>
                    <div class="ly-gate-edit">
                      <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="edit(item)" />
                      <a-button style="margin-left: 10px" type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="deleteGate(item.id)" />
                    </div>
                  </div>
                </a-col>
              </template>
            </a-row>
          </a-spin>
        </div>
        <div class="ly-card-pagination">
          <a-pagination
            size="small"
            :total="gateList.total"
            :page-size="gateList.size"
            :current="gateList.current"
            show-size-changer
            show-quick-jumper
            :show-total="(total) => `总共 ${total} 个`"
            @change="handlePageChange"
          />
        </div>
      </div>
    </a-card>
    <SysGateEdit @submitModal="submitModal" @closeSuccessModal="closeSuccessModal" :gateEditVisible="modalList.gateEditVisible" :gateForm="modalList.gateForm" />
    <SysGateAdd @submitModal="submitModal" @closeSuccessModal="closeSuccessModal" :gateAddVisible="modalList.gateAddVisible" />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { list, editList, deleteList, addList, listStatistics } from './SysGate.api';
  import SysGateEdit from './components/SysGateEdit.vue';
  import SysGateAdd from './components/SysGateAdd.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm } = useMessage();
  const spinning = ref<boolean>(false);

  const APagination = Pagination;
  let pageNo = ref(1);

  let gateList = reactive<any>({
    pages: 0,
    current: 0,
    size: 0,
    total: 0,
    records: [],
    statistics: [],
  });
  let modalList = reactive<any>({
    gateEditVisible: false,
    gateAddVisible: false,
    gateForm: {},
  });
  //获取分页数据
  const getList = async (pageNo = 1, pageSize = 30) => {
    spinning.value = true;
    let listData = await list({ pageNo, pageSize });
    let statistics = await listStatistics();
    gateList.records = listData.records;
    gateList.pages = listData.pages;
    gateList.current = listData.current;
    gateList.size = listData.size;
    gateList.total = listData.total;
    gateList.statistics = statistics;
    nextTick(() => {
      spinning.value = false;
    });
  };
  //提交编辑
  const editGate = async (params) => {
    await editList(params, getList(pageNo.value));
  };
  //删除
  const deleteGate = (id) => {
    createConfirm({
      iconType: 'warning',
      title: '确认删除',
      content: '是否删除选中闸机',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return deleteData(id);
      },
    });
  };
  const deleteData = async (id) => {
    await deleteList({ id }, getList(pageNo.value));
  };
  //新增
  const addGate = async (params) => {
    await addList(params, getList(pageNo.value));
  };

  onMounted(() => {
    getList();
  });
  const gateState = (state) => {
    let status = '';
    switch (state) {
      case '1':
        status = 'c-green';
        break;
      case '2':
        status = 'c-grey';
        break;
      case '3':
        status = 'c-orange';
        break;
    }
    return status;
  };
  const handlePageChange = (value) => {
    getList(value);
  };

  const edit = (item) => {
    modalList.gateEditVisible = true;
    modalList.gateForm = item;
    console.log(item);
  };
  const add = () => {
    modalList.gateAddVisible = true;
  };
  // 关闭弹窗
  const closeSuccessModal = (isShow: boolean) => {
    modalList.gateEditVisible = isShow;
    modalList.gateAddVisible = isShow;
    modalList.gateForm = {};
  };

  const submitModal = (type, data) => {
    if (type == '编辑') {
      editGate(data);
    } else {
      addGate(data);
    }
    getList();
  };
</script>

<style lang="less" scoped>
  // 空闲柜颜色
  @bGreen: #16dba8;
  @fGreen: #000;
  // 维护中颜色
  @bGrey: #5e5e5e;
  @fGrey: #fff;
  // 逾期颜色
  @bOrange: #df981b;
  @fOrange: #fff;
  // 租借中颜色
  @bBlue: #1d95d1;
  @fBlue: #fff;
  // 待开放颜色
  @bBlank: #0f0f0f;
  @fBlank: #fff;
  .c-green {
    background-color: @bGreen !important;
    color: @fGreen !important;
  }
  .c-grey {
    background-color: @bGrey !important;
    color: @fGrey !important;
  }
  .c-orange {
    background-color: @bOrange !important;
    color: @fOrange !important;
  }
  .c-blue {
    background-color: @bBlue !important;
    color: @fBlue !important;
  }
  .c-blank {
    background-color: @bBlank !important;
    color: @fBlank !important;
  }
  .ly-card-tool {
    display: flex;
    justify-items: flex-start;
    position: relative;
    button {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
    }
    p {
      font-size: 16px;
      color: #000;
      font-weight: 700;
      margin-right: 40px;
    }
  }

  .ly-card-list {
    .ly-card-item {
      margin-top: 16px;
      .gate {
        height: 100px;
        text-align: center;
        font-weight: 700;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .ly-gate-info {
          margin: 0;
          font-weight: 700;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
          width: 80%;
          .left {
            width: 15%;
            text-align: center;
            justify-content: right;
            font-size: 30px !important;
          }
          .content {
            width: 40%;
          }
          .right {
            width: 45%;
          }
        }

        .ly-gate-edit {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: all 0.3s;
          button {
            transform: translateY(-20px);
            transition: all 0.3s;
          }
        }
        &:hover .ly-gate-edit {
          opacity: 1;
          button {
            transform: translateY(0);
          }
        }
      }
    }
  }

  .ly-card-pagination {
    margin-top: 16px;
    text-align: right;
  }
</style>
