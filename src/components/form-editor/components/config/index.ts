import { RecordStringAny, deepMerge, getUniqueId } from '@/utils/index';
import { Icon } from '@arco-design/web-vue';

export const FormFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_3746654_xv623vygf29.js' });

export interface FormViewType extends Partial<RecordStringAny> {
  type: string; // 类别
  label: string; // 名称
  category?: string; // 类型
  options?: RecordStringAny;
  list?: FormViewType[];
  id?: string; // 唯一标识
  path?: string; // path
}
// 表单全局属性
export function getVFormGlobalConfig() {
  return {
    elementType: '',
    code: '',
    name: '',
    tableType: '',
    tableName: '',
    // modelName: 'formData',
    // refName: 'form',
    // rulesName: 'rules',
    size: 'medium',
    labelWidth: 100,
    labelPosition: 'horizontal',
    labelAlign: 'align',
    nameOfIndex: null,
  };
}
/**
 * @desc 衍生容器基础配置
 */
export const view: FormViewType = {
  type: 'view', // 类型为view为子容器，不可单独编辑，容器工具条功能受限
  label: '容器',
  category: 'container',
  list: [],
  options: {
    label: '容器',
    name: '',
    hidden: false,
  },
};

/**
 * @desc 通用options 配置
 */
export function createDefaultOptions(opts = {}) {
  return deepMerge(
    {
      hidden: false, // 影藏显示
    },
    opts
  ) as FormViewType['options'];
}

export function stringCase(str: string, num: number | string): string {
  let tmp = str.toLowerCase();
  tmp = tmp.slice(0, 1).toUpperCase() + tmp.slice(1);
  return tmp + num;
}

/**
 * @desc 创建容器
 */
export function createView(opts = {}, defView = view): FormViewType {
  const newItem = deepMerge(defView, opts) as FormViewType;
  // newItem.id = `${newItem.type.replace(/-/g, '')}_${getUniqueId()}`;
  newItem.id = stringCase(`${newItem.type}_`, getUniqueId());
  if (!newItem.options) newItem.options = {};
  newItem.options.name = newItem.id;
  if (newItem.options.label !== undefined) newItem.options.label = newItem.label;
  return newItem;
}

// 创建路径
export function createPath(path?: string | null, index?: number) {
  const pathStr = path ? `${path}.` : '';
  const keyStr = 'list';
  const indexStr = index !== undefined ? `[${index}]` : '';
  return `${pathStr}${keyStr}${indexStr}`;
}

// 只读控件
export function isReadonlyView(item: any): boolean {
  return item?.type && item?.type !== 'view';
}

// 读取可拖入控件配置
type FormSidePanelOptionsType = { title: string; order: number; list: FormViewType[] };
const FormSidePanelModules = import.meta.globEager('./widget/*.ts');
const FormSidePanelOptions: FormSidePanelOptionsType[] = [];
Object.keys(FormSidePanelModules).forEach((key) => {
  const defaultModule: FormSidePanelOptionsType = FormSidePanelModules[key].default;
  if (key.indexOf('widget/common.ts') !== -1) return;
  if (defaultModule) FormSidePanelOptions.push(defaultModule);
});
FormSidePanelOptions.sort((a, b) => a.order - b.order);
export { FormSidePanelOptions };
