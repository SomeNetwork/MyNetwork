import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  authCheck,
  authChecked,
  AUTH_CHECK,
  AUTH_CONFIRM_ACCAUNT,
  AUTH_CONFIRM_EMAIL,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_SIGN_UP,
  AUTH_USER_LOAD,
  AUTH_USER_UPDATE,
  loadUser,
  localSaveUser,
} from "./actions";
import { notificationCreate } from "store/notifications/actions";
import Router from "next/router";
import { Auth, DB } from "src/api";
import { gotoEmailConfirm, gotoSignIn } from "store/authForm/actions";

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
    // throw error;
  }
}
export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, workerSignIn);
}
/* SignUP */
function* workerSignUp({ type, payload }) {
  try {
    const data = yield call(() => Auth.SignUp(payload));
    // yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: "success",
        text: `Hello, ${payload.username}. Successful registration.`,
      })
    );
    yield put(
      notificationCreate({
        variant: "info",
        text: `Don't forget to confirm your mail.`,
      })
    );
    yield put(gotoEmailConfirm());

    // yield call(Router.push, "/auth");
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
    // throw error;
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

/* Update */
function* workerUserUpdate({ type, payload }) {
  try {
    console.log("UserUpdate");
    const username = yield select((state) => state.auth.username);
    const { user } = yield call(() =>
      DB.User.update({ username }, { ...payload })
    );
    yield put(localSaveUser(user));
    yield put(
      notificationCreate({
        variant: "success",
        text: `Successful updated.`,
      })
    );
  } catch (error) {
    console.log("error :>> ", error);
    yield put(notificationCreate({ variant: "error", text: error.message }));

    // yield call(Router.push, "/auth");
  }
}
export function* watchUserUpdate() {
  yield takeEvery(AUTH_USER_UPDATE, workerUserUpdate);
}

/* confirm */
function* workerEmailConfirm({ type, payload }) {
  try {
    const username = yield select((state) => state.auth.username);
    const user = yield call(() => Auth.EmailConfirm(username, payload.code));

    yield put(
      notificationCreate({
        variant: "success",
        text: `Successful confirmed.`,
      })
    );
    yield put(loadUser());
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchEmailConfirm() {
  yield takeEvery(AUTH_CONFIRM_EMAIL, workerEmailConfirm);
}

/* load */
function* workerUserLoad({ type, payload }) {
  try {
    const data = yield call(() => Auth.AuthCheck());
    yield put(localSaveUser(data));
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchUserLoad() {
  yield takeEvery(AUTH_USER_LOAD, workerUserLoad);
}

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
    watchUserLoad(),
    watchAuthCheck(),
    watchUserUpdate(),
    watchEmailConfirm(),
  ]);
}
