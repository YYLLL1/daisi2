<template>
  <div class="ly-container">
    <a-card v-show="false">
      <!--引用表格-->
      <BasicTable @register="registerTable" :rowSelection="rowSelection">
        <!--插槽:table标题-->
        <template #tableTitle>
          <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
          <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="batchHandleDelete">
                  <Icon icon="ant-design:delete-outlined" />
                  删除
                </a-menu-item>
              </a-menu>
            </template>
            <a-button
              >批量操作
              <Icon icon="mdi:chevron-down" />
            </a-button>
          </a-dropdown>
        </template>
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
        </template>
        <!--字段回显插槽-->
        <template #htmlSlot="{ text }">
          <div v-html="text"></div>
        </template>
        <!--省市区字段回显插槽-->
        <template #pcaSlot="{ text }">
          {{ getAreaTextByCode(text) }}
        </template>
        <template #fileSlot="{ text }">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
          <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
        </template>
      </BasicTable>
      <!-- 表单区域 -->
      <SysVenueModal ref="registerModal" @success="handleSuccess" />
    </a-card>
    <a-card class="ly-card">
      <div class="ly-venue-edit" @click="handleEdit(venueList.data)">编辑设置</div>
      <div class="ly-card-container">
        <div class="ly-venue-header">
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
              <img :src="venueList.venueImage[0]" alt="" />
            </a-col>
            <a-col class="gutter-row" :span="18">
              <h3 class="ly-venue-title">{{ venueList.data.venueName }}</h3>
              <p class="ly-venue-status">状态：<span class="c-blue">营业中</span></p>
              <p class="ly-venue-address">地址：深圳市南山区</p>
              <p class="ly-venue-introduce">简介：{{ venueList.data.venueIntroduction }}</p>
            </a-col>
          </a-row>
        </div>
        <div class="ly-venue-gallery">
          <h3>场馆图片</h3>
          <ul>
            <li v-for="(item, index) of venueList.venueImage" :key="index">
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
        <div class="ly-venue-item">
          <h3>详细介绍</h3>
          <p class="ly-item-content">
            {{ venueList.data.venueIntroduction }}
          </p>
        </div>
        <div class="ly-venue-item">
          <h3>场馆电话</h3>
          <p class="ly-item-content">
            {{ venueList.data.venueTel }}
          </p>
        </div>
        <div class="ly-venue-item">
          <h3>运营时间</h3>
          <p class="ly-item-content">
            {{ venueList.data.venueTime }}
          </p>
        </div>
        <div class="ly-venue-item">
          <h3>入场须知</h3>
          <p class="ly-item-content">
            {{ venueList.data.venueNotice }}
          </p>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" name="sysvenue-sysVenue" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { getAreaTextByCode } from '/@/components/Form/src/utils/Area';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './SysVenue.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './SysVenue.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import SysVenueModal from './components/SysVenueModal.vue';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';

  const queryParam = ref<any>({});
  const registerModal = ref();
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '场馆',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam.value);
      },
    },
    exportConfig: {
      name: '场馆',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  let venueList = reactive({
    data: {},
    venueImage: [],
  });
  async function handleList() {
    let { records } = await list();
    let arr = [];
    records[0].venuePhotos.split(',').forEach((item: any) => arr.push(getFileAccessHttpUrl(item)));
    venueList.data = records[0];
    venueList.venueImage = arr;
  }
  onMounted(() => {
    handleList();
  });
  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  /**
   * 查询
   */
  // function searchQuery() {
  //   reload();
  // }

  /**
   * 重置
   */
  // function searchReset() {
  //   queryParam.value = {};
  //   selectedRowKeys.value = [];
  //   //刷新数据
  //   reload();
  // }
</script>

<style lang="less" scoped>
  @themFc: #1890ff;
  .ly-venue-edit {
    position: absolute;
    top: 16px;
    right: 24px;
    color: @themFc;
    z-index: 10;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .ly-venue-gallery img {
    height: 100%;
    max-height: 100px;
  }

  .ly-card-container {
    & > div {
      margin-bottom: 20px;
    }
    .c-blue {
      color: @themFc;
    }
    .c-red {
      color: red;
    }

    h3 {
      font-size: 20px;
      font-weight: 700;
      color: rgba(0, 0, 0, 1);
    }
    p {
      font-size: 14px;
    }
  }
</style>
