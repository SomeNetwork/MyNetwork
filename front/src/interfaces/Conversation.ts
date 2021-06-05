import IMessage from "./Message";
import IUser from "./User";

export default interface IConversation {
    _id: string,
    name: string,
    avatar: string,
    messagesIds: IMessage["_id"],
    // messagesIds: any[],
    usersIds: IUser[],
    ownderId: IUser,
    updatedAt: string,
}

export type IConversationOptional = { [key in (keyof IConversation)]?: IConversation[key] }