type TargetContext = '_self' | '_parent' | '_blank' | '_top';
export const openWindow = (url: string, opts?: { target?: TargetContext; [key: string]: any }) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);
export type RecordStringAny = Record<string, any>;

export function typeName(o: unknown) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

export function asHTMLElement(target: any) {
  return target as RecordStringAny;
}

// 格式化数据
export const deepClone = <T = RecordStringAny | RecordStringAny[]>(origin: T): T => {
  return JSON.parse(JSON.stringify(origin));
};

// 合并数据 | _.merge
export function deepMerge<T extends RecordStringAny>(...objs: T[]): T {
  const result = Object.create(null);
  deepClone(objs).forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (typeName(val) === 'Object') {
          if (result[key]) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}

// 读取唯一id
export const getUniqueId = (): string => {
  return (Number(new Date()) + Number(String(Math.random()).slice(2, 15))).toString(32);
};

// getData setData | _.get _.set
function baseSet(path: any): string[] {
  if (Array.isArray(path)) return path;
  return path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}
export function getData(object: RecordStringAny, path: string, defaultValue?: any) {
  if (typeof object !== 'object') return defaultValue;
  return baseSet(path).reduce((o, k) => (o || {})[k], object) || defaultValue;
}
export function setData(object: RecordStringAny, path: string, defaultValue?: any) {
  if (typeof object !== 'object') return object;
  baseSet(path).reduce((total, value, index, _) => {
    if (index === _.length - 1) {
      total[value] = defaultValue;
      return null;
    }
    if (value in total) return total[value];
    total[value] = /^[0-9]{1,}$/.test(_[index + 1]) ? [] : {};
    return total[value];
  }, object);
  return object;
}

// 创建数组
export function createArray(number = 1): RecordStringAny[] {
  if (number && number > 1) return [...Array(number)];
  return [];
}

export default null;
