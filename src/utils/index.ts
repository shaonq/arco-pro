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

export function isUrl(path: string) {
  return regexUrl.test(path);
}

export type RecordAny = Record<string, any>;

export function typeName(o: unknown) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

export function asRecordAny(target: any) {
  return target as unknown as RecordAny;
}

// deep clone
export const deepClone = <T = RecordAny | RecordAny[]>(origin: T): T => {
  try {
    return JSON.parse(JSON.stringify(origin));
  } catch (error) {
    console.log('deepClone error, please use omitObject to remove non data type keys', origin);
    return (typeName(origin) !== 'Array' ? {} : []) as unknown as T;
  }
};
// alias
export const cloneDeep = deepClone;

// omit object to keys
export function omitObject<T extends RecordAny>(obj: T, keys: string | string[] = []) {
  if (typeof keys === 'string') keys = [keys];
  const newObj: Partial<T> = Object.create({});
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) (newObj as any)[key] = obj[key];
  });
  return newObj as T;
}

// find object to keys
export function findObject<T extends RecordAny>(obj: T, keys: string | string[] = []) {
  if (typeof keys === 'string') keys = [keys];
  const newObj: Partial<T> = Object.create({});
  Object.keys(obj).forEach((key) => {
    if (keys.includes(key)) (newObj as any)[key] = obj[key];
  });
  return newObj as T;
}

// lodash.merge
export function deepMerge<T extends Partial<RecordAny>>(...objs: RecordAny[]): T {
  const result = Object.create({});
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

/**
 * @param {RecordAny[]} object  - default object array
 * @param {RecordAny[]} sources - new object array
 * @param {string} [key=id] - unique key
 * @param {boolean} [isKeepLeft=false] - 靠左保留数据
 * @returns RecordAny[]
 */
export function mergeArrayObject(object: RecordAny[], sources: RecordAny[], key = 'id', isKeepLeft = false) {
  const newList = deepClone(object).map((item, index) => {
    if (item[key] === sources[index][key]) {
      return { ...item, ...sources[index] };
    }
    return item;
  });
  if (!isKeepLeft)
    sources.forEach((item) => {
      if (!newList.some((self) => self[key] === item[key])) newList.push(item);
    });
  return newList;
}

// create uniqueId
export const getUniqueId = (): string => {
  return (Number(new Date()) + Number(String(Math.random()).slice(2, 15))).toString(32);
};

function formatStringAsArrayPath(path: string | string[]): string[] {
  if (Array.isArray(path)) return path;
  return path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}
// lodash.get
export function getData(object: RecordAny, path: string, defaultValue?: any) {
  if (typeof object !== 'object') return defaultValue;
  return formatStringAsArrayPath(path).reduce((o, k) => (o || {})[k], object) || defaultValue;
}
// lodash.set
export function setData(object: RecordAny, path: string, defaultValue?: any) {
  if (typeof object !== 'object') return object;
  formatStringAsArrayPath(path).reduce((total, value, index, _) => {
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

// create array
export function createArray(number = 1): RecordAny[] {
  if (number && number > 0) return [...Array(number)];
  return [];
}

// download
export const download = (url: string, fileName = '') => {
  if (/(chrome|safari|firefox)/g.test(navigator.userAgent.toLowerCase())) {
    const link = document.createElement('a');
    link.href = url;
    if (link.download !== undefined) {
      fileName = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }
    console.log(`download: ${fileName}`);
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  // eslint-disable-next-line no-bitwise
  if (!~url.indexOf('?')) url += '?download';
  window.open(url, '_self');
  return true;
};
export default null;
