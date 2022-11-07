const getRegExp = (validatorName: string): RegExp => {
  const commonRegExp: Record<string, string> = {
    number: '/^[-]?\\d+(\\.\\d+)?$/', // 数字
    string: '/^[A-Za-z]+$/', // 字母
    stringAndNumber: '/^[A-Za-z0-9]+$/', // 数字和字母
    mobilePhone: '/^[1][0-9]{10}$/', // 手机号码
    account: '/^[A-Za-z]+[_A-Za-z\\d]*$/', // 用户名（只能包含英文字母、数字、下划线）
    noChinese: '/^[^\u4e00-\u9fa5]+$/', // 无中文
    chinese: '/^[\u4e00-\u9fa5]+$/', // 仅中文
    email: '/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$/', // 邮箱
    url: '/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/', // 网址
  };

  // eslint-disable-next-line no-eval
  return eval(commonRegExp[validatorName]);
};

export function isNull(value: unknown) {
  return value === null || value === undefined;
}

export function isRequired(value: unknown) {
  return !isNull(value) && String(value).replace(/\s/g, '') !== '';
}

export const regTest = (validatorName: string, value: any): boolean => {
  return isRequired(value) && getRegExp(validatorName).test(value);
};

//  ================================================ //
const validateFn = (validatorName: string, rule: { errorMsg: any }, value: string, callback: (arg0?: Error | undefined) => void, defaultErrorMsg: string) => {
  // 空值不校验
  if (isNull(value) || value.length <= 0) {
    callback();
    return;
  }

  const reg = getRegExp(validatorName);

  if (!reg.test(value)) {
    const errTxt = rule.errorMsg || defaultErrorMsg;
    callback(new Error(errTxt));
  } else {
    callback();
  }
};

const FormValidators = {
  /* 数字 */
  number(rule: any, value: string, callback: (arg0?: Error | undefined) => void) {
    validateFn('number', rule, value, callback, `[${rule?.label}]包含非数字字符`);
  },

  /* 字母 */
  string(rule: any, value: string, callback: (arg0?: Error | undefined) => void) {
    validateFn('string', rule, value, callback, `[${rule.label}]包含非字母字符`);
  },
  // /* 测试
  // test(rule, value, callback, errorMsg) {
  //   //空值不校验
  //   if (isNull(value) || (value.length <= 0)) {
  //     callback()
  //     return
  //   }

  //   if (value < 100) {
  //     callback(new Error('[' + rule.label + ']不能小于100'))
  //   } else {
  //     callback()
  //   }
  // },
  // */

  // regExp(rule, value, callback) {
  //   // 空值不校验
  //   if (isNull(value) || value.length <= 0) {
  //     callback();
  //     return;
  //   }

  //   const pattern = eval(rule.regExp);
  //   if (!pattern.test(value)) {
  //     let errTxt = rule.errorMsg || '[' + rule.label + ']invalid value';
  //     callback(new Error(errTxt));
  //   } else {
  //     callback();
  //   }
  // },
};

export default FormValidators;
