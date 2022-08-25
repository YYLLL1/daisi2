import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '手环状态',
    align: 'center',
    dataIndex: 'braceletStatu_dictText',
  },
  {
    title: '手环编号',
    align: 'center',
    dataIndex: 'sysBraceletId',
  },
  {
    title: '使用者',
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '手环订单号',
    align: 'center',
    dataIndex: 'braceletOrderCode',
  },
  {
    title: '已收押金',
    align: 'center',
    dataIndex: 'deposit',
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
  {
    title: '下单时间',
    align: 'center',
    dataIndex: 'orderTime',
  },
  {
    title: '储柜状态',
    align: 'center',
    dataIndex: 'cabinetStatu_dictText',
  },
  {
    title: '储柜动作',
    key: 'cabinet_action',
    align: 'center',
    slots: { customRender: 'cabinet_action' },
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '手环状态',
    field: 'braceletStatu',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'bracelet_statu',
    },
    colProps: { span: 6 },
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '下单时间',
    field: 'orderTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '手环状态',
    field: 'braceletStatu',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'bracelet_statu',
    },
  },
  {
    label: '手环编号',
    field: 'sysBraceletId',
    component: 'Input',
  },
  {
    label: '使用者',
    field: 'username',
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '手环订单号',
    field: 'braceletOrderCode',
    component: 'Input',
  },
  {
    label: '已收押金',
    field: 'deposit',
    component: 'InputNumber',
  },
  {
    label: '收款方式',
    field: 'paymentMethod',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'payment_method',
    },
  },
  {
    label: '下单方式',
    field: 'orderForm',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'order_form',
    },
  },
  {
    label: '下单时间',
    field: 'orderTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '储柜状态',
    field: 'cabinetStatu',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'cabinet_statu',
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
