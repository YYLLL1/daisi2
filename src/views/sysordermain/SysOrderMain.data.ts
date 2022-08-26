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
    dataIndex: 'orderStatus_dictText',
  },
  {
    title: '类目	',
    align: 'center',
    dataIndex: 'category_dictText',
  },
  {
    title: '手机号码',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '收款方式',
    align: 'center',
    dataIndex: 'paymentMethod_dictText',
  },
  {
    title: '下单方式',
    align: 'center',
    dataIndex: 'orderForm_dictText',
  },
];
//子表表格配置
export const childrenColumn = [
  {
    title: '状态',
    align: 'center',
    dataIndex: 'ticket_status',
    key: 'ticket_status',
    slots: { customRender: 'ticket_status' },
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
    dataIndex: 'ticket_number',
  },
  {
    title: '实收款',
    align: 'center',
    dataIndex: 'actual_receipts',
  },
  {
    title: '收款方式',
    align: 'center',
    dataIndex: 'payment_method',
    key: 'payment_method',
    slots: { customRender: 'payment_method' },
  },
  {
    title: '下单方式',
    align: 'center',
    dataIndex: 'order_form',
    key: 'order_form',
    slots: { customRender: 'order_form' },
  },
  {
    title: '门票核销',
    align: 'center',
    dataIndex: 'ticket_write_off',
    key: 'ticket_write_off',
    slots: { customRender: 'ticket_write_off' },
  },
  {
    title: '出闸判断',
    align: 'center',
    dataIndex: 'ticket_access_gate',
    key: 'ticket_access_gate',
    slots: { customRender: 'ticket_access_gate' },
  },
];
