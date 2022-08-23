<template>
  <a-card class="ly-card" :tab-list="position" :active-tab-key="key" @tabChange="(item) => onTabChange(item)">
    <div class="ly-card-container">
      <div class="ly-card-tool">
        <p v-for="(state, index) of cabinetList.statistics" :key="index">{{ state.cabinetstate }}：{{ state.cabinetcount }}</p>
        <a-button type="primary">新增更衣柜</a-button>
      </div>
      <div class="ly-card-content">
        <a-row :gutter="16" class="ly-card-list">
          <a-col v-for="item of cabinetList.records" :key="item.id" class="ly-card-item" :span="3">
            <div class="cabinet" :class="cabinetState(item.cabinetState)">
              <div class="ly-cabinet-info">
                <span>{{ item.cabinetState_dictText }}</span>
                <br />
                <span>{{ item.lockerNo }}</span>
              </div>
              <div class="ly-cabinet-edit">
                <a-button type="primary" preIcon="ant-design:edit-outlined" size="small" title="编辑" @click="edit(item)" />
              </div>
            </div>
          </a-col>
        </a-row>
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
        />
      </div>
    </div>
    <div class="test-click">
      <a-input v-model:value="sysBraceletId" />
      <a-button type="primary" class="cabinet-rent" @click="cabinetRent">租柜子</a-button>
      <a-button type="primary" @click="cabinetOut">退柜子</a-button>
    </div>
  </a-card>
  <SysCabinetListModal
    @submitModal="submitModal"
    @closeSuccessModal="closeSuccessModal"
    :cabinetVisible="modalList.cabinetVisible"
    :cabinetTitle="modalList.cabinetTitle"
    :cabinetForm="modalList.cabinetForm"
  />
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { tab, list, listStatistics, editList, editCabinetOut, editCabinetRent } from './SysCabinetList.api';
  import { IPosition } from './SysCabinetList.data';
  import SysCabinetListModal from './components/SysCabinetListModal.vue';

  // 测试点击
  const sysBraceletId = ref('');
  const cabinetRent = async () => {
    let result = await editCabinetRent({ sysBraceletId: sysBraceletId.value });
    console.log(sysBraceletId.value, result);
  };
  const cabinetOut = async () => {
    let result = await editCabinetOut({ sysBraceletId: sysBraceletId.value });
    console.log(sysBraceletId.value, result);
  };

  const APagination = Pagination;
  let position = reactive<IPosition[]>([]);
  let key = ref('1');

  let cabinetList = reactive<any>({
    pages: 0,
    current: 0,
    size: 0,
    total: 0,
    records: [],
    statistics: [],
  });
  let modalList = reactive<any>({
    cabinetVisible: false,
    cabinetTitle: '',
    cabinetForm: {},
  });

  const getTab = async () => {
    //获取tab列表
    let { records } = await tab();
    records.forEach((item) => {
      position.push({
        key: item.itemValue,
        tab: item.itemText,
      });
    });
    key.value = records[0].itemValue;
  };
  const getList = async (pos, pageNo = 1, pageSize = 40) => {
    //获取list列表
    let listData = await list({ position: pos, pageNo, pageSize });
    cabinetList.records = listData.records;
    cabinetList.pages = listData.pages;
    cabinetList.current = listData.current;
    cabinetList.size = listData.size;
    cabinetList.total = listData.total;
  };
  const getStatistics = async () => {
    //获取tab列表
    let result = await listStatistics();
    cabinetList.statistics = result;
  };
  const editCabinet = async (params) => {
    //提交编辑
    await editList(params);
  };

  onMounted(() => {
    getTab();
    getStatistics();
    getList(key.value);
  });
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
  const handlePageChange = (value) => {
    getList(key.value, value);
  };
  const onTabChange = (value: string) => {
    key.value = value;
    getList(key.value);
  };

  const edit = (item) => {
    modalList.cabinetVisible = true;
    modalList.cabinetTitle = `编辑：${item.lockerNo} 号柜`;
    modalList.cabinetForm = item;
  };
  // 关闭弹窗
  const closeSuccessModal = (isShow: boolean) => {
    modalList.cabinetVisible = isShow;
    modalList.cabinetTitle = '';
    modalList.cabinetForm = {};
  };

  const submitModal = (data) => {
    editCabinet(data);
    closeSuccessModal(false);
    getList(key.value);
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
    margin: 20px;
    position: relative;
    .test-click {
      position: absolute;
      right: 0;
      top: 0;
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
