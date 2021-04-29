import TNotificationsActions, { INotification, NotificationsActionType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface INotificationsState extends Array<INotification> { }
export type INotificationsState = Array<INotification>

const defaultState: INotificationsState = [] as INotificationsState;

export const notificationReduser = (state = defaultState, action: TNotificationsActions): INotificationsState => {
  const { type, payload } = action;
  switch (type) {
    // case:
    case NotificationsActionType.NOTIFICATION_CREATE: {
      // FIXME: but how?
      return [...state, { ...payload as INotification }];
    }
    case NotificationsActionType.NOTIFICATION_DELETE: {
      return state.filter((toast) => toast.id !== payload.id);
    }
    case NotificationsActionType.NOTIFICATION_CLOSE: {
      const toastIdx = state.findIndex((toast) => toast.id === payload.id);
      const toast = state[toastIdx];
      const newState = [...state];
      newState[toastIdx] = { ...toast, hidden: true };
      return newState;
    }
    case NotificationsActionType.NOTIFICATION_UPDATE: {
      const toastIdx = state.findIndex((toast) => toast.id === payload.id);
      const toast = state[toastIdx];
      const newState = [...state];
      newState[toastIdx] = { ...toast, ...payload };
      return newState;
    }
  }
  return state;
};
