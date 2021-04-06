import { v4 as uuidv4 } from "uuid";

export const NOTIFICATION_CREATE = "NOTIFICATION_CREATE";
export const NOTIFICATION_UPDATE = "NOTIFICATION_UPDATE";
export const NOTIFICATION_CLOSE = "NOTIFICATION_CLOSE";
export const NOTIFICATION_DELETE = "NOTIFICATION_DELETE";

export const notificationCreate = (payload) => ({
  type: NOTIFICATION_CREATE,
  payload: { ...payload, id: uuidv4() },
});
export const notificationUpdate = (payload) => ({
  type: NOTIFICATION_UPDATE,
  payload,
});
export const notificationClose = (payload) => ({
  type: NOTIFICATION_CLOSE,
  payload,
});
export const notificationDelete = (payload) => ({
  type: NOTIFICATION_DELETE,
  payload,
});
