import { defHttp } from '/@/utils/http/axios';
// import { useMessage } from '/@/hooks/web/useMessage';

// const { createConfirm } = useMessage();

enum Api {
  tab = '/syscabinet/sysCabinet/dictItemById',
  list = '/syscabinet/sysCabinet/list',
  edit = '/syscabinet/sysCabinet/edit',
  add = '/syscabinet/sysCabinet/add',
  statistics = '/syscabinet/sysCabinet/getCabinetState',

  //测试接口
  editCabinetRent = '/syscabinet/sysCabinet/editCabinetRent',
  editCabinetOut = '/syscabinet/sysCabinet/editCabinetOut',
}

/**
 * 测试接口
 * @param params
 */
export const editCabinetRent = (params?) => defHttp.post({ url: Api.editCabinetRent, params });
export const editCabinetOut = (params?) => defHttp.post({ url: Api.editCabinetOut, params });

/**
 * tab接口
 * @param params
 */
export const tab = (params?) => defHttp.get({ url: Api.tab, params });
/**
 * list接口
 * @param params
 */
export const list = (params?) => defHttp.get({ url: Api.list, params });
/**
 * 编辑
 * @param params
 */
export const editList = (params) => defHttp.post({ url: Api.edit, params });
/**
 * 新增
 * @param params
 */
export const addList = (params) => defHttp.post({ url: Api.add, params });
/**
 * 统计
 * @param params
 */
export const listStatistics = () => defHttp.get({ url: Api.statistics });
// /**
//  * 删除
//  */
// export const deleteSysOrganization = (params, handleSuccess) => {
//   return defHttp.delete({ url: Api.deleteSysOrganization, params }, { joinParamsToUrl: true }).then(() => {
//     handleSuccess();
//   });
// };
// /**
//  * 批量删除
//  * @param params
//  */
// export const batchDeleteSysOrganization = (params, handleSuccess) => {
//   createConfirm({
//     iconType: 'warning',
//     title: '确认删除',
//     content: '是否删除选中数据',
//     okText: '确认',
//     cancelText: '取消',
//     onOk: () => {
//       return defHttp.delete({ url: Api.deleteSysOrganization, data: params }, { joinParamsToUrl: true }).then(() => {
//         handleSuccess();
//       });
//     },
//   });
// };
