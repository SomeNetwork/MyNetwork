import TMessengerActions, { IMessengerState, MessengersType } from "./type";

const defaultState: IMessengerState = {
  conversations: [],
  activeConversation: {
    conversation: null,
    isLoaded: true,
  },
  filters: {} as IMessengerState["filters"],
  isLoaded: false,
};

export const messengerReduser = (state = defaultState, action: TMessengerActions): IMessengerState => {
  const { type, payload } = { payload: undefined, ...action };
  switch (type) {
    case MessengersType.LOAD_CONVS:
      return {
        ...state,
        isLoaded: false,
      };
    case MessengersType.LOCAL_SAVE_CONVS:
      return {
        ...state,
        conversations: payload,
        isLoaded: true,
      };
    case MessengersType.SET_FILTERS:
      return {
        ...state,
        filters: payload,

      };
    case MessengersType.LOAD_ACTIVE_CONV:
      return {
        ...state,
        activeConversation: {
          ...state.activeConversation,
          // conversation: null,
          isLoaded: false
        }
      };
    case MessengersType.LOCAL_SAVE_ACTIVE_CONV:
      return {
        ...state,
        activeConversation: {
          conversation: payload,
          isLoaded: true
        }
      };

  }
  return state;
};
