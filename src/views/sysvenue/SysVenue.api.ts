import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sysvenue/sysVenue/list',
  save = '/sysvenue/sysVenue/add',
  edit = '/sysvenue/sysVenue/edit',
  deleteOne = '/sysvenue/sysVenue/delete',
  deleteBatch = '/sysvenue/sysVenue/deleteBatch',
  importExcel = '/sysvenue/sysVenue/importExcel',
  exportXls = '/sysvenue/sysVenue/exportXls',
}

/**
 * 列表接口
 * @param params
 */
export const list = (params?) => defHttp.get({ url: Api.list, params });

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
