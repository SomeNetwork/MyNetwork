import IConversation from "./Conversation";
import IUser from "./User";

export enum MessageType {
    text = "text",
    info = "info",
}
export default interface IMessage {
    _id: string,
    content: string
    authorId: IUser["_id"]
    author?: IUser
    conversationId: IConversation["_id"],
    type: MessageType,
    // populate
    user?: IUser,
    conversation?: IConversation,
    createdAt?: string,
}
// export default interface IMessage {
//     _id: string,
//     content: string
//     authorId: IUser["_id"]
//     conversationId: IConversation["_id"],
//     // populate
//     user?: IUser,
//     conversation?: IConversation,
//     createdAt?: string,
// }


export type IMessageOptional = { [key in (keyof IMessage)]?: IMessage[key] }
export type INewMessageData = Omit<IMessage, "_id">