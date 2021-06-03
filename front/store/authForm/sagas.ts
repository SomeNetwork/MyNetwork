import { all, call, put, takeEvery } from "redux-saga/effects";
import { signIn, signUp } from "store/auth/actions";
import { Auth } from "src/api";
import { notificationCreate } from "store/notifications/actions";
import { AuthFormActionType, IActionSubmitEmailConfirm, IActionSubmitSendCode, IActionSubmitSignIn, IActionSubmitSignUp } from "./types";
import { gotoEmailConfirm, gotoSignIn } from "./actions";
import { NotificationVariants } from "src/interfaces/Notification";

/* SignIn */

function* workerSubmitSignIn({ payload }: IActionSubmitSignIn) {
  try {
    yield put(signIn(payload));
    // yield put(gotoSignIn())
  } catch (error) {
    console.log(`error`, error);
  }
}
export function* watchSubmitSignIn() {
  yield takeEvery(AuthFormActionType.AUTHFORM_SUBMIT_SIGN_IN, workerSubmitSignIn);
}
/* SignUp */
function* workerSubmitSignUp({ payload }: IActionSubmitSignUp) {
  try {
    yield put(signUp(payload));
  } catch (error) {
    console.log(`error`, error);
  }
}
export function* watchSubmitSignUp() {
  yield takeEvery(AuthFormActionType.AUTHFORM_SUBMIT_SIGN_UP, workerSubmitSignUp);
}
/* EmailConfirm */
function* workerSubmitEmailConfirm({ payload }: IActionSubmitEmailConfirm) {
  try {
    const { username, code } = payload;
    yield call(() => Auth.EmailConfirm(username, code));

    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: "Email was successfully confirmed",
      })
    );
    yield put(gotoSignIn());
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchSubmitEmailConfirm() {
  yield takeEvery(AuthFormActionType.AUTHFORM_SUBMIT_EMAIL_CONFIRM, workerSubmitEmailConfirm);
}
/* CodeSend */
function* workerCodeSend({ payload }: IActionSubmitSendCode) {
  try {
    const { username } = payload;
    yield call(() => Auth.EmailConfirmationCodeResend(username));

    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: "Code successfully sended",
      })
    );
    yield put(gotoEmailConfirm());
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchCodeSend() {
  yield takeEvery(AuthFormActionType.AUTHFORM_SUBMIT_SEND_CODE, workerCodeSend);
}

export default function* rootSaga() {
  yield all([
    watchSubmitSignIn(),
    watchSubmitSignUp(),
    watchSubmitEmailConfirm(),
    watchCodeSend(),
  ]);
}
