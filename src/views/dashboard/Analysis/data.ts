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
  columns: [
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type',
    },
    {
      title: '消息内容',
      align: 'center',
      dataIndex: 'content',
    },
    {
      title: '时间',
      align: 'center',
      dataIndex: 'createTime',
    },
  ],
};
