import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '门票名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '门票类型',
    align: 'center',
    dataIndex: 'ticketType_dictText',
  },
  {
    title: '门票价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '售卖状态',
    align: 'center',
    dataIndex: 'sellStatus_dictText',
  },
  {
    title: '人数',
    align: 'center',
    dataIndex: 'peopleNumber',
  },
  {
    title: '特殊说明',
    align: 'center',
    dataIndex: 'special',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit_dictText',
  },
  {
    title: '二维码闸机核销',
    align: 'center',
    dataIndex: 'edTicketWriteOff_dictText',
  },
  {
    title: '线上同步',
    align: 'center',
    dataIndex: 'onLineIs_dictText',
  },
  {
    title: '起始时间',
    align: 'center',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    align: 'center',
    dataIndex: 'endTime',
  },
  {
    title: '有效期天数',
    align: 'center',
    dataIndex: 'validDays',
  },
  {
    title: '有效日期',
    align: 'center',
    dataIndex: 'termOfValidity',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remarks',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '售卖状态',
    field: 'sellStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sell_status',
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '门票名称',
    field: 'name',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入门票名称!' }];
    },
  },
  {
    label: '门票类型',
    field: 'ticketType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ticket_type',
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入门票类型!' }];
    },
  },
  {
    label: '门票价格',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入门票价格!' }];
    },
  },
  {
    label: '售卖状态',
    field: 'sellStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sell_status',
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入售卖状态!' }];
    },
  },
  {
    label: '人数',
    field: 'peopleNumber',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入人数!' }];
    },
  },
  {
    label: '特殊说明',
    field: 'special',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'unit',
    },
  },
  {
    label: '二维码闸机核销',
    field: 'edTicketWriteOff',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ed_ticket_write_off',
    },
  },
  {
    label: '线上同步',
    field: 'onLineIs',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'is_exist',
    },
  },
  {
    label: '起始时间',
    field: 'startTime',
    component: 'TimePicker',
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'TimePicker',
  },
  {
    label: '有效期天数',
    field: 'validDays',
    component: 'InputNumber',
  },
  {
    label: '有效日期',
    field: 'termOfValidity',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'Input',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
