import { ref, UnwrapRef } from 'vue';
import qs from 'query-string';
import request, { AxiosRequestConfig, AxiosResponse, HttpResponse } from '@/utils/interceptor';
import useLoading from './loading';
// use to fetch list
// Don't use async function. It doesn't work in async function.
// Use the bind function to add parameters
// example:useRequest({ url: 'https://example.com/api/v1/info', params: { id: 1 } });

export default function useRequest<T>(api: () => Promise<AxiosResponse<HttpResponse>>, defaultValue = [] as unknown as T, isLoading = true) {
  const { loading, setLoading } = useLoading(isLoading);
  const response = ref<T>(defaultValue);
  api()
    .then((res) => {
      response.value = res.data as unknown as UnwrapRef<T>;
    })
    .finally(() => {
      setLoading(false);
    });
  return { loading, data: response };
}

function useAsyncRequest<T>(config: AxiosRequestConfig, defaultValue = [] as unknown as T, isLoading = true) {
  const { loading, setLoading } = useLoading(isLoading);
  const data = ref<T>(defaultValue);
  request(config)
    .then((res) => {
      data.value = res.data as unknown as UnwrapRef<T>;
    })
    .finally(() => setLoading(false));
  return { loading, data };
}

/** promise async  */
export function useErrData<T = Record<string, any>>(config: AxiosRequestConfig): Promise<[boolean, T]> {
  return new Promise((resolve) => {
    request(config)
      .then((res) => resolve([false, res.data]))
      .catch((err) => resolve([true, err]));
  });
}
// FormData post
export function usePostForm(config: AxiosRequestConfig) {
  config.method = config.method || 'POST';
  config.data = qs.stringify(config.data || {});
  return request(config);
}

// post upload
export function useUpload(config: AxiosRequestConfig) {
  config.method = config.method || 'POST';
  config.headers = { ...(config.headers || {}), 'Content-Type': 'multipart/form-data' };
  return useAsyncRequest(config);
}

/**
 * @description example:useGet({ url: 'https://example.com/api/v1/info', (data|params): { id: 1 } });
 */
// export function useGet<T>(config: AxiosRequestConfig, defaultValue = [] as unknown as T, isLoading = true) {
//   config.method = 'GET';
//   if (!config.params && config.data) {
//     config.params = config.data;
//     delete config.data;
//   }
//   return useRequest(config, defaultValue, isLoading);
// }

// post
// export function usePost(config: AxiosRequestConfig) {
//   config.method = 'POST';
//   config.headers = { ...(config.headers || {}), 'Content-Type': 'application/json' };
//   return request(config);
// }
