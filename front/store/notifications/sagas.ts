import { all, call, put, takeEvery } from "redux-saga/effects";
import { notificationClose, notificationDelete } from "./actions";
import { IActionClose, IActionCreate, NotificationsActionType } from "./types";


const delay = (time: number): Promise<null> => new Promise((resolve) => setTimeout(() => resolve(null), time));

function* workerNotifCreate({ payload }: IActionCreate) {
  yield call(delay, 30000);
  yield put(notificationClose(payload));
}

export function* watchNotifCreate() {
  yield takeEvery(NotificationsActionType.NOTIFICATION_CREATE, workerNotifCreate);
}

function* workerNotifClose({ payload }: IActionClose) {
  yield call(delay, 1000);
  yield put(notificationDelete(payload));
}

export function* watchNotifClose() {
  yield takeEvery(NotificationsActionType.NOTIFICATION_CLOSE, workerNotifClose);
}

export default function* rootSaga() {
  yield all([watchNotifCreate(), watchNotifClose()]);
}
