import IConversation, { ConversationTypes } from "src/interfaces/Conversation";
import { IAction, IActionWithoutPayload } from "store/types";

// const filterExample = { $and: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] }
export interface IConversationsState {
    conversations: IConversation[],
    // FIXME: type of filters
    // filters: any,
    nameFilter: string
    // filters: { $and: [ { type: { $eq: ConversationTypes } }, { name: { content: string } } ] },


    isLoaded: boolean,
    type: ConversationTypes
}

export enum ConversationsType {
    CONVERSATIONS_LOAD = "CONVERSATIONS_LOAD",
    CONVERSATIONS_LOCAL_SAVE = "CONVERSATIONS_LOCAL_SAVE",
    CONVERSATIONS_SET_NAME_FILTER = "CONVERSATIONS_SET_NAME_FILTER",
    CONVERSATIONS_SET_TYPE = "CONVERSATIONS_SET_TYPE",
    EVENT_NEW_CONVERSATION_CREATED = "EVENT_NEW_CONVERSATION_CREATED",
}

export interface IActionLoad extends IActionWithoutPayload {
    type: ConversationsType.CONVERSATIONS_LOAD,
}
export interface IActionSetNameFilter extends IAction {
    type: ConversationsType.CONVERSATIONS_SET_NAME_FILTER,
    payload: IConversationsState["nameFilter"]
}
export interface IActionLocalSave extends IAction {
    type: ConversationsType.CONVERSATIONS_LOCAL_SAVE,
    payload: IConversationsState['conversations']
}
export interface IActionSetType extends IAction {
    type: ConversationsType.CONVERSATIONS_SET_TYPE,
    payload: IConversationsState['type']
}
export interface IActionEventNewConversationCreated extends IAction {
    type: ConversationsType.EVENT_NEW_CONVERSATION_CREATED,
    payload: IConversationsState['conversations'][0]
}

type TConversationsActions =
    | IActionLoad
    | IActionSetNameFilter
    | IActionLocalSave
    | IActionSetType

export default TConversationsActions