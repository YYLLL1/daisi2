//列表数据
export const columns = [
  {
    title: '订单编码',
    align: 'center',
    dataIndex: 'orderCode',
  },
  {
    title: '下单时间',
    align: 'center',
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
    dataIndex: 'remark',
  },
  {
    title: '订单状态	',
    align: 'center',
    dataIndex: 'orderStatus',
  },
  {
    title: '类目	',
    align: 'center',
    dataIndex: 'category',
  },
  {
    title: '手机号码',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '收款方式',
    align: 'center',
    dataIndex: 'paymentMethod',
  },
  {
    title: '下单方式',
    align: 'center',
    dataIndex: 'orderForm',
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
    dataIndex: 'name',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'ticketNumber',
  },
  {
    title: '实收款',
    align: 'center',
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
