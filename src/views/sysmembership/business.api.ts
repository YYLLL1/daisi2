import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/syspcvipcard/sysPcVipCard/list',
  add = '/sysmembership/sysMemberShip/add',
  info = '/syscustomer/sysCustomer/selectByPhone',
}

/**
 * 卡种接口
 * @param params
 */
export const list = (params?) => defHttp.get({ url: Api.list, params });
/**
 * 根据手机号查询信息接口
 * @param params
 */
export const info = (params) => defHttp.get({ url: Api.info, params });
/**
 * 新增
 * @param params
 */
export const addList = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '提交',
    content: '是否添加票卡？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.add, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
