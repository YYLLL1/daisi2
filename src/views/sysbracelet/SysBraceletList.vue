<template>
  <div class="ly-container">
    <a-card class="ly-card">
      <div class="ly-card-container">
        <div class="ly-card-tool">
          <p v-for="(state, index) of braceletList.statistics" :key="index">{{ state.braceletState }}：{{ state.braceletCount }}</p>
          <a-button type="primary" preIcon="ant-design:plus-outlined" @click="add">新增</a-button>
        </div>
        <div class="ly-card-content">
          <a-spin :spinning="spinning">
            <a-row :gutter="16" class="ly-card-list">
              <a-col v-for="item of braceletList.records" :key="item.id" class="ly-card-item" :span="3">
                <div class="bracelet" :class="braceletState(item.braceletState)">
                  <div class="ly-bracelet-info">
                    <Icon class="left" icon="ant-design:shake-outlined" />
                    <div class="content">
                      <span>{{ item.braceletState_dictText }}</span>
                      <br />
                      <span>{{ item.braceletNo }}</span>
                    </div>
                  </div>
                  <div class="ly-bracelet-edit">
                    <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="edit(item)" />
                    <a-button style="margin-left: 10px" type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="deleteBracelet(item.id)" />
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-spin>
        </div>
        <div class="ly-card-pagination">
          <a-pagination
            size="small"
            :total="braceletList.total"
            :page-size="braceletList.size"
            :current="braceletList.current"
            show-size-changer
            show-quick-jumper
            :show-total="(total) => `总共 ${total} 个`"
            @change="handlePageChange"
          />
        </div>
      </div>
    </a-card>
    <SysBraceletEdit @submitModal="submitModal" @closeSuccessModal="closeSuccessModal" :braceletEditVisible="modalList.braceletEditVisible" :braceletForm="modalList.braceletForm" />
    <SysBraceletAdd @submitModal="submitModal" @closeSuccessModal="closeSuccessModal" :braceletAddVisible="modalList.braceletAddVisible" />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { list, editList, deleteList, addList, listStatistics } from './SysBracelet.api';
  import SysBraceletEdit from './components/SysBraceletEdit.vue';
  import SysBraceletAdd from './components/SysBraceletAdd.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm } = useMessage();
  const spinning = ref<boolean>(false);

  const APagination = Pagination;
  let pageNo = ref(1);

  let braceletList = reactive<any>({
    pages: 0,
    current: 0,
    size: 0,
    total: 0,
    records: [],
    statistics: [],
  });
  let modalList = reactive<any>({
    braceletEditVisible: false,
    braceletAddVisible: false,
    braceletForm: {},
  });
  //获取分页数据
  const getList = async (pageNo = 1, pageSize = 40) => {
    spinning.value = true;
    let listData = await list({ pageNo, pageSize });
    braceletList.records = listData.records;
    braceletList.pages = listData.pages;
    braceletList.current = listData.current;
    braceletList.size = listData.size;
    braceletList.total = listData.total;
    nextTick(() => {
      spinning.value = false;
    });
  };
  const getStatistics = async () => {
    let result = await listStatistics();
    braceletList.statistics = result;
  };
  //提交编辑
  const editBracelet = async (params) => {
    await editList(params, getList(pageNo.value));
  };
  //删除
  const deleteBracelet = (id) => {
    createConfirm({
      iconType: 'warning',
      title: '确认删除',
      content: '是否删除选中柜子',
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
  const addBracelet = async (params) => {
    await addList(params, getList(pageNo.value));
  };

  onMounted(() => {
    getStatistics();
    getList();
  });
  const braceletState = (state) => {
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
      case '4':
        status = 'c-blue';
        break;

      default:
        status = 'c-blank';
        break;
    }
    return status;
  };
  const handlePageChange = (value) => {
    getList(value);
  };

  const edit = (item) => {
    modalList.braceletEditVisible = true;
    modalList.braceletForm = item;
  };
  const add = () => {
    modalList.braceletAddVisible = true;
  };
  // 关闭弹窗
  const closeSuccessModal = (isShow: boolean) => {
    modalList.braceletEditVisible = isShow;
    modalList.braceletAddVisible = isShow;
    modalList.braceletForm = {};
  };

  const submitModal = (type, data) => {
    if (type == '编辑') {
      editBracelet(data);
    } else {
      addBracelet(data);
    }
    closeSuccessModal(false);
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
      .bracelet {
        text-align: center;
        font-weight: 700;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        position: relative;
        .ly-bracelet-info {
          margin: 0;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          width: 60%;
          .left {
            font-size: 30px !important;
          }
        }

        .ly-bracelet-edit {
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
        &:hover .ly-bracelet-edit {
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
