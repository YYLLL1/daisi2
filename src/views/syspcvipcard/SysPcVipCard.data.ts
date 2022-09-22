import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '卡号',
    align: 'center',
    dataIndex: 'cardNumber',
  },
  {
    title: '卡名称',
    align: 'center',
    dataIndex: 'cardName',
  },
  {
    title: '卡类型',
    align: 'center',
    dataIndex: 'cardType_dictText',
  },
  {
    title: '卡属性',
    align: 'center',
    dataIndex: 'cardAttribute_dictText',
  },
  {
    title: '通用属性',
    align: 'center',
    dataIndex: 'commonAttributes_dictText',
  },
  {
    title: '限制',
    align: 'center',
    dataIndex: 'astrict',
  },
  {
    title: '有效期',
    align: 'center',
    dataIndex: 'termOfValidity',
  },
  {
    title: '有效期累加',
    align: 'center',
    dataIndex: 'accumulation_dictText',
  },
  {
    title: '线上同步',
    align: 'center',
    dataIndex: 'onLineIs_dictText',
  },
  {
    title: '次数',
    align: 'center',
    dataIndex: 'numberOf',
  },
  {
    title: '赠送次数',
    align: 'center',
    dataIndex: 'numberOfGifts',
  },
  {
    title: '价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '说明',
    align: 'center',
    dataIndex: 'remarks',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '卡号',
    field: 'cardNumber',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '卡类型',
    field: 'cardType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'card_type',
    },
    colProps: { span: 6 },
  },
  {
    label: '卡属性',
    field: 'cardAttribute',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'card_attribute',
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '卡号',
    field: 'cardNumber',
    component: 'Input',
  },
  {
    label: '卡名称',
    field: 'cardName',
    component: 'Input',
  },
  {
    label: '卡类型',
    field: 'cardType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'card_type',
    },
  },
  {
    label: '卡属性',
    field: 'cardAttribute',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'card_attribute',
    },
  },
  {
    label: '通用属性',
    field: 'commonAttributes',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'common_attributes',
    },
  },
  {
    label: '限制',
    field: 'astrict',
    component: 'InputNumber',
  },
  {
    label: '有效期',
    field: 'termOfValidity',
    component: 'InputNumber',
  },
  {
    label: '有效期累加',
    field: 'accumulation',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'accumulation',
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
    label: '次数',
    field: 'numberOf',
    component: 'InputNumber',
  },
  {
    label: '赠送次数',
    field: 'numberOfGifts',
    component: 'InputNumber',
  },
  {
    label: '价格',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '说明',
    field: 'remarks',
    component: 'InputTextArea',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
