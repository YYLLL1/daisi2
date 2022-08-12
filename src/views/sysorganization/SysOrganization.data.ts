import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { rules } from '/@/utils/helper/validator';
// import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '组织名字',
    align: 'left',
    dataIndex: 'orgname',
  },
  {
    title: '组织描述',
    align: 'center',
    dataIndex: 'description',
  },
  {
    title: '组织等级',
    align: 'center',
    dataIndex: 'orglevel',
  },
  {
    title: '租户ID',
    align: 'center',
    dataIndex: 'tenantId',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '组织名字',
    field: 'orgname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '组织描述',
    field: 'description',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '父级节点',
    field: 'pid',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '租户ID',
    field: 'tenantId',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '组织名字',
    field: 'orgname',
    component: 'Input',
  },
  {
    label: '组织描述',
    field: 'description',
    component: 'Input',
  },
  {
    label: '组织等级',
    field: 'orglevel',
    component: 'InputNumber',
  },
  {
    label: '父级节点',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'sys_organization,orgname,id',
      pidField: 'pid',
      pidValue: '0',
      hasChildField: 'has_child',
    },
  },
  {
    label: '租户ID',
    field: 'tenantId',
    component: 'InputNumber',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
