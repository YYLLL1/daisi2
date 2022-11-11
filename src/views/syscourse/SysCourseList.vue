<template>
  <div class="ly-container">
    <a-card class="ly-card" :bordered="false">
      <div class="ly-card-tool">
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd">新增</a-button>
      </div>
    </a-card>
    <a-spin :spinning="spinning">
      <a-row :gutter="16" class="ly-card-list">
        <a-col v-for="item of courseList.records" :key="item.id" class="ly-card-item" :span="6">
          <div class="course">
            <div class="ly-course-info">
              <div class="info-header">
                <h2>{{ item.courseName }}</h2>
                <p>0/{{ item.fullClassNumber }}</p>
              </div>
              <div class="info-content">
                <p> 老师：<b>XXX</b> </p>
                <p>
                  排课方式：<b>{{ item.arrangingType }}</b>
                </p>
                <p>
                  上课地点：<b>{{ item.courseLocation }}</b>
                </p>
                <p>
                  开班日期：<b>{{ item.classStartDate }}</b>
                </p>
                <p>
                  所属门店：<b>{{ item.store }}</b>
                </p>
                <p>
                  备注：<b>{{ item.remarks }}</b>
                </p>
              </div>
            </div>
            <div class="ly-course-edit">
              <a-button type="primary" preIcon="ant-design:edit-filled" size="small" title="编辑" @click="handleEdit(item)" />
              <a-button style="margin: 0 10px" preIcon="ant-design:edit-filled" size="small" title="详情" @click="handleDetail(item)" />
              <a-button type="primary" preIcon="ant-design:delete-filled" size="small" title="删除" danger @click="handleDelete(item.id)" />
            </div>
          </div>
        </a-col>
      </a-row>
    </a-spin>
    <a-card class="ly-card mg-t20" :bordered="false">
      <div class="ly-card-pagination">
        <a-pagination
          size="small"
          :total="courseList.total"
          :page-size="courseList.size"
          :current="courseList.current"
          show-size-changer
          show-quick-jumper
          :show-total="(total) => `总共 ${total} 个`"
          @change="handlePageChange"
          @showSizeChange="onShowSizeChange"
        />
      </div>
    </a-card>
    <!-- 表单区域 -->
    <SysCourseModal ref="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { list, deleteOne } from './SysCourse.api';
  import SysCourseModal from './components/SysCourseModal.vue';
  import { Pagination } from 'ant-design-vue';

  const spinning = ref<boolean>(false);
  const registerModal = ref();
  const APagination = Pagination;
  const pageNo = ref(1);
  let courseList = reactive<any>({
    pages: 0,
    current: 0,
    size: 0,
    total: 0,
    records: [],
  });

  //获取分页数据
  const getList = async (pageNo = 1, pageSize = 10) => {
    spinning.value = true;
    let result = await list({ pageNo, pageSize });
    courseList.records = result.records;
    courseList.pages = result.pages;
    courseList.current = result.current;
    courseList.size = result.size;
    courseList.total = result.total;
    nextTick(() => {
      spinning.value = false;
    });
  };

  onMounted(() => {
    getList();
  });

  const handlePageChange = (value) => {
    pageNo.value = value;
    getList(value);
  };
  //切换每页显示数据量
  const onShowSizeChange = (current: number, pageSize: number) => {
    courseList.current = current;
    courseList.size = pageSize;
    getList(current, pageSize);
  };
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
  async function handleDelete(id) {
    await deleteOne({ id }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    getList(pageNo.value);
  }
</script>

<style lang="less" scoped>
  .ly-card-list {
    .ly-card-item {
      margin-top: 16px;
      .course {
        padding: 16px;
        border-radius: 4px;
        background-color: #fff;
        .info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
      }
    }
  }

  .ly-card-pagination {
    margin-top: 16px;
    text-align: right;
  }
</style>
