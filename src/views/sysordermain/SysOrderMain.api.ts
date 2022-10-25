import { defHttp } from '/@/utils/http/axios';
// import { useMessage } from '/@/hooks/web/useMessage';

// const { createConfirm } = useMessage();

enum Api {
  list = '/sysordermain/sysOrderMain/selectOrderMainList',
  childrenList = '/sysordermain/sysOrderMain/querySysOrderTicketList',
  entranceGate = '/sysordermain/sysOrderMain/entranceGate',
  exitGate = '/sysordermain/sysOrderMain/exitGate',
}
/**
 * 列表接口
 * @param params
 */
export const list = (params?) => defHttp.get({ url: Api.list, params });

// 模拟接口
export const entranceGate = (params, handleSuccess) => {
  return defHttp.get({ url: Api.entranceGate, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};
export const exitGate = (params, handleSuccess) => {
  return defHttp.get({ url: Api.exitGate, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess;
  });
};

// /**
//  * 删除单个
//  */
// export const deleteOne = (params, handleSuccess) => {
//   return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
//     handleSuccess();
//   });
// };
// /**
//  * 批量删除
//  * @param params
//  */
// export const batchDelete = (params, handleSuccess) => {
//   createConfirm({
//     iconType: 'warning',
//     title: '确认删除',
//     content: '是否删除选中数据',
//     okText: '确认',
//     cancelText: '取消',
//     onOk: () => {
//       return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
//         handleSuccess();
//       });
//     },
//   });
// };
// /**
//  * 保存或者更新
//  * @param params
//  */
// export const saveOrUpdate = (params, isUpdate) => {
//   const url = isUpdate ? Api.edit : Api.save;
//   return defHttp.post({ url: url, params });
// };

// /**
//  * 根据id查询数据
//  * @param params
//  */
// export const queryDataById = (id) => defHttp.get({ url: Api.queryDataById, params: { id } });
