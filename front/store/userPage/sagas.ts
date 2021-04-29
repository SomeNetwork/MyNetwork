import { all, call, put, takeEvery } from "redux-saga/effects";
import { DB } from "src/api";
import IUser from "src/types/User";
import { localSaveUserPage } from "./actions";
// import { localSaveUser } from "store/auth/actions";
import { IActionLoad, UserPageActionType } from "./types";

/* LoadUser */

function* workerLoadUserPage({ payload }: IActionLoad) {
  try {
    // FIXME: need del type there and write in 
    const data: { user: IUser, isOwner: boolean } = yield call(DB.User.read, payload);
    yield put(localSaveUserPage(data));
  } catch (error) {
    console.log(`error`, error)
  }
}
export function* watchLoadUser() {
  yield takeEvery(UserPageActionType.USER_PAGE_LOAD, workerLoadUserPage);
}

export default function* rootSaga() {
  yield all([watchLoadUser()]);
}
