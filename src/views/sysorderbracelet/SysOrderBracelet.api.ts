import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/sysorderbracelet/sysOrderBracelet/list',
  save = '/sysorderbracelet/sysOrderBracelet/add',
  edit = '/sysorderbracelet/sysOrderBracelet/edit',
  deleteOne = '/sysorderbracelet/sysOrderBracelet/delete',
  deleteBatch = '/sysorderbracelet/sysOrderBracelet/deleteBatch',
  importExcel = '/sysorderbracelet/sysOrderBracelet/importExcel',
  exportXls = '/sysorderbracelet/sysOrderBracelet/exportXls',

  //测试接口
  editCabinetRent = '/syscabinet/sysCabinet/editCabinetRent',
  editCabinetOut = '/syscabinet/sysCabinet/editCabinetOut',
}
/**
 * 测试接口
 * @param params
 */
export const cabinetRent = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认开柜',
    content: '是否确认开柜',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.editCabinetRent, params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
export const cabinetOut = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认退柜',
    content: '是否确认退柜',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.editCabinetOut, params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
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
