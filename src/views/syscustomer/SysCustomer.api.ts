import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/syscustomer/sysCustomer/list',
  save = '/syscustomer/sysCustomer/add',
  edit = '/syscustomer/sysCustomer/edit',
  deleteOne = '/syscustomer/sysCustomer/delete',
  deleteBatch = '/syscustomer/sysCustomer/deleteBatch',
  importExcel = '/syscustomer/sysCustomer/importExcel',
  exportXls = '/syscustomer/sysCustomer/exportXls',
  customerCode = '/sys/fillRule/executeRuleByCode/customer_code',
  entranceGate = '/sysordermain/sysOrderMain/entranceGate',
  exitGate = '/sysordermain/sysOrderMain/exitGate',
  enterPalMarVein = '/sys/socketTest/enterPalMarVein',
}
// 模拟接口
export const entranceGate = (params, handleSuccess) => {
  return defHttp.get({ url: Api.entranceGate, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
export const exitGate = (params, handleSuccess) => {
  return defHttp.get({ url: Api.exitGate, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 列表接口
 * @param params
 */
export const enterPalMarVein = (params) => defHttp.post({ url: Api.enterPalMarVein, params });

/**
 * 生成客户编码流水地址
 * @param params
 */
export const customerCode = () => defHttp.put({ url: Api.customerCode });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
