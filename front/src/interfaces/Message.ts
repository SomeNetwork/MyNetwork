import IConversation from "./Conversation";
import IUser from "./User";
export default interface IMessage {
    _id: string,
    content: string
    authorId: IUser["_id"]
    conversationId: IConversation["_id"],
    // populate
    user?: IUser,
    conversation?: IConversation,
    createdAt?: string,
}

export type IMessageOptional = { [key in (keyof IMessage)]?: IMessage[key] }
export type INewMessageData = Omit<IMessage, "_id">