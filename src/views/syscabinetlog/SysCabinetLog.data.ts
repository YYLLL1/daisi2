import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { rules } from '/@/utils/helper/validator';
// import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '租柜状态',
    align: 'center',
    dataIndex: 'rentCabinetStatus_dictText',
  },
  {
    title: '更衣柜编号',
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
    title: '柜子订单号',
    align: 'center',
    dataIndex: 'cabinetOrderCode',
  },
  {
    title: '开柜方式',
    align: 'center',
    dataIndex: 'openCabinetType_dictText',
  },
  {
    title: '绑定ID',
    align: 'center',
    dataIndex: 'bindingId',
  },
  {
    title: '开柜时间',
    align: 'center',
    dataIndex: 'openCabinetTime',
  },
  {
    title: '退柜时间',
    align: 'center',
    dataIndex: 'returnCabinetTime',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '租柜状态',
    field: 'rentCabinetStatus',
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
    label: '柜子订单号',
    field: 'cabinetOrderCode',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '开柜时间',
    field: 'openCabinetTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
  {
    label: '退柜时间',
    field: 'returnCabinetTime',
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
    label: '租柜状态',
    field: 'rentCabinetStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'rent_cabinet_status',
    },
  },
  {
    label: '更衣柜编号',
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
    label: '柜子订单号',
    field: 'cabinetOrderCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '开柜方式',
    field: 'openCabinetType',
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
    label: '开柜时间',
    field: 'openCabinetTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '退柜时间',
    field: 'returnCabinetTime',
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
