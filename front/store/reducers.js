import { combineReducers } from "redux";
import { authReduser } from "./auth/reducers";
import { authFormReduser } from "./authForm/reducers";
import { notificationReduser } from "./notifications/reducers";
import { userPageReducer } from "./userPage/reducers";

export default combineReducers({
  auth: authReduser,
  authForm: authFormReduser,
  notifications: notificationReduser,
  userPage: userPageReducer,
});
