import { all, call, put, select, takeEvery } from "redux-saga/effects";
// import Router from "next/router";
import { DB } from "src/api";
import IConversation from "src/interfaces/Conversation";
import IMessage from "src/interfaces/Message";
import { NotificationVariants } from "src/interfaces/Notification";
import { setupForm } from "store/chatForm/actions";
import { convsLocalSave } from "store/conversations/actions";

import { notificationCreate } from "store/notifications/actions";
import { IRootState } from "store/types";
import { messengerLoadActiveConv, messengerLocalSaveActiveConv } from "./actions";
import { IActionChooseActiveConv, IActionCreateNewMessage, IActionEventNewMessageCreated, IActionLoadActiveConv, IActionLocalSaveActiveConv, IActionSetScreen, IMessengerState, MessengerScreens, MessengersType } from "./type";
// /* LOAD_CONVS */
// function* workerConversationsLoad() {
//   try {
//     // const data = yield call(DB.User.read, payload);
//     // FIXME: put filters
//     const config = {}
//     // FIXME: need del type there and write in DB.User.read
//     const { conversations }: { conversations: IConversation[] } = yield call(() => DB.Conversation.list(config));

//     yield put(messengerLocalSaveConvs(conversations));
//     yield put(notificationCreate({ variant: NotificationVariants.info, text: "Conv loaded" }));
//   } catch (error) {
//     yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
//   }
// }
// export function* watchConversationsLoad() {
//   yield takeEvery(MessengersType.LOAD_CONVS, workerConversationsLoad);
// }
/* CHOOSE_ACTIVE_CONV */
function* workerChooseActiveConv({ payload }: IActionChooseActiveConv) {
  try {

    // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv choosed." }));
    if (payload === null)
      yield put(messengerLocalSaveActiveConv(null));
    else
      yield put(messengerLoadActiveConv(payload));

  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
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
    if (payload) {
      const { conversation }: { conversation: IConversation } = yield call(() => DB.Conversation.read({ id: payload }));
      // yield put(notificationCreate({ variant: NotificationVariants.info, text: "Active conv loaded." }));
      console.log(`conversation`, conversation)

      yield put(messengerLocalSaveActiveConv(conversation))
    }
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
  }
}
export function* watchLoadActiveConv() {
  yield takeEvery(MessengersType.CHOOSE_ACTIVE_CONV, workerLoadActiveConv);
}

function* workerLocalSaveActiveConv({ payload }: IActionLocalSaveActiveConv) {

  const conversations: IConversation[] = yield select((state: IRootState) => state.conversations.conversations)
  if (payload) {
    const convIdx = conversations.findIndex(conv => conv._id === payload._id)
    if (convIdx !== -1) {
      const newConversations = conversations.slice()
      newConversations.splice(convIdx, 1, { ...payload, messages: payload.messages.slice(0, 1) })
      yield put(convsLocalSave(newConversations))
    }
  }

}
export function* watchLocalSaveActiveConv() {
  yield takeEvery(MessengersType.LOCAL_SAVE_ACTIVE_CONV, workerLocalSaveActiveConv);
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
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
  }
}
export function* watchCreateNewMessage() {
  yield takeEvery(MessengersType.CREATE_NEW_MESSAGE, workerCreateNewMessage);
}
/* TODO: CREATE_NEW_CONVERSATION */

// TODO: WebSocket events
/* EVENT_NEW_MESSAGE_CREATED */
function* workerEventNewMessageCreated({ payload }: IActionEventNewMessageCreated) {
  const conversations: IConversation[] = yield select((state: IRootState) => state.conversations.conversations)
  const idx = conversations.findIndex((conv => conv._id === payload.conversationId))
  if (idx > -1) {
    const newConversations = conversations.slice()
    const conversation = newConversations.splice(idx, 1)[0]
    yield put(convsLocalSave([{
      ...conversation,
      messages: [payload, ...(conversation.messages || [])]
    }, ...newConversations,
    ]))

  }
  yield put(notificationCreate({ variant: NotificationVariants.info, text: "new message received " }));

}
export function* watchEventNewMessageCreated() {
  yield takeEvery(MessengersType.EVENT_NEW_MESSAGE_CREATED, workerEventNewMessageCreated);
}
/* EVENT_NEW_CONVERSATION_CREATED */
/* SET_SCREEN */
function* workerSetScreen({ payload }: IActionSetScreen) {
  switch (payload) {
    case MessengerScreens.chat:
      break
    case MessengerScreens.fromCreate:
      yield put(setupForm(null))

      break
    case MessengerScreens.formUpdate:
      {
        const conversation: IMessengerState["activeConversation"]["conversation"] = yield select((state: IRootState) => state.messenger.activeConversation.conversation)
        if (conversation) {
          const data = {
            name: conversation.name,
            avatar: conversation.avatar,
            members: conversation.members,
          }
          yield put(setupForm(data))
        }
        else
          yield put(setupForm(null))
        break
      }

  }

}
export function* watchSetScreen() {
  yield takeEvery(MessengersType.SET_SCREEN, workerSetScreen);
}
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
//     yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
//   }
// }
// export function* watchConversationsLoad() {
//   yield takeEvery(ConversationsType.CONVERSATIONS_LOAD, workerConversationsLoad);
// }

export default function* rootSaga() {
  yield all([
    // watchConversationsLoad(),
    watchChooseActiveConv(),
    watchLoadActiveConv(),
    watchLocalSaveActiveConv(),
    watchCreateNewMessage(),
    watchEventNewMessageCreated(),
    watchSetScreen()
  ]);
}


