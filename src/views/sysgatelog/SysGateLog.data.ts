import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '闸机状态',
    align: 'center',
    dataIndex: 'gateStatus_dictText',
  },
  {
    title: '闸机编号',
    align: 'center',
    dataIndex: 'lockerNo',
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
    title: '闸机订单号',
    align: 'center',
    dataIndex: 'gateOrderCode',
  },
  {
    title: '进出闸方式',
    align: 'center',
    dataIndex: 'gateType_dictText',
  },
  {
    title: '绑定ID',
    align: 'center',
    dataIndex: 'bindingId',
  },
  {
    title: '进出闸时间',
    align: 'center',
    dataIndex: 'gateTime',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '闸机状态',
    field: 'gateStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'rent_cabinet_status',
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
    label: '闸机订单号',
    field: 'gateOrderCode',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '进出闸时间',
    field: 'gateTime',
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
    label: '闸机状态',
    field: 'gateStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'rent_cabinet_status',
    },
  },
  {
    label: '闸机编号',
    field: 'lockerNo',
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
    label: '闸机订单号',
    field: 'gateOrderCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '进出闸方式',
    field: 'gateType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'open_cabinet_type',
    },
  },
  {
    label: '绑定ID',
    field: 'bindingId',
    component: 'Input',
  },
  {
    label: '进出闸时间',
    field: 'gateTime',
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
