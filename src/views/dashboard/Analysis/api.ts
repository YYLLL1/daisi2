import { defHttp } from '/@/utils/http/axios';

enum Api {
  selectHomePage = '/sysordermain/sysOrderMain/selectHomePage',
}
/**
 * 日志统计信息
 * @param params
 */
export const getSelectHomePage = (params?) => defHttp.get({ url: Api.selectHomePage, params });
