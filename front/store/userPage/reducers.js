// const { USER_PAGE_SAVE } = require("./actions");
import { USER_PAGE_SAVE } from "./actions";

const defaultState = {
  user: {},
  isOwner: false,
  isLoaded: false,
};

export const userPageReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case USER_PAGE_LOAD:
    //   return {
    //     ...sate,
    //   };
    case USER_PAGE_SAVE:
      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
  }
  return state;
};
