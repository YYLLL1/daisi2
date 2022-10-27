import { defHttp } from '/@/utils/http/axios';

enum Api {
  tab = '/syscabinet/sysCabinet/dictItemById',
  list = '/syscabinet/sysCabinet/list',
  edit = '/syscabinet/sysCabinet/edit',
  add = '/syscabinet/sysCabinet/add',
  delete = '/syscabinet/sysCabinet/delete',
  statistics = '/syscabinet/sysCabinet/getCabinetState',

  //测试接口
  editCabinetRent = '/syscabinet/sysCabinet/editCabinetRent',
  editCabinetOut = '/syscabinet/sysCabinet/editCabinetOut',
}

/**
 * 测试接口
 * @param params
 */
export const editCabinetRent = (params, handleSuccess) => {
  return defHttp.post({ url: Api.editCabinetRent, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
export const editCabinetOut = (params, handleSuccess) => {
  return defHttp.post({ url: Api.editCabinetOut, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};

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
export const editList = (params, handleSuccess) => {
  return defHttp.post({ url: Api.edit, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
/**
 * 删除
 * @param params
 */
export const deleteList = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
/**
 * 新增
 * @param params
 */
export const addList = (params, handleSuccess) => {
  return defHttp.post({ url: Api.add, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
/**
 * 统计
 * @param params
 */
export const listStatistics = (params) => defHttp.get({ url: Api.statistics, params });
