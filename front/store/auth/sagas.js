import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "src/axios";
import { AUTH_SIGN_IN, localSaveUser } from "./actions";
import { notificationCreate } from "store/notifications/actions";

function fetchData(data) {
  return axios.post("auth/signin", data).then((res) => res.me);
}

function* workerSignIn({ type, payload }) {
  console.log("workerSignIn", arguments);
  try {
    const data = yield call(() => fetchData(payload));
    yield put(localSaveUser(data));
    yield put(
      notificationCreate({
        variant: "success",
        text: `Hello, ${data.username}. Successful login.`,
      })
    );
  } catch (error) {
    yield put(notificationCreate({ variant: "error", text: error.message }));

    console.log("error :>> ", error);
  }
}
export function* watchSignIn() {
  console.log("watchSignIn", arguments);
  yield takeEvery(AUTH_SIGN_IN, workerSignIn);
}

export default function* rootSaga() {
  yield all([watchSignIn()]);
}
