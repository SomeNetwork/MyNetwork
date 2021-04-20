// const { USER_PAGE_SAVE } = require("./actions");
import { USERS_LOAD, USERS_LOCAL_SAVE } from "./actions";

const defaultState = {
  users: [],
  filters: {},
  isLoaded: false,
};

export const usersReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS_LOAD:
      return {
        ...state,
        isLoaded: false,
      };
    case USERS_LOCAL_SAVE:
      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
  }
  return state;
};
