import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  authChecked,
  AUTH_CHECK,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_SIGN_UP,
  localSaveUser,
} from "./actions";
import { notificationCreate } from "store/notifications/actions";
import Router from "next/router";
import { Auth } from "src/api";

/* SignIn */

function* workerSignIn({ type, payload }) {
  try {
    const data = yield call(() => Auth.SignIn(payload));
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
    const data = yield call(() => Auth.SignUp(payload));
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
    const success = yield call(() => Auth.SignOut());
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
    const data = yield call(() => Auth.AuthCheck());
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
