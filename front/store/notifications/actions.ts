import { v4 as uuidv4 } from "uuid";
import { TAction } from "store/types";
import { IActionClose, IActionCreateWithoutId, IActionDelete, IActionUpdate, NotificationsActionType } from "./types";

export const notificationCreate: TAction<IActionCreateWithoutId> = (payload) => ({
  type: NotificationsActionType.NOTIFICATION_CREATE,
  payload: { ...payload, id: payload.id || uuidv4() },
});
export const notificationUpdate: TAction<IActionUpdate> = (payload) => ({
  type: NotificationsActionType.NOTIFICATION_UPDATE,
  payload,
});
export const notificationClose: TAction<IActionClose> = (payload) => ({
  type: NotificationsActionType.NOTIFICATION_CLOSE,
  payload,
});
export const notificationDelete: TAction<IActionDelete> = (payload) => ({
  type: NotificationsActionType.NOTIFICATION_DELETE,
  payload,
});
