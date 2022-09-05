<template>
  <div class="ly-container">
    <a-card class="ly-card">
      <div class="ly-venue-edit" @click="handleEdit(data.venueList)">编辑设置</div>
      <div class="ly-card-container">
        <a-spin :spinning="spinning">
          <div class="ly-venue-header">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="6">
                <img :src="data.venueImage[0]" alt="" />
              </a-col>
              <a-col class="gutter-row" :span="18">
                <h3 class="ly-venue-title">{{ data.venueList.venueName }}</h3>
                <p class="ly-venue-status">状态：<span class="c-blue">营业中</span></p>
                <p class="ly-venue-address">地址：深圳市南山区</p>
                <p class="ly-venue-introduce">简介：{{ data.venueList.venueIntroduction }}</p>
              </a-col>
            </a-row>
          </div>
          <div class="ly-venue-gallery">
            <h3>场馆图片</h3>
            <ul>
              <li v-for="(item, index) of data.venueImage" :key="index">
                <img :src="item" alt="" />
              </li>
            </ul>
          </div>
          <div class="ly-venue-item">
            <h3>详细介绍</h3>
            <p class="ly-item-content">
              {{ data.venueList.venueIntroduction }}
            </p>
          </div>
          <div class="ly-venue-item">
            <h3>场馆电话</h3>
            <p class="ly-item-content">
              {{ data.venueList.venueTel }}
            </p>
          </div>
          <div class="ly-venue-item">
            <h3>运营时间</h3>
            <p class="ly-item-content">
              {{ data.venueList.venueTime }}
            </p>
          </div>
          <div class="ly-venue-item">
            <h3>入场须知</h3>
            <p class="ly-item-content">
              {{ data.venueList.venueNotice }}
            </p>
          </div>
        </a-spin>
      </div>
      <!-- 表单区域 -->
      <SysVenueModal ref="registerModal" @success="handleSuccess" />
    </a-card>
  </div>
</template>

<script lang="ts" name="sysvenue-sysVenue" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { list } from './SysVenue.api';
  import SysVenueModal from './components/SysVenueModal.vue';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';

  const registerModal = ref();
  const spinning = ref<Boolean>(true);
  let data = reactive<any>({
    venueList: {},
    venueImage: [],
  });
  async function handleList() {
    spinning.value = true;
    let { records } = await list();
    let arr = reactive<any>([]);
    records[0].venuePhotos.split(',').forEach((item: any) => arr.push(getFileAccessHttpUrl(item)));
    data.venueList = records[0];
    data.venueImage = arr;
    spinning.value = false;
  }
  onMounted(() => {
    handleList();
  });

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    registerModal.value = {};
    handleList();
  }
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
  .ly-venue-header {
    margin-bottom: 16px;
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
