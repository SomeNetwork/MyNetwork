import { combineReducers } from "redux";
import { authReduser } from "./auth/reducers";
import { authFormReduser } from "./authForm/reducers";
import { notificationReduser } from "./notifications/reducers";
import { userPageReduser } from "./userPage/reducers";
import { usersReduser } from "./users/reducers";
import { conversationsReduser } from "./conversations/reducers";
import { messengerReduser } from "./messenger/reducers";


export default combineReducers({
  auth: authReduser,
  authForm: authFormReduser,
  notifications: notificationReduser,
  userPage: userPageReduser,
  users: usersReduser,
  conversations: conversationsReduser,
  messenger: messengerReduser,
});
