<template>
  <div class="ly-container">
    <a-card class="ly-card" :tab-list="position" :active-tab-key="key" @tabChange="(item) => onTabChange(item)">
      <div class="ly-card-container">
        <div class="ly-card-tool">
          <p v-for="(state, index) of cabinetList.statistics" :key="index">{{ state.cabinetState }}：{{ state.cabinetCount }}</p>
          <a-button type="primary" @click="add">新增更衣柜</a-button>
        </div>
        <div class="ly-card-content">
          <a-spin :spinning="spinning">
            <a-row :gutter="16" class="ly-card-list">
              <a-col v-for="item of cabinetList.records" :key="item.id" class="ly-card-item" :span="3">
                <div class="cabinet" :class="cabinetState(item.cabinetState)">
                  <div class="ly-cabinet-info">
                    <span>{{ item.cabinetState_dictText }}</span>
                    <br />
                    <span>{{ item.lockerNo }}</span>
                  </div>
                  <div class="ly-cabinet-edit">
                    <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="edit(item)" />
                    <a-button style="margin-left: 10px" type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="deleteCabinet(item.id)" />
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-spin>
        </div>
        <div class="ly-card-pagination">
          <a-pagination
            size="small"
            :total="cabinetList.total"
            :page-size="cabinetList.size"
            :current="cabinetList.current"
            show-size-changer
            show-quick-jumper
            :show-total="(total) => `总共 ${total} 个`"
            @change="handlePageChange"
            @showSizeChange="onShowSizeChange"
          />
        </div>
      </div>
      <div class="test-click">
        <a-input v-model:value="sysBraceletId" />
        <a-button type="primary" class="cabinet-rent" @click="cabinetRent">租柜子</a-button>
        <a-button @click="cabinetOut">退柜子</a-button>
      </div>
    </a-card>
    <SysCabinetEdit
      @submitModal="submitModal"
      @closeSuccessModal="closeSuccessModal"
      :cabinetEditVisible="modalList.cabinetEditVisible"
      :cabinetTitle="modalList.cabinetTitle"
      :cabinetForm="modalList.cabinetForm"
    />
    <SysCabinetAdd @submitModal="submitModal" @closeSuccessModal="closeSuccessModal" :cabinetAddVisible="modalList.cabinetAddVisible" />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { tab, list, listStatistics, editList, editCabinetOut, editCabinetRent, deleteList, addList } from './SysCabinetList.api';
  import { IPosition } from './SysCabinetList.data';
  import SysCabinetEdit from './components/SysCabinetEdit.vue';
  import SysCabinetAdd from './components/SysCabinetAdd.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const spinning = ref<boolean>(false);
  const { createConfirm } = useMessage();
  // 测试点击
  const sysBraceletId = ref('');
  const cabinetRent = async () => {
    await editCabinetRent({ sysBraceletId: sysBraceletId.value }, getList(key.value, cabinetList.current, cabinetList.size));
  };
  const cabinetOut = async () => {
    await editCabinetOut({ sysBraceletId: sysBraceletId.value }, getList(key.value, cabinetList.current, cabinetList.size));
  };

  const APagination = Pagination;
  let position = reactive<IPosition[]>([]);
  let key = ref('1');

  let cabinetList = reactive<any>({
    pages: 1,
    current: 1,
    size: 40,
    total: 1,
    records: [],
    statistics: [],
  });
  let modalList = reactive<any>({
    cabinetEditVisible: false,
    cabinetAddVisible: false,
    cabinetTitle: '',
    cabinetForm: {},
  });
  //获取tab列表
  const getTab = async () => {
    let { records } = await tab();
    records.forEach((item) => {
      position.push({
        key: item.itemValue,
        tab: item.itemText,
      });
    });
    key.value = records[0].itemValue;
  };
  //获取分页数据
  const getList = async (pos, pageNo = 1, pageSize = 40) => {
    spinning.value = true;
    let listData = await list({ position: pos, pageNo, pageSize });
    cabinetList.records = listData.records;
    cabinetList.pages = listData.pages;
    cabinetList.current = listData.current;
    cabinetList.size = listData.size;
    cabinetList.total = listData.total;
    nextTick(() => {
      spinning.value = false;
    });
  };
  //获取更衣柜统计数据
  const getStatistics = async (key) => {
    let result = await listStatistics({ position: key });
    cabinetList.statistics = result;
  };
  // 初始化
  onMounted(() => {
    getTab();
    getStatistics(key.value);
    getList(key.value, cabinetList.current, cabinetList.size);
  });
  // 根据状态进行分类
  const cabinetState = (state) => {
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
  // 切换分页
  const handlePageChange = (value) => {
    cabinetList.current = value;
    getList(key.value, cabinetList.current, cabinetList.size);
  };
  // 切换每页数量
  const onShowSizeChange = (current: number, pageSize: number) => {
    cabinetList.current = current;
    cabinetList.size = pageSize;
    getList(key.value, cabinetList.current, cabinetList.size);
  };
  // 切换男女跟衣柜请求
  const onTabChange = (value: string) => {
    key.value = value;
    getList(key.value, cabinetList.current, cabinetList.size);
    getStatistics(key.value);
  };
  // 打开编辑弹窗
  const edit = (item) => {
    modalList.cabinetEditVisible = true;
    modalList.cabinetTitle = `编辑：${item.lockerNo} 号柜`;
    modalList.cabinetForm = item;
  };
  // 打开添加弹窗
  const add = () => {
    modalList.cabinetAddVisible = true;
  };
  // 删除柜子
  const deleteCabinet = (id) => {
    createConfirm({
      iconType: 'warning',
      title: '确认删除',
      content: '是否删除选中柜子',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        return await deleteList({ id }, getList(key.value, cabinetList.current, cabinetList.size));
      },
    });
  };
  // 关闭所有弹窗
  const closeSuccessModal = (isShow: boolean) => {
    modalList.cabinetEditVisible = isShow;
    modalList.cabinetAddVisible = isShow;
    modalList.cabinetTitle = '';
    modalList.cabinetForm = {};
  };
  //请求分类
  const submitModal = async (type, data) => {
    if (type == '编辑') {
      await editList(data, getList(key.value, cabinetList.current, cabinetList.size));
    } else {
      await addList(data, getList(key.value, cabinetList.current, cabinetList.size));
    }
    closeSuccessModal(false);
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

  .ly-card {
    position: relative;
    .test-click {
      position: absolute;
      right: 12px;
      top: 8px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      .cabinet-rent {
        margin: 0 10px;
      }
    }
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
      .cabinet {
        text-align: center;
        font-weight: 700;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        position: relative;
        .ly-cabinet-info {
          margin: 0;
          font-weight: 700;
        }

        .ly-cabinet-edit {
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
        &:hover .ly-cabinet-edit {
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
