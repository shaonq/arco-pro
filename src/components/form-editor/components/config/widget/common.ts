// 容器的公共属性
export function defContainerOptions() {
  return {
    name: '',
    hidden: false,
  };
}

// Button 按钮公共属性
export function defButtonOptions() {
  return {
    name: '',
    label: '',
    readonly: false,
    hidden: false,
  };
}

// Input可输入类型的公共属性
export function defInputOptions() {
  return {
    name: '',
    label: '',
    // placeholder: '',
    readonly: false,
    hidden: false,
  };
}

export function createSelectOption(number = 1) {
  return { label: `选项 ${number}`, value: `value${number}` };
}
// Select类型
export function defSelectOptions() {
  return {
    name: '',
    label: '',
    optionItems: [createSelectOption(1), createSelectOption(2), createSelectOption(3)],
    // isServerData: false,
    // optionServer: '',
    // placeholder: '',
    readonly: false,
    hidden: false,
  };
}

export default null;
