import { all } from "@redux-saga/core/effects";
import watchAuth from "./auth/sagas";
import watchAuthForm from "./authForm/sagas";
import watchNotification from "./notifications/sagas";
import watchUserPage from "./userPage/sagas";
import watchUsers from "./users/sagas";
import watchConversations from "./conversations/sagas";
import watchMessenger from "./messenger/sagas";
import watchChatForm from "./chatForm/sagas";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchAuthForm(),
    watchNotification(),
    watchUserPage(),
    watchUsers(),
    watchConversations(),
    watchMessenger(),
    watchChatForm()
  ]);
}
