import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useDebounceFn } from '@vueuse/core';
import { Message, Modal } from '@/hooks/arco';
import { getToken, clearToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  count?: number;
  message: string;
  code: number | string;
  data: T;
}

export { AxiosRequestConfig, AxiosResponse };

const errorMessageTimeout = 5 * 1000;

// console.log(import.meta.env.VITE_API_BASE_URL,'地址')
export const baseURL = import.meta.env.VITE_API_BASE_URL || '/';
const instance = axios.create({
  // baseURL: '/',
  baseURL,
  // 请在单独接口上配置超时
  timeout: 10 * 1000,
  // withCredentials: true, // 表示跨域请求时是否需要使用凭证
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation

    const token = getToken();
    if (token) {
      if (!config.headers) config.headers = {};
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

// debounce logout exit message
const openLogOutExitMessageBox = useDebounceFn(() => {
  Modal.error({
    title: '登录超时',
    content: '登录已失效,点击下方按钮重新登录',
    okText: '重新登录',
    async onOk() {
      clearToken();
      // window.location.reload();
      window.location.href = '/';
    },
  });
}, 1000);
// logout
function logOutExit(response: AxiosResponse<HttpResponse>) {
  // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  const logoutCodes = [50008, 50012, 50014]; // , 400, 500
  // console.log(response.config.url);
  if (logoutCodes.includes(Number(response.data.code)) && response.config.url !== '/oss-user-center/login') {
    openLogOutExitMessageBox();
    return true;
  }
  return false;
}

// add response interceptors
instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    const errMessage = res.message || 'Error';
    // logout
    if (logOutExit(response)) {
      return Promise.reject(new Error(errMessage));
    }
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== '200') {
      Message.error({ content: errMessage, duration: errorMessageTimeout });
      return Promise.reject(new Error(errMessage));
    }
    return res;
  },
  (error) => {
    Message.error({ content: error.message || 'Network Error', duration: errorMessageTimeout });
    return Promise.reject(error);
  }
);

export default instance;
