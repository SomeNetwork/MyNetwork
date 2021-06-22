import TUsersActions, { IConversationsState, ConversationsType } from "./type";

const defaultState: IConversationsState = {
  conversations: [],
  filters: {} as IConversationsState["filters"],
  isLoaded: false,
};

export const conversationsReduser = (state = defaultState, action: TUsersActions): IConversationsState => {
  const { type, payload } = { payload: undefined, ...action };
  switch (type) {
    case ConversationsType.CONVERSATIONS_LOAD:
      return {
        ...state,
        isLoaded: false,
      };
    case ConversationsType.CONVERSATIONS_LOCAL_SAVE:
      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
  }
  return state;
};
