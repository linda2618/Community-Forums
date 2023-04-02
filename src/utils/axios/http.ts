import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { reactive } from "vue";

interface Response<T = any> {
  code: number;
  data: T;
  message: string;
}

// 封装后的 Axios 类型
interface Axios {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

// 封装后的 Axios 实例类型
interface AxiosInstanceType extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<Response<T>>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response<T>>;
}

// 创建 Axios 实例
const instance: AxiosInstanceType = axios.create({
  baseURL: "/api",
  timeout: 8000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<Response>) => {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      console.log(response.data.message);
      return null;
    }
  },
  (error: any) => {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 将 Axios 实例进行封装
const axiosRequest: Axios = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    instance.delete(url, config),
};

// 使用 reactive 函数将 Axios 实例转化为响应式对象，方便在组件中使用
const reactiveAxios = reactive(axiosRequest);

export default reactiveAxios;
