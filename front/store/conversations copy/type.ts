import IConversation from "src/interfaces/Conversation";
import { IAction, IActionWithoutPayload } from "store/types";

export interface IConversationsState {
    conversations: IConversation[],
    // FIXME: type of filters
    filters: any,
    isLoaded: boolean,
}

export enum ConversationsType {
    CONVERSATIONS_LOAD = "CONVERSATIONS_LOAD",
    CONVERSATIONS_SET_FILTERS = "CONVERSATIONS_SET_FILTERS",
    CONVERSATIONS_LOCAL_SAVE = "CONVERSATIONS_LOCAL_SAVE",
}

export interface IActionLoad extends IActionWithoutPayload {
    type: ConversationsType.CONVERSATIONS_LOAD,
}
export interface IActionSetFilters extends IAction {
    type: ConversationsType.CONVERSATIONS_SET_FILTERS,
    payload: IConversationsState["filters"]
}
export interface IActionLocalSave extends IAction {
    type: ConversationsType.CONVERSATIONS_LOCAL_SAVE,
    payload: IConversationsState['conversations']
}

type TConversationsActions =
    | IActionLoad
    // | IActionSetFilters
    | IActionLocalSave

export default TConversationsActions