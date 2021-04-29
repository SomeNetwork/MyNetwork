import { all, call, put, takeEvery } from "redux-saga/effects";
// import Router from "next/router";
import { DB } from "src/api";
import IUser from "src/types/User";
import { notificationCreate } from "store/notifications/actions";
import { NotificationVariants } from "store/notifications/types";
import { usersLocalSave } from "./actions";
import { UsersType } from "./type";

/* LoadUser */

function* workerUsersLoad() {
  try {
    // const data = yield call(DB.User.read, payload);
    // FIXME: put filters
    const config = {}
    // FIXME: need del type there and write in DB.User.read
    const data: IUser[] = yield call(() => DB.User.list(config));

    yield put(usersLocalSave(data));
    yield put(notificationCreate({ variant: NotificationVariants.info, text: "users loaded" }));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchUsersLoad() {
  yield takeEvery(UsersType.USERS_LOAD, workerUsersLoad);
}

export default function* rootSaga() {
  yield all([watchUsersLoad()]);
}
