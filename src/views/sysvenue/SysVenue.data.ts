import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '场馆名字',
    align: 'center',
    dataIndex: 'venueName',
  },
  {
    title: '场馆图片',
    align: 'center',
    dataIndex: 'venuePhotos',
    customRender: render.renderImage,
  },
  {
    title: '场馆介绍',
    align: 'center',
    dataIndex: 'venueIntroduction',
  },
  {
    title: '场馆电话',
    align: 'center',
    dataIndex: 'venueTel',
  },
  {
    title: '运营时间',
    align: 'center',
    dataIndex: 'venueTime',
  },
  {
    title: '入场须知',
    align: 'center',
    dataIndex: 'venueNotice',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '场馆名字',
    field: 'venueName',
    component: 'Input',
  },
  {
    label: '场馆图片',
    field: 'venuePhotos',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '场馆介绍',
    field: 'venueIntroduction',
    component: 'Input',
  },
  {
    label: '场馆电话',
    field: 'venueTel',
    component: 'Input',
  },
  {
    label: '运营时间',
    field: 'venueTime',
    component: 'Input',
  },
  {
    label: '入场须知',
    field: 'venueNotice',
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
