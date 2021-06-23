import { ConversationTypes } from "src/interfaces/Conversation";
import TUsersActions, { IConversationsState, ConversationsType } from "./type";

const defaultState: IConversationsState = {
  conversations: [],
  // filters: {} as IConversationsState["filters"],
  nameFilter: "",
  isLoaded: false,
  type: ConversationTypes.group
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
        conversations: payload as IConversationsState["conversations"],
        isLoaded: true,
      };
    case ConversationsType.CONVERSATIONS_SET_TYPE:
      return {
        ...state,
        type: payload as IConversationsState["type"]
      };
    case ConversationsType.CONVERSATIONS_SET_NAME_FILTER:
      return {
        ...state,
        nameFilter: payload as IConversationsState["nameFilter"]
      };
  }
  return state;
};
