export interface GrowCardItem {
  icon?: string;
  title?: string;
  value?: number;
  total?: number;
  color?: string;
  action?: string;
  footer?: string;
  id?: string;
  footerIcon?: string;
  footerTotal?: string;
  path?: string;
}

// indexTop
export const indexTop: GrowCardItem[] = [
  {
    title: '今日售票',
    id: '1',
    total: 34,
    color: '',
  },
  {
    title: '网络售票',
    id: '2',
    total: 27,
    color: 'skyBlue',
  },
  {
    title: '场馆售票',
    id: '3',
    total: 7,
    color: '',
  },
  {
    title: '入闸总人数',
    id: '4',
    total: 55,
    color: '',
  },
  {
    title: '会员入闸',
    id: '5',
    total: 34,
    color: '',
  },
];
// indexCenter
export const indexCenter: GrowCardItem[] = [
  {
    title: '戴思乐深圳南山分馆',
    icon: 'visit-count|svg',
    footer: '深圳',
    footerIcon: '',
  },
  {
    title: '',
    icon: 'total-sales|svg',
    total: 4033.0,
    footer: '今日营收（元）',
    footerTotal: '含收入：100.00元',
  },
  {
    total: 3,
    footer: '今日新增会员',
    icon: 'download-count|svg',
  },
  {
    total: 10,
    footer: '当前客流量',
    icon: 'transaction|svg',
  },
];
// indexRight
export const indexRight: GrowCardItem[] = [
  {
    title: '售票',
    icon: 'ant-design:info-circle-outlined',
    path: '/sell/index',
    color: 'blue',
    footer: '票务售卖',
  },
  {
    title: '会员充值',
    icon: 'ant-design:info-circle-outlined',
    footer: '会员卡办理/充值',
    path: '',
  },
  {
    title: '收银',
    icon: 'ant-design:info-circle-outlined',
    footer: '商品收款',
    path: '',
  },
  {
    title: '租赁',
    icon: 'ant-design:info-circle-outlined',
    footer: '物品租赁',
    path: '',
  },
];
// indexLeft
export const indexLeft = {
  dataSource: [
    { key: '1', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-01-22 10:16:31' },
    { key: '2', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-01-23 10:16:31' },
    { key: '3', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-01-25 10:16:31' },
    { key: '4', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-11-22 10:16:31' },
    { key: '5', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-12-12 10:16:31' },
    { key: '6', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-03-06 10:16:31' },
    { key: '7', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-04-13 10:16:31' },
    { key: '8', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-05-09 10:16:31' },
    { key: '9', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-07-12 10:16:31' },
    { key: '10', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-12-12 10:16:31' },
    { key: '11', type: '订票', message: '尾号0316预定了游泳单次票1张', time: '2019-09-10 10:16:31' },
  ],
  columns: [
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type',
    },
    {
      title: '消息内容',
      align: 'center',
      dataIndex: 'message',
    },
    {
      title: '时间',
      align: 'center',
      dataIndex: 'time',
    },
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条';
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
  },
};
