import TUsersActions, { IUsersState, UsersType } from "./type";

const defaultState: IUsersState = {
  users: [],
  filters: {} as IUsersState["filters"],
  isLoaded: false,
};

export const usersReduser = (state = defaultState, action: TUsersActions): IUsersState => {
  const { type, payload } = { payload: undefined, ...action };
  switch (type) {
    case UsersType.USERS_LOAD:
      return {
        ...state,
        isLoaded: false,
      };
    case UsersType.USERS_LOCAL_SAVE:
      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
  }
  return state;
};
