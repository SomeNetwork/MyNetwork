import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  AUTHFORM_SUBMIT_EMAIL_CONFIRM,
  AUTHFORM_SUBMIT_SIGN_IN,
  AUTHFORM_SUBMIT_SIGN_UP,
  gotoSignIn,
} from "./actions";
import { signIn, signUp } from "store/auth/actions";
import { Auth } from "src/api";
import { notificationCreate } from "store/notifications/actions";

/* SignIn */

function* workerSubmitSignIn({ type, payload }) {
  try {
    yield put(signIn(payload));
    // yield put(gotoSignIn())
  } catch (error) {}
}
export function* watchSubmitSignIn() {
  yield takeEvery(AUTHFORM_SUBMIT_SIGN_IN, workerSubmitSignIn);
}
/* SignUp */
function* workerSubmitSignUp({ type, payload }) {
  try {
    yield put(signUp(payload));
  } catch (error) {}
}
export function* watchSubmitSignUp() {
  yield takeEvery(AUTHFORM_SUBMIT_SIGN_UP, workerSubmitSignUp);
}
/* EmailConfirm */
function* workerSubmitEmailConfirm({ type, payload }) {
  try {
    const { username, code } = payload;
    yield call(() => Auth.EmailConfirm(username, code));

    yield put(
      notificationCreate({
        variant: "success",
        text: "Email was successfully confirmed",
      })
    );
    yield put(gotoSignIn());
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchSubmitEmailConfirm() {
  yield takeEvery(AUTHFORM_SUBMIT_EMAIL_CONFIRM, workerSubmitEmailConfirm);
}

export default function* rootSaga() {
  yield all([
    watchSubmitSignIn(),
    watchSubmitSignUp(),
    watchSubmitEmailConfirm(),
  ]);
}
