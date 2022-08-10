import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { rules} from '/@/utils/helper/validator';
// import { render } from '/@/utils/common/renderUtils';
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
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
