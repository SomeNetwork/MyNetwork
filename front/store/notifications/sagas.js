import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  notificationClose,
  notificationDelete,
  NOTIFICATION_CLOSE,
  NOTIFICATION_CREATE,
} from "./actions";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* workerNotifCreate({ type, payload }) {
  yield call(delay, 30000);
  yield put(notificationClose(payload));
}

export function* watchNotifCreate() {
  yield takeEvery(NOTIFICATION_CREATE, workerNotifCreate);
}

function* workerNotifClose({ type, payload }) {
  yield call(delay, 1000);
  yield put(notificationDelete(payload));
}

export function* watchNotifClose() {
  yield takeEvery(NOTIFICATION_CLOSE, workerNotifClose);
}

export default function* rootSaga() {
  yield all([watchNotifCreate(), watchNotifClose()]);
}
