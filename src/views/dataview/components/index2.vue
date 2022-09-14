<template>
  <div class="view">
    <div class="view-header">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="16" class="view-left">
          <div class="view-img">
            <img src="../../../assets/images/ly-logo.png" alt="" />
          </div>
          <span>数智魔力</span>
        </a-col>
        <a-col :span="8" class="view-right">
          <p></p>
          <p style="margin-top: 10px; background-color: #efbd47"></p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" class="view-button">
          <p style="background-color: cornflowerblue"></p>
          <p style="margin-top: 10px; background-color: #efbd47"></p>
          <p></p>
          <p style="margin-top: 10px; background-color: #efbd47"></p>
        </a-col>
      </a-row>
    </div>
    <div class="view-body">
      <ul>
        <li v-for="(item, index) in list" :key="index" :style="`background-color:${item.bg};width: calc(${item.width} - 6px);`">
          <Icon :icon="item.icon" :size="item.size" />
          <p>{{ item.p }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const list = reactive([
    { icon: 'ant-design:home-filled', size: '26px', p: '首页', bg: '#b6311c', width: '50%' },
    { icon: 'ant-design:diff-filled', size: '26px', p: '售票', bg: '#25c2bf', width: '50%' },
    { icon: 'ant-design:user-add-outlined', size: '26px', p: '添加客户', bg: '#e57807', width: '25%' },
    { icon: 'ant-design:schedule-filled', size: '26px', p: '客户列表', bg: '#0e9fcc', width: '25%' },
    { icon: 'ant-design:bank-filled', size: '26px', p: '门票类别', bg: '#91509f', width: '50%' },
    { icon: 'ant-design:funnel-plot-filled', size: '26px', p: '客户中心', bg: '#0a81b2', width: '25%' },
    { icon: 'ant-design:profile-outlined', size: '26px', p: '场馆信息', bg: '#4bcc43', width: '25%' },
    { icon: 'ant-design:credit-card-filled', size: '26px', p: '设备管理', bg: '#7566f8', width: '25%' },
    { icon: 'ant-design:appstore-filled', size: '26px', p: '储柜管理', bg: '#b6311c', width: '25%' },
    { icon: 'ant-design:carry-out-filled', size: '26px', p: '售票订单', bg: '#b6311c', width: '50%' },
    { icon: 'ant-design:credit-card-filled', size: '26px', p: '网络售票', bg: '#7566f8', width: '25%' },
    { icon: 'ant-design:ungroup-outlined', size: '26px', p: '客户列表', bg: '#0a81b2', width: '25%' },
    { icon: 'ant-design:user-add-outlined', size: '26px', p: '会员中心', bg: '#91509f', width: '25%' },
    { icon: 'ant-design:crown-filled', size: '26px', p: '会员充值', bg: '#b6311c', width: '25%' },
    { icon: 'ant-design:search-outlined', size: '26px', p: '订单查询', bg: '#0a81b2', width: '50%' },
    { icon: 'ant-design:setting-outlined', size: '26px', p: '手环租赁', bg: '#b6311c', width: '25%' },
    { icon: 'ant-design:carry-out-filled', size: '26px', p: '手环记录', bg: '#91509f', width: '25%' },
    { icon: 'ant-design:team-outlined', size: '26px', p: '员工管理', bg: '#25c2bf', width: '25%' },
    { icon: 'ant-design:partition-outlined', size: '26px', p: '组织结构', bg: '#e57807', width: '25%' },
  ]);
</script>

<style lang="less">
  .view {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    overflow-y: auto;
    .view-left {
      .view-img {
        display: inline-block;
        border: 5px solid #eee;
        border-radius: 50%;
        padding: 10px;
        margin-left: 10px;
        img {
          width: 52px;
          display: inline-block;
        }
      }
      span {
        display: inline-block;
        margin-left: 10px;
        font-weight: 700;
        font-size: 18px;
      }
    }
    .view-right p {
      width: 40px;
      height: 15px;
      background-color: #dd0202;
      margin-bottom: 0;
    }
    .view-button p {
      display: inline-block;
      margin-left: 10px;
      width: 40px;
      height: 15px;
      background-color: #dd0202;
      margin-top: 20px;
    }
    .view-body {
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-left: -3px;
        margin-right: -3px;
        li {
          width: calc(50% - 6px);
          margin: 0 3px 6px;
          background-color: #dd0202;
          text-align: center;
          height: 90px;
          line-height: 90px;
          position: relative;
          span {
            color: #fff;
          }
          p {
            position: absolute;
            left: 5px;
            bottom: 5px;
            color: #fff;
            line-height: 1;
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
