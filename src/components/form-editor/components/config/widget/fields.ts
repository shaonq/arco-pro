import { defInputOptions, defSelectOptions } from './common';

export default {
  title: '基础字段',
  order: 1,
  list: [
    {
      type: 'input',
      label: '文本',
      icon: 'icon-text',
      category: 'field',
      elementType: 'textFd',
      eId: 1,
      options: {
        elementType: '文本',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
        length: 50,
      },
    },
    {
      type: 'textarea',
      label: '大文本',
      icon: 'icon-textarea',
      category: 'field',

      elementType: 'largeTextFd',
      eId: 2,

      options: {
        elementType: '大文本',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
        length: 50,
      },
    },
    {
      type: 'input',
      label: '多语言文本',
      icon: 'icon-lang',
      category: 'field',

      elementType: 'multiLangTextFd',
      eId: 3,

      options: {
        elementType: '多语言文本',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
        length: 50,
      },
    },
    {
      type: 'number',
      label: '整数',
      icon: 'icon-text',
      category: 'field',

      elementType: 'integerFd',
      eId: 4,

      options: {
        elementType: '整数',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
        length: 50,
      },
    },
    {
      type: 'number',
      label: '小数',
      icon: 'icon-decimal',
      category: 'field',

      elementType: 'decimalFd',
      eId: 5,

      options: {
        elementType: '小数',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
        length: 50,
        scale: 2,
      },
    },
    {
      type: 'radio',
      label: '单选框',
      icon: 'icon-radio',
      category: 'field',

      elementType: 'radioFd',
      eId: 6,

      options: {
        elementType: '单选框',
        ...defSelectOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'checkbox',
      label: '复选框',
      icon: 'icon-checkbox',
      category: 'field',

      elementType: 'checkBoxFd',
      eId: 7,

      options: {
        elementType: '复选框',
        ...defSelectOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'select',
      label: '下拉列表',
      icon: 'icon-select',
      category: 'field',

      elementType: 'comboFd',
      eId: 8,

      options: {
        elementType: '下拉列表',
        ...defSelectOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'select',
      label: '多选下拉列表',
      icon: 'icon-select',
      category: 'field',

      elementType: 'multiComboFd',
      eId: 9,

      options: {
        elementType: '多选下拉列表',
        ...defSelectOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'date',
      label: '日期',
      category: 'field',
      icon: 'icon-date',

      elementType: 'dateFd',
      eId: 10,

      options: {
        elementType: '日期',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'date',
      label: '日期时间',
      category: 'field',
      icon: 'icon-datetime',

      elementType: 'datetimeFd',
      eId: 11,

      options: {
        elementType: '日期时间',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'time',
      label: '时间',
      icon: 'icon-time',
      category: 'field',

      elementType: 'timeFd',
      eId: 12,

      options: {
        elementType: '时间',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
      },
    },

    {
      type: 'time-range',
      label: '时间范围',
      category: 'field',
      icon: 'icon-timerange',
      options: {
        ...defInputOptions(),
      },
    },

    {
      type: 'date-range',
      label: '日期范围',
      category: 'field',
      icon: 'icon-daterange',
      options: {
        ...defInputOptions(),
      },
    },

    {
      type: 'switch',
      label: '开关',
      category: 'field',
      icon: 'icon-switch',
      options: {
        elementType: '开关',
        name: '',
        label: '',
      },
    },

    {
      type: 'rate',
      label: '评分',
      category: 'field',
      icon: 'icon-rate',
      options: {
        elementType: '评分',
        name: '',
        label: '',
        score: 10,
      },
    },

    {
      type: 'file-upload',
      label: '附件',
      category: 'field',
      icon: 'icon-upload',
      options: {
        elementType: '附件',
        name: '',
        label: '',
        //-------------------
        pictureMode: false, // picture-card
        // uploadTip: '',
        // showFileList: true,
        // limit: 3,
        // fileMaxSize: 5, // MB
        // fileTypes: ['doc', 'docx', 'xls', 'xlsx'],
      },
    },

    {
      type: 'rich-editor',
      label: '富文本',
      category: 'field',
      icon: 'icon-editor',
      options: {
        elementType: '富文本',
        name: '',
        label: '',
        placeholder: '',
        hidden: false,
      },
    },
  ],
};
