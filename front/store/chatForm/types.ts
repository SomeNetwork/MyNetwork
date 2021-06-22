import IConversation from "src/interfaces/Conversation";
import IUser from "src/interfaces/User";
import { IAction, IActionWithoutPayload } from "store/types";

export enum FormType {
    create, update
}

export interface IChatFormState {
    name: { value: IConversation["name"]; error: string | false };
    avatar: { loading: boolean; src: string | null; url: string | null };
    members: IUser[];
    // formType: FormType;
    isLoading: boolean;
    isValid: boolean
}


export enum ChatFormActionType {
    CHAT_FORM_SETUP = "CHAT_FORM_SETUP",
    CHAT_FORM_AVATAR_CHANGE = "CHAT_FORM_AVATAR_CHANGE",
    // CHAT_FORM_AVATAR_LOCAL_SAVE = "CHAT_FORM_AVATAR_LOCAL_SAVE",
    CHAT_FORM_AVATAR_LOCAL_SAVED = "CHAT_FORM_AVATAR_LOCAL_SAVED",
    CHAT_FORM_AVATAR_LOCAL_NOT_SAVED = "CHAT_FORM_AVATAR_LOCAL_NOT_SAVED",
    CHAT_FORM_NAME_CHANGE = "CHAT_FORM_NAME_CHANGE",
    CHAT_FORM_MEMEBERS_CHANGE = "CHAT_FORM_MEMEBERS_CHANGE",
    CHAT_FORM_SUBMIT = "CHAT_FORM_SUBMIT",
    CHAT_FORM_SET_LOADING = "CHAT_FORM_SET_LOADING",
}

export type TActionSetUpPayload = {
    name: IConversation["name"];
    avatar: string | null;
    members: IUser[];

} | null


export interface IActionSetUp extends IAction {
    type: ChatFormActionType.CHAT_FORM_SETUP,
    payload: TActionSetUpPayload
}
export interface IActionAvatarChange extends IAction {
    type: ChatFormActionType.CHAT_FORM_AVATAR_CHANGE,
    payload: File | null
}
// export interface IActionAvatarLocalSave extends IAction {
//     type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_SAVE,
//     payload: IChatFormState['avatar']["file"]
// }
export interface IActionAvatarLocalSaved extends IAction {
    type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_SAVED,
    payload: IChatFormState['avatar']["src"]
}
export interface IActionAvatarLocalNotSaved extends IActionWithoutPayload {
    type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_NOT_SAVED,
}
export interface IActionNameChange extends IAction {
    type: ChatFormActionType.CHAT_FORM_NAME_CHANGE,
    payload: IChatFormState["name"]["value"]
}

export interface IActionMembersChange extends IAction {
    type: ChatFormActionType.CHAT_FORM_MEMEBERS_CHANGE,
    payload: IChatFormState["members"]
}
export interface IActionSubmit extends IActionWithoutPayload {
    type: ChatFormActionType.CHAT_FORM_SUBMIT
}
export interface IActionSetLoading extends IAction {
    type: ChatFormActionType.CHAT_FORM_SET_LOADING,
    payload: IChatFormState["isLoading"]
}

type TChatFormActions =
    | IActionSetUp
    | IActionAvatarChange
    // | IActionAvatarLocalSave
    | IActionAvatarLocalSaved
    | IActionAvatarLocalNotSaved
    | IActionNameChange
    | IActionMembersChange
    | IActionSubmit
    | IActionSetLoading

export default TChatFormActions