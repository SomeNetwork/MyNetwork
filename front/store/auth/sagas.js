import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "src/axios";
import { AUTH_SIGN_IN, AUTH_SIGN_UP, localSaveUser } from "./actions";
import { notificationCreate } from "store/notifications/actions";

function apiSignIn(data) {
  return axios.post("auth/signin", data).then((res) => res.me);
}

function apiSignUp(data) {
  return axios.post("auth/signUp", data).then((res) => res.me);
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

export default function* rootSaga() {
  yield all([watchSignIn(), watchSignUp()]);
}
