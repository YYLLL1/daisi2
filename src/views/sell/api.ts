import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/systicket/sysTicket/list',
  // 待付款
  save = '/sysordermain/sysOrderMain/add',
  // 已付款
  payOrder = '/sysordermain/sysOrderMain/payOrder',

  saveBind = '/sysordermain/sysOrderMain/bindingOrderTicket',
  braceletNo = '/sysbracelet/sysBracelet/queryBraceletNo',

  //测试接口
  cabinetRent = '/sysordermain/sysOrderMain/bindingOrderTicket',
  cabinetOut = '/sysordermain/sysOrderMain/unboundOrderTicket',
  cabinetPhone = '/sysordermain/sysOrderMain/bindingBraceletByPhone',
}
/**
 * 测试接口
 * @param params
 */
export const cabinetRent = (params, handleSuccess) => {
  return defHttp.post({ url: Api.cabinetRent, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
export const cabinetOut = (params, handleSuccess) => {
  return defHttp.post({ url: Api.cabinetOut, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
export const cabinetPhone = (params, handleSuccess) => {
  return defHttp.post({ url: Api.cabinetPhone, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};

/**
 * 列表接口
 * @param params
 */
export const list = () => defHttp.get({ url: Api.list });
/**
 * 列表接口
 * @param params
 */
export const getBraceletNo = () => defHttp.get({ url: Api.braceletNo });
/**
 * 待支付
 * @param params
 */

export const save = (params, handleSuccess) => {
  return defHttp.post({ url: Api.save, params }, { joinParamsToUrl: true }).then((res) => {
    handleSuccess(res);
  });
};
/**
 * 添加成功
 * @param params
 */
export const payOrder = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认提交',
    content: '是否提交选中票种？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.payOrder, data: params }, { joinParamsToUrl: true }).then((res) => {
        handleSuccess(res);
      });
    },
  });
};

/**
 * 提交绑定信息
 * @param params
 */
export const saveBind = (params) => {
  createConfirm({
    iconType: 'warning',
    title: '确认提交',
    content: '是否提交绑定信息？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.saveBind, data: params }, { joinParamsToUrl: true });
    },
  });
};
