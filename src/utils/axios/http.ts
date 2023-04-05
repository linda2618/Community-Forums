import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { pa } from "element-plus/es/locale";
import message from "../message";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    message.error(error.msg);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const responseData = response.data;
    if (responseData.code == 200) {
      return responseData;
    } else if (responseData.code == 901) {
      return Promise.reject("登录超时");
    } else {
      message.error(responseData.info);
      return Promise.reject({ msg: responseData.info });
    }
  },
  (error: any) => {
    message.error(error.msg);
    return Promise.reject(error);
  }
);

interface configData {
  url: string;
  params?: any;
}
const request = (config: configData) => {
  const { url, params } = config;
  let formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key] == undefined ? "" : params[key]);
  }
  let headers = {
    "Content-Type": contentTypeForm,
    "X-Requested-With": "XMLHttpRequest",
  };
  return instance.post(url, formData);
};

export default request;
