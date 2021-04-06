import { all } from "@redux-saga/core/effects";
import watchAuth from "./auth/sagas";
import watchAuthForm from "./authForm/sagas";
import watchNotification from "./notifications/sagas";
import watchUserPage from "./userPage/sagas";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchAuthForm(),
    watchNotification(),
    watchUserPage(),
  ]);
}
