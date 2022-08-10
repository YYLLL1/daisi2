<template>
  <a-table
    class="ly-table ant-table-striped"
    :columns="indexLeft.columns"
    :data-source="indexLeft.dataSource"
    :pagination="false"
    size="middle"
    :scroll="{ y: 240 }"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
  />
</template>

<script lang="ts" setup>
  import { indexLeft } from '../data';
</script>

<style lang="less" scoped>
  .ant-table-striped ::v-deep(.table-striped) td {
    background-color: #eaf5ff;
  }
  .ly-table {
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  }
</style>
