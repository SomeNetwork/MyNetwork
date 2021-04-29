// const { USER_PAGE_SAVE } = require("./actions");

import TUserPageActions, { IUserPageState, UserPageActionType } from "./types";

const defaultState: IUserPageState = {
  user: {} as IUserPageState["user"],
  isOwner: false,
  isLoaded: false,
};

export const userPageReduser = (state = defaultState, action: TUserPageActions): IUserPageState => {
  const { type, payload } = action;
  switch (type) {
    case UserPageActionType.USER_PAGE_LOAD:
      return {
        ...state,
        isLoaded: false,
      };
    case UserPageActionType.USER_PAGE_SAVE:
      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
  }
  return state;
};
