// import { v4 as uuidv4 } from "uuid";
import {
  NOTIFICATION_CREATE,
  NOTIFICATION_DELETE,
  NOTIFICATION_CLOSE,
  NOTIFICATION_UPDATE,
} from "./actions";

const defaultState = [];

export const notificationReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case:
    case NOTIFICATION_CREATE: {
      // return [...state, { ...payload, id: uuidv4() }];
      return [...state, { ...payload }];
    }
    case NOTIFICATION_DELETE: {
      return state.filter((toast) => toast.id !== payload.id);
    }
    case NOTIFICATION_CLOSE: {
      const toastIdx = state.findIndex((toast) => toast.id === payload.id);
      const toast = state[toastIdx];
      const newState = [...state];
      newState[toastIdx] = { ...toast, hidden: true };
      return newState;
    }
    case NOTIFICATION_UPDATE: {
      const toastIdx = state.findIndex((toast) => toast.id === payload.id);
      const toast = state[toastIdx];
      const newState = [...state];
      newState[toastIdx] = { ...toast, ...payload };
      return newState;
    }
  }
  return state;
};
