import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { deepClone, getData, setData, RecordStringAny, typeName } from '@/utils/index';
import { getVFormGlobalConfig, FormViewType, createView, stringCase } from '../config/index';

interface defaultStateType extends Partial<RecordStringAny> {
  list?: FormViewType[];
  formData?: RecordStringAny | null;
  history?: {
    index: number;
    maxStep: number;
    steps: RecordStringAny[];
    isUndo?: boolean;
    isRedo?: boolean;
  };
}

const defaultState = (): defaultStateType => {
  return {
    list: [], // 拖入面板的数据集合
    formConfig: getVFormGlobalConfig(), // 表单属性
    selectedConfig: null, // 控件属性
    formData: null,
    // 保存的内容
    history: {
      // 历史记录 没有放入缓存
      index: -1, // index: 0,
      maxStep: 10,
      steps: [] as RecordStringAny[],
      isUndo: false,
      isRedo: false,
    },
  };
};
const STORE_NAME = 'formStore';

// const localStorage = useStorage(STORE_NAME, defaultState());

const useVFormStore = defineStore(STORE_NAME, {
  /**
   * =========================================================================
   * @desc 初始化
   * =========================================================================
   */
  state: (): defaultStateType => useStorage(STORE_NAME, defaultState()), // defaultState()
  /**
   * =========================================================================
   * @desc 核心属性
   * =========================================================================
   */
  getters: {
    selectedId(state: RecordStringAny): string {
      return state.selectedConfig?.id ?? '';
    },
    selectedPath(state: RecordStringAny): string {
      return state.selectedConfig?.path ?? '';
    },
  },
  actions: {
    /**
     * =========================================================================
     * @desc 核心方法
     * =========================================================================
     */
    reset() {
      this.update(defaultState());
    },
    // Update app settings
    update(partial: Partial<RecordStringAny>) {
      this.$patch(partial);
    },
    getPath(path: string, isSelected = false): RecordStringAny | undefined {
      if (!path) return undefined;
      const item = getData(this, path, undefined);
      if (isSelected) this.setSelected(item);
      return item;
    },
    setPath(path: string, value: any) {
      setData(this, path, value);
    },
    /**
     * =========================================================================
     * @desc 面板操作 拖动、双击、点击等
     * =========================================================================
     */
    onSideFieldClone(item: FormViewType): FormViewType {
      const { type, label } = item;
      if (!this.formConfig.nameOfIndex) this.formConfig.nameOfIndex = {} as Record<string, number>;
      // 记录type出现的次数
      if (!this.formConfig.nameOfIndex[type]) this.formConfig.nameOfIndex[type] = 0;
      this.formConfig.nameOfIndex[type] += 1;
      const index = this.formConfig.nameOfIndex[type];
      const newItem = createView({}, item);
      if (newItem.options) {
        const name = stringCase(type, index);
        // 如果不重复就赋值
        if (!this.formData) this.formData = {};
        if (typeName(this.formData[name]) === 'Undefined') {
          newItem.options.name = name;
        }
        newItem.options.label = stringCase(label, index);
      }
      return newItem;
    },
    onSideFieldDBclick(container: FormViewType) {
      const newCon = this.onSideFieldClone(container);
      this.list.push(newCon);
      this.setSelected(newCon);
    },
    onBodyFieldClick(item: FormViewType) {
      const newItem = this.onSideFieldClone(item);
      this.setSelected(newItem);
    },
    /**
     * =========================================================================
     * @desc 公共操作 工具条
     * =========================================================================
     */
    setSelected(selected?: FormViewType) {
      if (!selected) {
        this.clearSelected();
        return;
      }
      this.selectedConfig = selected;
      this.onHistoryChange();
    },
    clearSelected() {
      this.selectedConfig = null;
    },
    deleteSelected(itemPath?: string) {
      itemPath = itemPath || this.selectedPath;
      if (itemPath) {
        const path = itemPath.slice(0, -3);
        const index = +itemPath.slice(-2, -1);
        const list = getData(this, path, []) as FormViewType[];
        list.splice(index, 1);
        this.clearSelected();
        this.onHistoryChange();
      }
    },
    repeatSelected() {
      if (this.selectedPath) {
        const path = this.selectedPath.slice(0, -3);
        const index = +this.selectedPath.slice(-2, -1);
        const list = getData(this, path, []) as FormViewType[];
        // 多重结构重复循环替换id
        const tempLoop: (item: FormViewType) => FormViewType = (ai) => {
          const ti = this.onSideFieldClone(deepClone<FormViewType>(ai));
          if (ti.list && ti.list.length) ti.list = ti.list.map(tempLoop);
          return ti;
        };
        const newItem = tempLoop(list[index]);
        list.splice(index, 0, newItem);
        this.setSelected(newItem);
        this.onHistoryChange();
      }
    },
    /**
     * =========================================================================
     * @desc 历史记录
     * =========================================================================
     */
    onHistoryChange() {
      const { history } = this;
      const tempHistory = deepClone<defaultStateType['history']>(history);
      if (!tempHistory) return;
      const step = {
        list: deepClone(this.list),
        formConfig: deepClone(this.formConfig),
      };
      if (tempHistory.index === tempHistory.maxStep - 1) {
        tempHistory.steps.shift();
      } else {
        tempHistory.index += 1;
      }

      tempHistory.steps[tempHistory.index] = step;

      if (tempHistory.index < tempHistory.steps.length - 1) {
        tempHistory.steps = tempHistory.steps.slice(0, this.history.index + 1);
      }
      this.history = tempHistory;
      this.onHistoryClassChange();
    },
    undoHistory() {
      const { history } = this;
      if (!history.isUndo) return;
      if (history.index !== 0) {
        history.index -= 1;
      }
      this.gotoHistory();
    },
    redoHistory() {
      const { history } = this;
      if (!history.isRedo) return;
      if (history.index !== history.steps.length - 1) {
        history.index += 1;
      }
      this.gotoHistory();
    },
    gotoHistory() {
      const { history } = this;
      const { list, formConfig } = history.steps[history.index];
      this.list = list;
      this.formConfig = formConfig;
      this.onHistoryClassChange();
    },
    onHistoryClassChange() {
      const { history } = this;
      const len = history.steps.length;
      const index = history.index + 1;
      history.isUndo = index <= len && index >= 2;
      history.isRedo = index < len && index >= 1;
    },
    /**
     * =========================================================================
     * @desc 修改属性
     * =========================================================================
     */
    // 修改全局配置文件
    updateFormConfig(key: string, value: any) {
      this.formConfig[key] = value;
    },
    // 修改选中控件的属性
    updateOptions(key: string, value: any) {
      if (!this.selectedPath) return;
      this.setPath(`${this.selectedPath}.options.${key}`, value);
    },
    // 生成 formData
    updateFormValue(name: string, defaultValue: unknown) {
      if (!this.formData) this.formData = {};
      this.formData[name] = defaultValue || null;
    },
    deleteFormName(name?: string) {
      if (this.formData && name) {
        delete this.formData[name];
      }
    },
  },
});

export default useVFormStore;
