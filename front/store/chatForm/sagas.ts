import { IUpdateResponse } from "@api/db/conversation";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { Bucket, DB } from "src/api";
import IConversation, { ConversationTypes, INewConversationData } from "src/interfaces/Conversation";
import { NotificationVariants } from "src/interfaces/Notification";
import { messengerChooseActiveConv, messengerSetScreen } from "store/messenger/actions";
import { MessengerScreens } from "store/messenger/type";
import { notificationCreate } from "store/notifications/actions";
import { IRootState } from "store/types";
import { avatarLocalNotSaved, avatarLocalSaved, setLoading, setupForm } from "./actions";
import { ChatFormActionType, IActionAvatarChange, IChatFormState } from "./types";

/* Submit */

function* workerAvatarChange({ payload }: IActionAvatarChange) {
  try {
    yield put(notificationCreate({ variant: NotificationVariants.info, text: "start" }));
    const src: IChatFormState["avatar"]["src"] = yield call(Bucket.localSave, payload);
    yield put(avatarLocalSaved(src))
    yield put(notificationCreate({ variant: NotificationVariants.info, text: "saved" }));
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.warning, text: (error as Error).message }));
    yield put(avatarLocalNotSaved())

  }
}
export function* watchAvatarChange() {
  yield takeEvery(ChatFormActionType.CHAT_FORM_AVATAR_CHANGE, workerAvatarChange);
}

function* workerFormSubmit() {

  try {
    const isValid: IChatFormState["isValid"] = yield select((state: IRootState) => state.chatForm.isValid);
    const formType: MessengerScreens = yield select((state: IRootState) => state.messenger.screen);
    if (isValid) {
      yield put(setLoading(true))
      if (formType === MessengerScreens.fromCreate) {
        const data: INewConversationData = yield select((state: IRootState) => {
          const data: INewConversationData = {
            name: state.chatForm.name.value,
            ownerId: state.auth.user._id,
            type: ConversationTypes.group
          };
          if (state.chatForm.avatar.src) data.avatar = state.chatForm.avatar.src;
          if (state.chatForm.members.length > 0) data.members = state.chatForm.members
          // if (state.chatForm.members.length > 0) data.members = state.chatForm.members.map(m => m._id);
          return data
        });
        const res: IConversation = yield call(DB.Conversation.create, data);
        yield put(messengerSetScreen(MessengerScreens.chat))
        yield put(messengerChooseActiveConv(res._id))
        yield put(setupForm(null))
      }
      else if (formType === MessengerScreens.formUpdate) {
        const oldData: IConversation = yield select((state: IRootState) => state.messenger.activeConversation.conversation)
        const newData: IConversation = yield select((state: IRootState) => {
          const data: IConversation = {
            ...oldData,
            name: state.chatForm.name.value,
            // ownerId: state.auth.user._id,
            // type: ConversationTypes.group
          };
          if (state.chatForm.avatar.src) data.avatar = state.chatForm.avatar.src;
          if (state.chatForm.members.length > 0) data.members = state.chatForm.members
          return data
        });
        const { conv }: IUpdateResponse["data"] = yield call(DB.Conversation.update, oldData, newData);
        yield put(notificationCreate({ variant: NotificationVariants.info, text: `Chat ${conv.name} updated` }));
        yield put(messengerSetScreen(MessengerScreens.chat))
        yield put(messengerChooseActiveConv(conv._id))
        // yield put(setupForm(null))
      }
    }
  } catch (error) {
    yield put(notificationCreate({ variant: NotificationVariants.error, text: (error as Error).message }));
  }
  yield put(setLoading(false))

}
export function* watchFormSubmit() {
  yield takeEvery(ChatFormActionType.CHAT_FORM_SUBMIT, workerFormSubmit);
}

export default function* rootSaga() {
  yield all([
    watchFormSubmit(),
    watchAvatarChange()
    // watchFormSubmited()
  ]);
}
