import { call, put, takeEvery } from "redux-saga/effects";
import axios from "src/axios";
import { AUTH_SIGN_IN, localSaveUser } from "./auth/actions";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJfaWQiOiI2MDVlMGYwYTdkMGQ5MTAwNThjMDRjMTEiLCJ1c2VybmFtZSI6IkZveDEyMDkiLCJwYXNzd29yZCI6IiQyYiQxMCRnRkl5emJxYUVaSnJxNmluWWpqSHEuWFpGWlQ4dlVGZHdlY2tjejhGT0xtUHFYalp0QUFVRyIsInVwZGF0ZWRBdCI6IjIwMjEtMDMtMjZUMTY6NDI6NTAuODEzWiIsIl9fdiI6MH0=.11uZh5vYXohym9JVpSuBuaT7gpzpJQwznm0p4MxZCXs=";

function fetchData(data) {
  return axios.post("auth/signin", data).then((res) => res.me);
}
// function fetchData() {
//   return fetch("http://dev.localhost:3030/auth/me", {
//     headers: {
//       Authorization: `bearer ${token}`,
//     },
//   }).then((response) => response.json());
// }

function* workerSignIn({ type, payload }) {
  console.log("it is working", arguments);
  const data = yield call(() => fetchData(payload));
  yield put(localSaveUser(data));
}

export function* watchSignIn() {
  console.log("watchSignIn", arguments);
  yield takeEvery(AUTH_SIGN_IN, workerSignIn);
}
