import { all, call, put, takeEvery } from "redux-saga/effects";
// import Router from "next/router";
import { DB } from "src/api";
import IConversation from "src/interfaces/Conversation";
import IMessage from "src/interfaces/Message";
import { NotificationVariants } from "src/interfaces/Notification";

import { notificationCreate } from "store/notifications/actions";
import { messengerLoadActiveConv, messengerLocalSaveActiveConv, messengerLocalSaveConvs } from "./actions";
import { IActionChooseActiveConv, IActionCreateNewMessage, IActionEventNewMessageCreated, IActionLoadActiveConv, MessengersType } from "./type";

/* LOAD_CONVS */
function* workerConversationsLoad() {
  try {
    // const data = yield call(DB.User.read, payload);
    // FIXME: put filters
    const config = {}
    // FIXME: need del type there and write in DB.User.read
    const { conversations }: { conversations: IConversation[] } = yield call(() => DB.Conversation.list(config));

    yield put(messengerLocalSaveConvs(conversations));
    yield put(notificationCreate({ variant: NotificationVariants.info, text: "Conv loaded" }));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchConversationsLoad() {
  yield takeEvery(MessengersType.LOAD_CONVS, workerConversationsLoad);
}
/* CHOOSE_ACTIVE_CONV */
function* workerChooseActiveConv({ payload }: IActionChooseActiveConv) {
  try {

    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv choosed." }));
    if (payload === null)
      yield put(messengerLocalSaveActiveConv(null));
    else
      yield put(messengerLoadActiveConv(payload));

  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchChooseActiveConv() {
  yield takeEvery(MessengersType.CHOOSE_ACTIVE_CONV, workerChooseActiveConv);
}
/* LOAD_ACTIVE_CONV */

function* workerLoadActiveConv({ payload }: IActionLoadActiveConv) {
  try {
    // const username: IUser["username"] = yield select((state) => state.messenger.user.username);

    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv start loading." }));
    const { conversation }: { conversation: IConversation } = yield call(() => DB.Conversation.read({ id: payload }));
    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv loaded." }));
    console.log(`conversation`, conversation)
    yield put(messengerLocalSaveActiveConv(conversation));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchLoadActiveConv() {
  yield takeEvery(MessengersType.CHOOSE_ACTIVE_CONV, workerLoadActiveConv);
}
/* TODO: FULL_UPLOAD_ACTIVE_CONV */
/* TODO: NEXT_MESSAGES_UPLOAD_ACTIVE_CONV */
/* TODO: CREATE_NEW_MESSAGE */
function* workerCreateNewMessage({ payload }: IActionCreateNewMessage) {
  try {
    // const username: IUser["username"] = yield select((state) => state.messenger.user.username);

    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv start loading." }));
    const { message }: { message: IMessage } = yield call(() => DB.Message.create(payload));
    // const { conversation }: { conversation: IConversation } = yield call(() => DB.Conversation.read({ id: payload }));
    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv loaded." }));
    console.log(`new message sended`, message)
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
  }
}
export function* watchCreateNewMessage() {
  yield takeEvery(MessengersType.CREATE_NEW_MESSAGE, workerCreateNewMessage);
}
/* TODO: CREATE_NEW_CONVERSATION */

// TODO: WebSocket events
/* EVENT_NEW_MESSAGE_CREATED */
function* workerEventNewMessageCreated({ payload }: IActionEventNewMessageCreated) {
  console.log(`payload`, payload)
  yield put(notificationCreate({ variant: NotificationVariants.info, text: "new message received " }));

}
export function* watchEventNewMessageCreated() {
  yield takeEvery(MessengersType.EVENT_NEW_MESSAGE_CREATED, workerEventNewMessageCreated);
}
/* EVENT_NEW_CONVERSATION_CREATED */

// EXAMPLE:
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
//     yield put(notificationCreate({ variant: NotificationVariants.error, text: error.message }));
//   }
// }
// export function* watchConversationsLoad() {
//   yield takeEvery(ConversationsType.CONVERSATIONS_LOAD, workerConversationsLoad);
// }

export default function* rootSaga() {
  yield all([
    watchConversationsLoad(),
    watchChooseActiveConv(),
    watchLoadActiveConv(),
    watchCreateNewMessage(),
    watchEventNewMessageCreated()
  ]);
}


