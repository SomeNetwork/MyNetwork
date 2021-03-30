import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "src/axios";
import {
  authChecked,
  AUTH_CHECK,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_SIGN_UP,
  localSaveUser,
  signOut,
} from "./actions";
import { notificationCreate } from "store/notifications/actions";
import Router from "next/router";

function apiSignIn(data) {
  return axios.post("auth/signin", data).then((res) => res.me);
}

function apiSignUp(data) {
  return axios.post("auth/signup", data).then((res) => res.me);
}
function apiSignOut() {
  return axios.post("auth/signout").then((res) => res.success);
}

function apiAuthCheck() {
  return axios.get("auth/me").then((res) => res.me);
}

/* SignIn */

function* workerSignIn({ type, payload }) {
  try {
    const data = yield call(() => apiSignIn(payload));
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: "success",
        text: `Hello, ${data.username}. Successful login.`,
      })
    );
    yield call(Router.push, "/");
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, workerSignIn);
}
/* SignUP */
function* workerSignUp({ type, payload }) {
  try {
    const data = yield call(() => apiSignUp(payload));
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: "success",
        text: `Hello, ${data.username}. Successful registration.`,
      })
    );
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, workerSignUp);
}
/* SignOUT */
function* workerSignOut({ type, payload }) {
  console.log("payload :>> ", payload);
  try {
    const success = yield call(() => apiSignOut());
    yield put(
      notificationCreate({
        variant: "success",
        text: `Goodbye, ${payload.username}. Successful logout.`,
      })
    );
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchSignOut() {
  yield takeEvery(AUTH_SIGN_OUT, workerSignOut);
}

/* Check */
function* workerAuthCheck({ type, payload }) {
  try {
    console.log("workerAuthCheck1");
    const data = yield call(() => apiAuthCheck());
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: "info",
        text: `Hello, ${data.username}. We've already started to miss you.`,
      })
    );
    // yield call(Router.push, "/");
  } catch (error) {
    console.log("workerAuthCheck2");
    yield put(authChecked());
    yield put(
      notificationCreate({
        variant: "info",
        text: "LogIn if you have an account, otherwise register.",
      })
    );
    // yield call(Router.push, "/auth");
  }
}
export function* watchAuthCheck() {
  yield takeEvery(AUTH_CHECK, workerAuthCheck);
}

export default function* rootSaga() {
  yield all([watchSignIn(), watchSignUp(), watchSignOut(), watchAuthCheck()]);
}
