//列表数据
export const columns = [
  {
    title: '订单编码',
    align: 'center',
    key: 'orderCode',
    dataIndex: 'orderCode',
  },
  {
    title: '下单时间',
    align: 'center',
    key: 'xdDate',
    dataIndex: 'xdDate',
  },
  {
    title: '订单总额',
    align: 'center',
    dataIndex: 'money',
  },
  {
    title: '备注',
    align: 'center',
    key: 'remark',
    dataIndex: 'remark',
  },
  {
    title: '类目	',
    align: 'center',
    dataIndex: 'category',
    key: 'category',
    slots: { customRender: 'category' },
  },
  {
    title: '手机号码',
    align: 'center',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '收款方式',
    align: 'center',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    slots: { customRender: 'paymentMethod' },
  },
  {
    title: '下单方式',
    align: 'center',
    dataIndex: 'orderForm',
    key: 'orderForm',
    slots: { customRender: 'orderForm' },
  },
];
//子表表格配置
export const childrenColumn = [
  {
    title: '状态',
    align: 'center',
    dataIndex: 'ticketStatus',
    key: 'ticketStatus',
    slots: { customRender: 'ticketStatus' },
  },
  {
    title: '购票人',
    align: 'center',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    align: 'center',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '订单号',
    align: 'center',
    key: 'ticketNumber',
    dataIndex: 'ticketNumber',
  },
  {
    title: '实收款',
    align: 'center',
    key: 'actualReceipts',
    dataIndex: 'actualReceipts',
  },
  {
    title: '收款方式',
    align: 'center',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    slots: { customRender: 'paymentMethod' },
  },
  {
    title: '下单方式',
    align: 'center',
    dataIndex: 'orderForm',
    key: 'orderForm',
    slots: { customRender: 'orderForm' },
  },
  {
    title: '门票核销',
    align: 'center',
    dataIndex: 'ticketWriteOff',
    key: 'ticketWriteOff',
    slots: { customRender: 'ticketWriteOff' },
  },
  {
    title: '出闸判断',
    align: 'center',
    dataIndex: 'ticketAccessGate',
    key: 'ticketAccessGate',
    slots: { customRender: 'ticketAccessGate' },
  },
];
