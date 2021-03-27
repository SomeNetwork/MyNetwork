import { combineReducers } from "redux";
import { authReduser } from "./auth/reducers";
import { notificationReduser } from "./notifications/reducers";

export default combineReducers({
  auth: authReduser,
  notifications: notificationReduser,
});
