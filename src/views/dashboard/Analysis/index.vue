<template>
  <div class="ly-container">
    <IndexTop />
    <IndexCenter />
    <div class="gutter-example">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <IndexLeft />
        </a-col>
        <a-col class="gutter-row" :span="12">
          <IndexRight />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IndexTop from './components/indexTop.vue';
  import IndexCenter from './components/indexCenter.vue';
  import IndexLeft from './components/indexLeft.vue';
  import IndexRight from './components/indexRight.vue';
</script>
<style lang="less" scoped>
  @themeBg: #1890ff;
  @themeFc: #fff;
  @themeBg: #000;
  .gutter-example {
    margin-top: 20px;
    :deep(.ant-row > div) {
      background: transparent;
      border: 0;
    }
  }
</style>
