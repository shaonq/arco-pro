import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

const instance = axios.create({
  baseURL: '/',
  timeout: 1e4,
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

// logout
function logOutExit(response: AxiosResponse<HttpResponse>) {
  // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  const logoutCodes = [400];
  if (logoutCodes.includes(Number(response.data.code)) && response.config.url !== '/api/user/info') {
    Modal.error({
      title: 'Confirm logout',
      content: 'You have been logged out, you can cancel to stay on this page, or log in again',
      okText: 'Re-Login',
      async onOk() {
        clearToken();
        window.location.reload();
      },
    });
  }
}

// add response interceptors
instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    // logout
    logOutExit(response);
    if (res.code !== '200') {
      Message.error({ content: res.message || 'Error', duration: errorMessageTimeout });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({ content: error.message || 'Network Error', duration: errorMessageTimeout });
    return Promise.reject(error);
  }
);

export default instance;
