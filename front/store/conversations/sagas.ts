import { all, call, put, select, takeEvery } from "redux-saga/effects";
// import Router from "next/router";
import { DB } from "src/api";
import IConversation, { ConversationTypes } from "src/interfaces/Conversation";
import { NotificationVariants } from "src/interfaces/Notification";

import { notificationCreate } from "store/notifications/actions";
import { IRootState } from "store/types";
import { convsLoadConvs, convsLocalSave } from "./actions";
import { ConversationsType } from "./type";

type filterType = { $and: [{ type: { $eq: ConversationTypes } }, { name: { content: string } }] }
/* LOAD_CONVS */
function* workerConversationsLoad() {
  try {
    // filters: { $and: [ { type: { $eq: ConversationTypes } }, { name: { content: string } } ] },


    const filter: filterType = yield select((state: IRootState) =>
    ({
      $and: [{ type: { $eq: state.conversations.type } },
      // TODO:
      { name: { $regex: state.conversations.nameFilter.trim(), $options: 'gi' } }
        // { name: { $regex: state.conversations.nameFilter.trim(), $options: 'g' } }
        // { name: { $search: state.conversations.nameFilter.trim() } }
      ]
    })
    )
    // const data = yield call(DB.User.read, payload);

    // FIXME: put filters
    const config = { match: filter }
    // FIXME: need del type there and write in DB.User.read
    const { conversations }: { conversations: IConversation[] } = yield call(() => DB.Conversation.list(config));
    // const { conversations }: { conversations: IConversation[] } = yield call(() => DB.Conversation.list(config));

    yield put(convsLocalSave(conversations));
    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Conv loaded" }));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
  }
}
export function* watchConversationsLoad() {
  yield takeEvery(ConversationsType.CONVERSATIONS_LOAD, workerConversationsLoad);
}

/* SET_TYPE */
function* workerSetType() {
  try {
    yield put(convsLoadConvs())
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
  }
}
export function* watchSetType() {
  yield takeEvery(ConversationsType.CONVERSATIONS_SET_TYPE, workerSetType);
}

/* SET_NAME_FILTER */
function* workerSetNameFilter() {

  yield put(convsLoadConvs())

}
export function* watchSetNameFilter() {
  yield takeEvery(ConversationsType.CONVERSATIONS_SET_NAME_FILTER, workerSetNameFilter);
}
// /* LoadUser */

// function* workerConversationsLoad() {
//   try {
//     // const data = yield call(DB.User.read, payload);
//     // FIXME: put filters
//     const config = {}
//     // FIXME: need del type there and write in DB.User.read
//     const data: IConversation[] = yield call(() => DB.Conversation.list(config));

//     yield put(convsLocalSave(data));
//     yield put(notificationCreate({ variant: NotificationVariants.info, text: "Conversations loaded" }));
//   } catch (error) {
//     yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
//   }
// }
// export function* watchConversationsLoad() {
//   yield takeEvery(ConversationsType.CONVERSATIONS_LOAD, workerConversationsLoad);
// }

export default function* rootSaga() {
  yield all([
    watchConversationsLoad(),
    watchSetType(),
    watchSetNameFilter()
  ]);
}
