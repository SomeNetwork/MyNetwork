import { all, call, put, takeEvery } from "redux-saga/effects";
// import Router from "next/router";
import { DB } from "src/api";
import IConversation from "src/interfaces/Conversation";
import { NotificationVariants } from "src/interfaces/Notification";

import { notificationCreate } from "store/notifications/actions";
import { convsLocalSave } from "./actions";
import { ConversationsType } from "./type";

/* LoadUser */

function* workerConversationsLoad() {
  try {
    // const data = yield call(DB.User.read, payload);
    // FIXME: put filters
    const config = {}
    // FIXME: need del type there and write in DB.User.read
    const data: IConversation[] = yield call(() => DB.Conversation.list(config));

    yield put(convsLocalSave(data));
    yield put(notificationCreate({ variant: NotificationVariants.info, text: "Conversations loaded" }));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchConversationsLoad() {
  yield takeEvery(ConversationsType.CONVERSATIONS_LOAD, workerConversationsLoad);
}

export default function* rootSaga() {
  yield all([watchConversationsLoad()]);
}
