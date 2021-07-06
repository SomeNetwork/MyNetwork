import _axios from "./axios";
import _Auth from "./auth";
import _Bucket from "./bucket";
import _DB from "./db";
import _WS from "./ws";

export const Auth = _Auth;
export const Bucket = _Bucket;
export const DB = _DB;
export const req = _axios;


const Api = {
  req: _axios,
  Auth: _Auth,
  Bucket: _Bucket,
  DB: _DB,
  WS: _WS,
};
export default Api;
