export default {
  title: '容器控件',
  order: 0,
  list: [
    {
      type: 'grid',
      label: '栅格',
      category: 'container',
      icon: 'icon-grid',
      list: [],

      elementType: 'gridWd',
      eId: 1001,

      options: {
        elementType: '栅格',
        name: '',
        span: 2, // 行宽 24/2
        row: 1, // 列
        hidden: false,
      },
    },
    {
      type: 'tab',
      label: '标签页',
      category: 'container',
      icon: 'icon-tab',
      displayType: 'border-card',
      list: [],

      elementType: 'tabWd',
      eId: 1002,

      options: {
        elementType: '标签页',
        name: '',
        row: 1, // 页签数量
        hidden: false,
      },
    },
    {
      type: 'card',
      label: '折叠容器',
      category: 'container',
      icon: 'icon-card',
      displayType: 'border-card',
      list: [],

      elementType: 'CollapsePanelWd',
      eId: 1002,

      options: {
        elementType: '折叠容器',
        name: '',
        label: '',
        hidden: false,
      },
    },
    {
      type: 'subform',
      label: '子表单',
      icon: 'icon-subform',
      category: 'form',
      list: [],

      elementType: 'subFormBody',
      eId: 102,

      options: {
        elementType: '子表单',
        tableType: 'Table',
        tableName: '',
        entityCode: '',
      },
    },
  ],
};
