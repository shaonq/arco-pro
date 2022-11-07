import { defButtonOptions, defInputOptions } from './common';

export default {
  title: '基础控件',
  order: 4,
  list: [
    {
      type: 'button',
      label: '按钮',
      icon: 'icon-button',

      elementType: 'buttonWd',
      eId: 1004,

      options: {
        elementType: '按钮',
        ...defButtonOptions(),
        operationCode: '',
      },
    },
    {
      type: 'labelWd',
      label: '标签',
      icon: 'icon-label',

      elementType: 'labelWd',
      eId: 1003,

      options: {
        elementType: '标签',
        ...defButtonOptions(),
      },
    },
    {
      type: 'divider',
      label: '分割线',
      icon: 'icon-divider',

      elementType: 'cutLineWd',
      eId: 1005,

      options: {
        elementType: '分割线',
        name: '',
        label: '',
      },
    },
    {
      type: 'toolbar',
      label: '工具栏',
      icon: 'icon-toolbar',
      category: 'field',

      elementType: 'toolbarWd',
      eId: 1006,

      options: {
        elementType: '工具栏',
        ...defInputOptions(),
      },
    },
    /* {
      type: 'listFilterWd',
      label: '列表过滤器',
      icon: 'textarea-field',
      category: 'field',

      elementType: 'listFilterWd',
      eId: 1007,

      options: {
        elementType: '列表过滤器',
        ...defInputOptions(),
      },
    },
    {
      type: 'listDataGridWd',
      label: '数据列表',
      icon: 'textarea-field',
      category: 'field',

      elementType: 'listDataGridWd',
      eId: 1012,

      options: {
        elementType: '数据列表',
        ...defInputOptions(),
      },
    }, */
  ],
};
