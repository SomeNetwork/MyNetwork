import axios from "axios";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.API_PATH,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.API_PATH,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "access-control-allow-headers",
  },
  withCredentials: true,
});
// ;
export interface IResponse {
  success: boolean;
  data?: any;
  error?: Error["message"]
}

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    const data = response.data;
    if (data.success === false) {
      return Promise.reject(new Error(data.error));
    }
    return data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);



export default instance;
