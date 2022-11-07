import { defInputOptions } from './common';

export default {
  title: '表单体',
  order: 3,
  list: [
    // {
    //   type: 'collapsePanelWd',
    //   label: '表单体',
    //   icon: 'formBody',
    //   category: 'field',
    //
    //   elementType: 'collapsePanelWd',
    //   eId: 101,
    //
    //   options: {
    //     elementType: '表单体',
    //     ...defInputOptions(),
    //     tableType: 'Table',
    //     tableName: '',
    //   },
    // },
    {
      type: 'card',
      label: '表单体',
      category: 'container',
      icon: 'icon-formbody',
      displayType: 'border-card',
      list: [],

      elementType: 'formBody',
      eId: 1002,

      options: {
        elementType: '表单体',
        name: '',
        label: '',
        code: '',
        hidden: false,
        tableType: 'Table',
        tableName: '',
      },
    },
    {
      type: 'subform',
      label: '子表单体',
      icon: 'icon-subform',
      category: 'field',

      elementType: 'subFormBody',
      eId: 102,

      options: {
        elementType: '子表单体',
        ...defInputOptions(),
        tableType: 'Table',
        tableName: '',
        entityCode: '',
      },
    },
    {
      type: 'treeFormBody',
      label: '树形表单体',
      icon: 'icon-treeform',
      category: 'field',

      elementType: 'treeFormBody',
      eId: 111,

      options: {
        elementType: '树形表单体',
        ...defInputOptions(),
        tableType: 'Table',
        tableName: '',
      },
    },
  ],
};
