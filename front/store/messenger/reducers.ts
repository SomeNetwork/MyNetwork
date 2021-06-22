import TMessengerActions, { IMessengerState, MessengerScreens, MessengersType } from "./type";
import IConversation from 'src/interfaces/Conversation'

const defaultState: IMessengerState = {
  conversations: [],
  activeConversation: {
    conversation: null,
    isLoaded: true,
  },
  filters: {} as IMessengerState["filters"],
  isLoaded: false,
  screen: MessengerScreens.chat,
  // chatForm: {} 
};

export const messengerReduser = (state = defaultState, action: TMessengerActions): IMessengerState => {
  // const { type, payload } 
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

    case MessengersType.LOCAL_SAVE_ACTIVE_CONV: {
      const newState = {
        ...state,
        activeConversation: {
          conversation: payload,
          isLoaded: true
        }
      };
      if (payload) {
        const convIdx = state.conversations.findIndex(conv => conv._id === payload._id)
        if (convIdx !== -1) {
          newState.conversations = state.conversations.slice()
          newState.conversations.splice(convIdx, 1, { ...payload, messages: payload.messages.slice(0, 1) })
        }
      }
      return newState
    }
    case MessengersType.EVENT_NEW_MESSAGE_CREATED: {
      const newState = { ...state }
      if (payload.conversationId === newState.activeConversation.conversation?._id)
        newState.
          activeConversation = {
          ...newState.activeConversation,
          conversation: {
            ...newState.activeConversation.conversation,
            messages: [payload, ...(newState.activeConversation.conversation?.messages || [])],

          } as IConversation,
        }
      const idx = newState.conversations.findIndex((conv => conv._id === payload.conversationId))
      if (idx > -1) {
        const conversations = newState.conversations.slice()
        const conversation = conversations.splice(idx, 1)[0]
        newState.
          conversations = [{
            ...conversation,
            // lastMessage: [payload],
            messages: [payload, ...(conversation.messages || [])]
          }, ...conversations,
          ]
      }
      return newState
    }
    case MessengersType.SET_SCREEN:

      return { ...state, screen: payload }
    // return { ...state, screen: payload as IMessengerState["screen"] }


  }
  return state;
};
