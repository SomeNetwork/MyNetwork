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
    ownderId: IUser["_id"],
    // conversationLinks: IConversationLink[],
    owner: IUser[],
    lastMessage: IMessage[],
    members: IUser[],
    createdAt?: string,
    interlocutor?: IUser
}

export type IConversationOptional = { [key in (keyof IConversation)]?: IConversation[key] }