import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { notificationCreate } from "store/notifications/actions";
import Router from "next/router";
import { Auth, DB } from "src/api";
import IUser from "src/interfaces/User";
import { AuthActionType, IActionConfirmEmail, IActionSignIn, IActionSignOut, IActionSignUp, IActionUpdateUser } from "./types";
import { authChecked, loadUser, localSaveUser } from "./actions";
import { gotoEmailConfirm } from "store/authForm/actions";
import { NotificationVariants } from "src/interfaces/Notification";

/* SignIn */

function* workerSignIn({ payload }: IActionSignIn) {
  try {
    const data: IUser = yield call(() => Auth.SignIn(payload));
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: `Hello, ${data.username}. Successful login.`
      })
    );
    yield call(Router.push, "/");
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
    // throw error;
  }
}
export function* watchSignIn() {
  yield takeEvery(AuthActionType.AUTH_SIGN_IN, workerSignIn);
}
/* SignUP */
function* workerSignUp({ payload }: IActionSignUp) {
  try {
    // const data = yield call(() => Auth.SignUp(payload));
    yield call(() => Auth.SignUp(payload));
    // yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: `Hello, ${payload.username}. Successful registration.`,
      })
    );
    yield put(
      notificationCreate({
        variant: NotificationVariants.info,
        text: `Don't forget to confirm your mail.`,
      })
    );
    yield put(gotoEmailConfirm());

    // yield call(Router.push, "/auth");
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
    // throw error;
  }
}
export function* watchSignUp() {
  yield takeEvery(AuthActionType.AUTH_SIGN_UP, workerSignUp);
}
/* SignOUT */
function* workerSignOut({ payload }: IActionSignOut) {
  console.log("payload :>> ", payload);
  try {
    yield call(() => Auth.SignOut());
    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: `Goodbye, ${payload.username}. Successful logout.`,
      })
    );
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchSignOut() {
  yield takeEvery(AuthActionType.AUTH_SIGN_OUT, workerSignOut);
}

/* Check */
function* workerAuthCheck() {
  try {
    console.log("workerAuthCheck1");
    const data: IUser = yield call(() => Auth.AuthCheck());
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: NotificationVariants.info,
        text: `Hello, ${data.username}. We've already started to miss you.`,
      })
    );
    // yield call(Router.push, "/");
  } catch (error) {
    console.log("workerAuthCheck2");
    yield put(authChecked());
    yield put(
      notificationCreate({
        variant: NotificationVariants.info,
        text: "LogIn if you have an account, otherwise register.",
      })
    );
    // yield call(Router.push, "/auth");
  }
}
export function* watchAuthCheck() {
  yield takeEvery(AuthActionType.AUTH_CHECK, workerAuthCheck);
}

/* Update */
function* workerUserUpdate({ payload }: IActionUpdateUser) {
  try {
    console.log("UserUpdate");
    const username: IUser["username"] = yield select((state) => state.auth.user.username);
    const { user } = yield call(() =>
      DB.User.update({ username }, { ...payload })
    );
    yield put(localSaveUser(user));
    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: `Successful updated.`,
      })
    );
  } catch (error) {
    console.log("error :>> ", error);
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));

    // yield call(Router.push, "/auth");
  }
}
export function* watchUserUpdate() {
  yield takeEvery(AuthActionType.AUTH_USER_UPDATE, workerUserUpdate);
}

/* confirm */
function* workerEmailConfirm({ payload }: IActionConfirmEmail) {
  try {
    const username: IUser["username"] = yield select((state) => state.auth.user.username);
    yield call(() => Auth.EmailConfirm(username, payload.code));

    yield put(
      notificationCreate({
        variant: NotificationVariants.success,
        text: `Successful confirmed.`,
      })
    );
    yield put(loadUser());
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchEmailConfirm() {
  yield takeEvery(AuthActionType.AUTH_CONFIRM_EMAIL, workerEmailConfirm);
}

/* load */
function* workerUserLoad() {
  try {
    const data: IUser = yield call(() => Auth.AuthCheck());
    yield put(localSaveUser(data));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchUserLoad() {
  yield takeEvery(AuthActionType.AUTH_USER_LOAD, workerUserLoad);
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
