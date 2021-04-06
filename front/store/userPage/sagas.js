import { all, call, put, takeEvery } from "redux-saga/effects";
import { USER_PAGE_LOAD, localSaveUserPage } from "./actions";
// import Router from "next/router";
import { DB } from "src/api";

/* LoadUser */

function* workerLoadUserPage({ type, payload }) {
  try {
    // debugger;
    // const data = yield call(DB.User.read, payload);
    const data = yield call(() => DB.User.read(payload).then((res) => res));
    yield put(localSaveUserPage(data));
  } catch (error) {
    // yield put(notificationCreate({ variant: "error", text: error.message }));
  }
}
export function* watchLoadUser() {
  yield takeEvery(USER_PAGE_LOAD, workerLoadUserPage);
}

export default function* rootSaga() {
  yield all([watchLoadUser()]);
}
