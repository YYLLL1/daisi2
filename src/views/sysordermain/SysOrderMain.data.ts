import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
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
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '订单编码',
    field: 'orderCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '下单时间',
    field: 'xdDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '订单总额',
    field: 'money',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '订单状态	',
    field: 'orderStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'order_status',
    },
  },
  {
    label: '类目	',
    field: 'category',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'category',
    },
  },
  {
    label: '手机号码',
    field: 'phone',
    component: 'Input',
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
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
//子表单数据
export const sysOrderCustomerFormSchema: FormSchema[] = [
  {
    label: '客户编码',
    field: 'customerCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '名字',
    field: 'name',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'sex',
    component: 'Input',
  },
  {
    label: '注册手机',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '客户类型',
    field: 'customerType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'customer_type',
    },
  },
  {
    label: '充值金额',
    field: 'recharge',
    component: 'InputNumber',
  },
  {
    label: '人脸信息存在',
    field: 'isHumanface',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'is_exist',
    },
  },
  {
    label: '掌静脉信息存在',
    field: 'isPalmarvein',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'is_exist',
    },
  },
  {
    label: '来源',
    field: 'source',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'order_form',
    },
  },
  {
    label: '注册时间',
    field: 'registerTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '订单ID',
    field: 'sysOrderMainId',
    component: 'Input',
  },
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
//子表表格配置
export const sysOrderTicketColumns: JVxeColumn[] = [
  {
    title: '门票ID',
    key: 'sysTicketId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '价格',
    key: 'price',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '数量',
    key: 'num',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '单票总价',
    key: 'zongPrice',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '订单ID',
    key: 'sysOrderMainId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '手环ID',
    key: 'sysBraceletId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '人脸ID',
    key: 'sysHumanfaceId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '掌静脉ID',
    key: 'sysPalmarveinId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '客户ID',
    key: 'sysCustomerId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
