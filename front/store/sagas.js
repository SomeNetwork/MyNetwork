import { all } from "@redux-saga/core/effects";
import watchAuth from "./auth/sagas";
import watchNotification from "./notifications/sagas";

export default function* rootSaga() {
  yield all([watchAuth(), watchNotification()]);
}
