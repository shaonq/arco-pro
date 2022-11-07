import { defInputOptions } from './common';

export default {
  title: '业务字段',
  order: 2,
  list: [
    {
      type: 'input',
      label: '基础数据',
      icon: 'icon-basedata',
      category: 'field',

      elementType: 'relationFd',
      eId: 103,

      options: {
        elementType: '基础数据',
        ...defInputOptions(),

        fdName: '',
        required: false,
        defVal: '',
        sourceFormCode: '',
      },
    },
    {
      type: 'input',
      label: '多选基础数据',
      icon: 'icon-basedata2',
      category: 'field',

      elementType: 'multiRelationFd',
      eId: 104,

      options: {
        elementType: '多选基础数据',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
        sourceFormCode: '',
      },
    },
    {
      type: 'input',
      label: '用户',
      icon: 'icon-user',
      category: 'field',

      elementType: 'userSelectFd',
      eId: 105,

      options: {
        elementType: '用户',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
      },
    },
    {
      type: 'input',
      label: '多选用户',
      icon: 'icon-user2',
      category: 'field',

      elementType: 'multiUserSelectFd',
      eId: 105,

      options: {
        elementType: '多选用户据',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
      },
    },
    {
      type: 'input',
      label: '组织',
      icon: 'icon-organize',
      category: 'field',

      elementType: 'orgSelectFd',
      eId: 106,

      options: {
        elementType: '组织',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
      },
    },
    {
      type: 'input',
      label: '多选组织',
      icon: 'icon-organize2',
      category: 'field',

      elementType: 'multiOrgSelectFd',
      eId: 108,

      options: {
        elementType: '多选组织',
        ...defInputOptions(),
        fdName: '',
        required: false,
        defVal: '',
      },
    },
  ],
};
