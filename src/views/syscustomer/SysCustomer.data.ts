import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
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
    dataIndex: 'sex_dictText',
  },
  {
    title: '注册手机',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '掌静脉ID',
    align: 'center',
    dataIndex: 'sysPalmarveinId',
  },
  {
    title: '人脸ID',
    align: 'center',
    dataIndex: 'sysHumanfaceId',
  },
  {
    title: '关联实体卡',
    align: 'center',
    dataIndex: 'sysPcVipCardId',
  },
  {
    title: '实体卡工本费',
    align: 'center',
    dataIndex: 'costOfProduction_dictText',
  },
  {
    title: '客户类型',
    align: 'center',
    dataIndex: 'customerType_dictText',
  },
  {
    title: '折扣',
    align: 'center',
    dataIndex: 'discount',
  },
  {
    title: '押金',
    align: 'center',
    dataIndex: 'deposit',
  },
  {
    title: '充值金额',
    align: 'center',
    dataIndex: 'recharge',
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
  {
    title: '协议签名',
    align: 'center',
    dataIndex: 'agreementSignature',
  },
  {
    title: '身份证号',
    align: 'center',
    dataIndex: 'idNumber',
  },
  {
    title: '照片',
    align: 'center',
    dataIndex: 'memberPhotos',
    customRender: render.renderImage,
  },
  {
    title: '紧急联系人',
    align: 'center',
    dataIndex: 'urgentPeople',
  },
  {
    title: '紧急联系人电话',
    align: 'center',
    dataIndex: 'urgentPeopleTel',
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
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    label: '注册手机',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '掌静脉ID',
    field: 'sysPalmarveinId',
    component: 'Input',
  },
  {
    label: '人脸ID',
    field: 'sysHumanfaceId',
    component: 'Input',
  },
  {
    label: '关联实体卡',
    field: 'sysPcVipCardId',
    component: 'Input',
  },
  {
    label: '实体卡工本费',
    field: 'costOfProduction',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'cost_of_production',
    },
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
    label: '折扣',
    field: 'discount',
    component: 'InputNumber',
  },
  {
    label: '押金',
    field: 'deposit',
    component: 'InputNumber',
  },
  {
    label: '充值金额',
    field: 'recharge',
    component: 'InputNumber',
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
    label: '协议签名',
    field: 'agreementSignature',
    component: 'Input',
  },
  {
    label: '身份证号',
    field: 'idNumber',
    component: 'Input',
  },
  {
    label: '照片',
    field: 'memberPhotos',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '紧急联系人',
    field: 'urgentPeople',
    component: 'Input',
  },
  {
    label: '紧急联系人电话',
    field: 'urgentPeopleTel',
    component: 'Input',
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
