import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_PATH,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "access-control-allow-headers",
  },
  withCredentials: true,
});
// ;

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.success === false) {
      return Promise.reject(new Error(data.error));
    }
    return data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
