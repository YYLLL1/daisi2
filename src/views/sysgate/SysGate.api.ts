import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sysgate/sysGate/list',
  edit = '/sysgate/sysGate/edit',
  add = '/sysgate/sysGate/add',
  delete = '/sysgate/sysGate/delete',
  statistics = '/sysgate/sysGate/getGateState',
}
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
export const listStatistics = () => defHttp.get({ url: Api.statistics });
