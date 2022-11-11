import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '所属门店',
    align: 'center',
    dataIndex: 'store',
  },
  {
    title: '课程名称',
    align: 'center',
    dataIndex: 'courseName',
  },
  {
    title: '满班人数',
    align: 'center',
    dataIndex: 'fullClassNumber',
  },
  {
    title: '上课地点',
    align: 'center',
    dataIndex: 'courseLocation',
  },
  {
    title: '开班日期',
    align: 'center',
    dataIndex: 'classStartDate',
  },
  {
    title: '线上同步',
    align: 'center',
    dataIndex: 'onLineIs_dictText',
  },
  {
    title: '排课方式',
    align: 'center',
    dataIndex: 'arrangingType_dictText',
  },
  {
    title: '上课日期开始',
    align: 'center',
    dataIndex: 'classBeginDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '上课日期结束',
    align: 'center',
    dataIndex: 'classEndDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '开始时间',
    align: 'center',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    align: 'center',
    dataIndex: 'endTime',
  },
  {
    title: '选择循环天',
    align: 'center',
    dataIndex: 'cycleDays',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remarks',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '所属门店',
    field: 'store',
    component: 'Input',
  },
  {
    label: '课程名称',
    field: 'courseName',
    component: 'Input',
  },
  {
    label: '满班人数',
    field: 'fullClassNumber',
    component: 'InputNumber',
  },
  {
    label: '上课地点',
    field: 'courseLocation',
    component: 'Input',
  },
  {
    label: '开班日期',
    field: 'classStartDate',
    component: 'DatePicker',
  },
  {
    label: '线上同步',
    field: 'onLineIs',
    component: 'RadioGroup',
  },
  {
    label: '排课方式',
    field: 'arrangingType',
    component: 'RadioGroup',
  },
  {
    label: '上课日期开始',
    field: 'classBeginDate',
    component: 'DatePicker',
  },
  {
    label: '上课日期结束',
    field: 'classEndDate',
    component: 'DatePicker',
  },
  {
    label: '开始时间',
    field: 'startTime',
    component: 'TimePicker',
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'TimePicker',
  },
  {
    label: '选择循环天',
    field: 'cycleDays',
    component: 'Select',
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
