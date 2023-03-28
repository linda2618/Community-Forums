import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { ElLoading } from "element-plus";
import message from "../message";

interface CustomConfig {
  showLoading?: boolean;
  errorCallback?: Function;
  showError?: boolean;
}

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 8000,
});

//请求拦截
let loading: any = null;
instance.interceptors.request.use(
  (config): any => {
    const { showLoading } = config as any;
    if (showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: "加载中......",
        background: "rgb(0, 0, 0, .5)",
      });
    }
    return config;
  },
  (error) => {
    loading.close();
    return Promise.reject(error);
  }
);

//响应拦截
instance.interceptors.response.use(
  (response): any => {
    const { showLoading, errorCallback, showError } = response.config as any;
    if (showLoading && loading) {
      loading.close();
    }
    return response;
  },
  (error) => {
    const { errorCallback, showError, showLoading } = error.config as any;
    if (showError) {
      message.error(error.message);
    }
    if (errorCallback) {
      errorCallback(error);
    }
    return Promise.reject(error);
  }
);

const request = (config: any) => {
  const {
    url,
    params,
    dataType,
    errorCallback,
    showLoading = true,
    showError = true,
  } = config;
  let contentType = "application/x-www-form-urlencoded;charset=UTF-8";
  let formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key] == undefined ? "" : params[key]);
  }
  if (dataType != null && dataType === "json") {
    contentType = "application/json";
  }
  let headers = {
    "Content-Type": contentType,
    "X-Requested-With": "XMLHttpRequest",
  };
  return instance.post(url, formData, {
    headers: headers,
    ...config, // 将自定义属性从参数对象中取出
  });
};

export default request;

// import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";

// import { ElLoading } from "element-plus";
// import message from "../message";

// interface CustomConfig {
//   showLoading?: boolean;
//   errorCallback?: Function;
//   showError?: boolean;
// }

// const customConfig: CustomConfig = {
//   showLoading: true,
//   errorCallback: () => {},
//   showError: true,
// };

// const axiosConfig: AxiosRequestConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "application/x-www-form-urlencoded;charset=UTF-8",
//   },
//   ...customConfig, // 将自定义属性从参数对象中取出
// } as AxiosRequestConfig<FormData>;
// const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
// const contentTypeJson = "application/json";

// const instance = axios.create({
//   baseURL: "/api",
//   timeout: 8000,
// });

// //请求拦截
// let loading: any = null;
// instance.interceptors.request.use(
//   (config): any => {
//     if ((config as any).showLoading) {
//       loading = ElLoading.service({
//         lock: true,
//         text: "加载中......",
//         background: "rgb(0, 0, 0, .5)",
//       });
//     }
//   },
//   (error) => {
//     loading.close();
//   }
// );

// //响应拦截
// instance.interceptors.response.use(
//   (response): any => {
//     const { showLoading, errorCallback, showError } = response.config as any;
//     if (showLoading && loading) {
//       loading.close();
//     }
//   },
//   (error) => {}
// );

// const request = (config: any) => {
//   const {
//     url,
//     params,
//     dataType,
//     errorCallback,
//     showLoading = true,
//     showError = true,
//   } = config;
//   let contentType = contentTypeForm;
//   let formData = new FormData();
//   for (let key in params) {
//     formData.append(key, params[key] == undefined ? "" : params[key]);
//   }
//   if (dataType != null && dataType === "json") {
//     contentType = contentTypeJson;
//   }
//   let headers = {
//     "Content-Type": contentType,
//     "X-Requested-With": "XMLHttpRequest",
//   };
//   return instance
//     .post(url, formData, {
//       headers: headers,
//       showLoading: showLoading,
//       errorCallback: errorCallback,
//       showError: showError,
//     })
//     .catch((error) => {
//       if (error.showError) {
//         message.error(error.msg);
//       }
//     });
// };

// export default request;
