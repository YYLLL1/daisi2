import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/systicket/sysTicket/list',
  save = '/sysordermain/sysOrderMain/add',
}
/**
 * 列表接口
 * @param params
 */
export const list = () => defHttp.get({ url: Api.list });

// /**
//  * 删除单个
//  */
// export const deleteOne = (params, handleSuccess) => {
//   return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
//     handleSuccess();
//   });
// };
/**
 * 批量删除
 * @param params
 */
export const save = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认提交',
    content: '是否提交选中票种',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.save, data: params }, { joinParamsToUrl: true }).then(() => {
        // console.log(res);
        handleSuccess();
      });
    },
  });
};
// /**
//  * 保存或者更新
//  * @param params
//  */
// export const saveOrUpdate = (params, isUpdate) => {
//   const url = isUpdate ? Api.edit : Api.save;
//   return defHttp.post({ url: url, params });
// };
