import IConversation from "./Conversation";
import IUser from "./User";

export default interface IConversationLink {
    _id: string,
    userId: IUser["_id"],
    user: IUser
    conversationId: IConversation["_id"],
    conversation?: IConversation,
    createdAt?: string,
}

// export type IConversationOptional = { [key in (keyof IConversation)]?: IConversation[key] }