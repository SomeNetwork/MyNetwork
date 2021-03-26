import axios from "axios";

const instance = axios.create({
  baseURL: "http://dev.localhost:3030/",
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
    console.log("success :>> ", data.success);
    return data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
