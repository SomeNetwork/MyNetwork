import IConversation from "src/interfaces/Conversation";
import IMessage, { INewMessageData } from "src/interfaces/Message";
import { IAction, IActionWithoutPayload } from "store/types";

export enum MessengerScreens {
    chat, fromCreate, formUpdate
}
export interface IMessengerState {
    // conversations: IConversation[],
    activeConversation: {
        conversation: IConversation | null,
        isLoaded: boolean,
    },
    // FIXME: type of filters
    // filters: any,
    // isLoaded: boolean,
    screen: MessengerScreens,
    // chatForm:IChatFormState
}

export enum MessengersType {

    // LOAD_CONVS = "MESSENGER_LOAD_CONVS",
    // LOCAL_SAVE_CONVS = "MESSENGER_LOCAL_SAVE_CONVS",
    // SET_FILTERS = "MESSENGER_SET_FILTERS",
    CHOOSE_ACTIVE_CONV = "MESSENGER_CHOOSE_ACTIVE_CONV",
    LOAD_ACTIVE_CONV = "MESSENGER_LOAD_ACTIVE_CONV",
    LOCAL_SAVE_ACTIVE_CONV = "MESSENGER_LOCAL_SAVE_ACTIVE_CONV",
    FULL_UPLOAD_ACTIVE_CONV = "MESSENGER_FULL_UPLOAD_ACTIVE_CONV",
    NEXT_MESSAGES_UPLOAD_ACTIVE_CONV = "MESSENGER_UPLOAD_ACTIVE_CONV",
    CREATE_NEW_MESSAGE = "MESSENGER_CREATE_NEW_MESSAGE",
    EVENT_NEW_MESSAGE_CREATED = "MESSENGER_EVENT_NEW_MESSAGE_CREATED",
    CREATE_NEW_CONVERSATION = "MESSENGER_CREATE_NEW_CONVERSATION",
    EVENT_NEW_CONVERSATION_CREATED = "MESSENGER_EVENT_NEW_CONVERSATION_CREATED",
    SET_SCREEN = "SET_SCREEN"
}

// export interface IActionLoadConvs extends IActionWithoutPayload {
//     type: MessengersType.LOAD_CONVS,
// }
// export interface IActionLocalSaveConvs extends IAction {
//     type: MessengersType.LOCAL_SAVE_CONVS,
//     payload: IMessengerState["conversations"]
// }
// export interface IActionSetFilters extends IAction {
//     type: MessengersType.SET_FILTERS,
//     payload: IMessengerState["filters"]
// }

export interface IActionChooseActiveConv extends IAction {
    type: MessengersType.CHOOSE_ACTIVE_CONV,
    payload: IConversation["_id"] | null
}
export interface IActionLoadActiveConv extends IAction {
    type: MessengersType.LOAD_ACTIVE_CONV,
    payload: IConversation["_id"]
}
export interface IActionLocalSaveActiveConv extends IAction {
    type: MessengersType.LOCAL_SAVE_ACTIVE_CONV,
    payload: IMessengerState["activeConversation"]["conversation"]
}
export interface IActionFullUpdateActiveConv extends IActionWithoutPayload {
    type: MessengersType.FULL_UPLOAD_ACTIVE_CONV,
}
export interface IActionNextMessagesUpdateActiveConv extends IActionWithoutPayload {
    type: MessengersType.LOAD_ACTIVE_CONV,
}

export interface IActionCreateNewMessage extends IAction {
    type: MessengersType.CREATE_NEW_MESSAGE,
    payload: INewMessageData
    // payload: {
    //     content: IMessage["content"],
    //     authorId: IMessage["authorId"],
    //     conversationId: IMessage["conversationId"],
    // }
}
export interface IActionEventNewMessageCreated extends IAction {
    type: MessengersType.EVENT_NEW_MESSAGE_CREATED,
    payload: IMessage
}
export interface IActionCreateNewConv extends IAction {
    type: MessengersType.CREATE_NEW_CONVERSATION,
    payload: IConversation
}
export interface IActionEventNewConvCreated extends IAction {
    type: MessengersType.EVENT_NEW_CONVERSATION_CREATED,
    payload: IConversation
}
export interface IActionSetScreen extends IAction {
    type: MessengersType.SET_SCREEN,
    payload: MessengerScreens
}

type TMessengerActions =
    // | IActionLoadConvs
    // | IActionLocalSaveConvs
    // | IActionSetFilters
    | IActionChooseActiveConv
    | IActionLoadActiveConv
    | IActionLocalSaveActiveConv
    | IActionFullUpdateActiveConv
    | IActionNextMessagesUpdateActiveConv
    | IActionCreateNewMessage
    | IActionEventNewMessageCreated
    | IActionCreateNewConv
    | IActionEventNewConvCreated
    | IActionSetScreen

export default TMessengerActions