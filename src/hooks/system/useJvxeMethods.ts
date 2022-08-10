import { defHttp } from '/@/utils/http/axios';
import { ref, unref } from 'vue';
import { VALIDATE_FAILED, validateFormModelAndTables } from '/@/utils/common/vxeUtils';

export function useJvxeMethod(requestAddOrEdit, classifyIntoFormData, tableRefs, activeKey, refKeys, validateSubForm?) {
  const formRef = ref();
  /** 查询某个tab的数据 */
  function requestSubTableData(url, params, tab, success) {
    tab.loading = true;
    defHttp
      .get({ url, params }, { isTransformResponse: false })
      .then((res) => {
        const { result } = res;
        if (res.success && result) {
          if (Array.isArray(result)) {
            tab.dataSource = result;
          } else if (Array.isArray(result.records)) {
            tab.dataSource = result.records;
          }
        }
        typeof success === 'function' ? success(res) : '';
      })
      .finally(() => {
        tab.loading = false;
      });
  }

  /* --- handle 事件 --- */

  /** ATab 选项卡切换事件 */
  function handleChangeTabs(key) {
    // 自动重置scrollTop状态，防止出现白屏
    tableRefs[key]?.value?.resetScrollTop(0);
  }

  /** 获取所有的editableTable实例*/
  function getAllTable() {
    const values = Object.values(tableRefs);
    return Promise.all(values);
  }
  /** 确定按钮点击事件 */
  function handleSubmit() {
    /** 触发表单验证 */
    getAllTable()
      .then((tables) => {
        const values = formRef.value.getFieldsValue();
        return validateFormModelAndTables(formRef.value.validate, values, tables, formRef.value.getProps);
      })
      .then((allValues) => {
        /** 一次性验证一对一的所有子表 */
        return validateSubForm && typeof validateSubForm === 'function' ? validateSubForm(allValues) : validateAllSubOne(allValues);
      })
      .then((allValues) => {
        if (typeof classifyIntoFormData !== 'function') {
          throw throwNotFunction('classifyIntoFormData');
        }
        const formData = classifyIntoFormData(allValues);
        // 发起请求
        return requestAddOrEdit(formData);
      })
      .catch((e) => {
        if (e.error === VALIDATE_FAILED) {
          // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
          activeKey.value = e.index == null ? unref(activeKey) : refKeys.value[e.index];
        } else {
          console.error(e);
        }
      });
  }
  //校验所有子表表单
  function validateAllSubOne(allValues) {
    return new Promise((resolve) => {
      resolve(allValues);
    });
  }
  /* --- throw --- */

  /** not a function */
  function throwNotFunction(name) {
    return `${name} 未定义或不是一个函数`;
  }

  /** not a array */
  function throwNotArray(name) {
    return `${name} 未定义或不是一个数组`;
  }
  return [handleChangeTabs, handleSubmit, requestSubTableData, formRef];
}

//update-begin-author:taoyan date:2022-6-16 for: 代码生成-原生表单用
/**
 * 校验多个表单和子表table，用于原生的antd-vue的表单
 * @param activeKey 子表表单/vxe-table 所在tabs的 activeKey
 * @param refMap 子表表单/vxe-table对应的ref对象 map结构
 * 示例：
 * useValidateAntFormAndTable(activeKey, {
 *   'tableA': tableARef,
 *   'formB': formBRef
 * })
 */
export function useValidateAntFormAndTable(activeKey, refMap) {
  /**
   * 获取所有子表数据
   */
  async function getSubFormAndTableData() {
    const formData = {};
    const all = Object.keys(refMap);
    let key = '';
    for (let i = 0; i < all.length; i++) {
      key = all[i];
      const instance = refMap[key].value;
      if (instance.isForm) {
        const subFormData = await validateFormAndGetData(instance, key);
        if (subFormData) {
          formData[key + 'List'] = [subFormData];
        }
      } else {
        const arr = await validateTableAndGetData(instance, key);
        if (arr && arr.length > 0) {
          formData[key + 'List'] = arr;
        }
      }
    }
    return formData;
  }

  /**
   * 转换数据用 如果有数组转成逗号分割的格式
   * @param data
   */
  function transformData(data) {
    if (data) {
      Object.keys(data).map((k) => {
        if (data[k] instanceof Array) {
          data[k] = data[k].join(',');
        }
      });
    }
    return data;
  }

  /**
   * 子表table
   * @param instance
   * @param key
   */
  async function validateTableAndGetData(instance, key) {
    const errors = await instance.validateTable();
    if (!errors) {
      return instance.getTableData();
    } else {
      activeKey.value = key;
      // 自动重置scrollTop状态，防止出现白屏
      instance.resetScrollTop(0);
      return Promise.reject(1);
    }
  }

  /**
   * 子表表单
   * @param instance
   * @param key
   */
  async function validateFormAndGetData(instance, key) {
    try {
      const data = await instance.getFormData();
      transformData(data);
      return data;
    } catch (e) {
      activeKey.value = key;
      return Promise.reject(e);
    }
  }

  return {
    getSubFormAndTableData,
    transformData,
  };
}
//update-end-author:taoyan date:2022-6-16 for: 代码生成-原生表单用
