import IMessage from "./Message";
import IUser from "./User";

export enum ConversationTypes {
    group = "group",
    private = "private"
}
export default interface IConversation {
    _id: string,
    name: string,
    avatar: string,
    type: ConversationTypes,
    messages: IMessage[],
    ownerId: IUser["_id"],
    // conversationLinks: IConversationLink[],
    owner: IUser[],
    lastMessage: IMessage[],
    members: IUser[],
    createdAt?: string,
    interlocutor?: IUser
}

export type IConversationOptional = { [key in (keyof IConversation)]?: IConversation[key] }

export interface INewConversationData {
    ownerId: IConversation["ownerId"],
    name: IConversation["name"],
    avatar?: string,
    members?: IUser[],
    type: IConversation["type"]
}

export interface IConversationReadData {
    id: IConversation["_id"]
}