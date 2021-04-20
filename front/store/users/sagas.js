import { all, call, put, takeEvery } from "redux-saga/effects";
import { usersLocalSave, USERS_LOAD } from "./actions";
// import Router from "next/router";
import { DB } from "src/api";
import { notificationCreate } from "store/notifications/actions";

/* LoadUser */

function* workerUsersLoad({ type, payload }) {
  try {
    // const data = yield call(DB.User.read, payload);
    const data = yield call(() => DB.User.list(payload).then((res) => res));

    yield put(usersLocalSave(data));
    yield put(notificationCreate({ variant: "info", text: "users loaded" }));
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchUsersLoad() {
  yield takeEvery(USERS_LOAD, workerUsersLoad);
}

export default function* rootSaga() {
  yield all([watchUsersLoad()]);
}
