import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户编码',
    align: 'center',
    dataIndex: 'customerCode',
  },
  {
    title: '名字',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
  },
  {
    title: '注册手机',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '客户类型',
    align: 'center',
    dataIndex: 'customerType_dictText',
  },
  {
    title: '充值金额',
    align: 'center',
    dataIndex: 'recharge',
  },
  {
    title: '人脸信息存在',
    align: 'center',
    dataIndex: 'isHumanface_dictText',
  },
  {
    title: '掌静脉信息存在',
    align: 'center',
    dataIndex: 'isPalmarvein_dictText',
  },
  {
    title: '来源',
    align: 'center',
    dataIndex: 'source_dictText',
  },
  {
    title: '注册时间',
    align: 'center',
    dataIndex: 'registerTime',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '名字',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '客户类型',
    field: 'customerType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'customer_type',
    },
    colProps: { span: 6 },
  },
  {
    label: '注册时间',
    field: 'registerTime',
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
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
