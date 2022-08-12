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

/**
 * 添加成功
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
      return defHttp.post({ url: Api.save, data: params }, { joinParamsToUrl: true }).then((res) => {
        handleSuccess(res);
      });
    },
  });
};
