import IUser from "src/types/User";
import { IAction } from "store/types";

export interface IUserPageState {
    user: IUser,
    isOwner: boolean,
    isLoaded: boolean
}


export enum UserPageActionType {
    USER_PAGE_LOAD = "USER_PAGE_LOAD",
    USER_PAGE_SAVE = "USER_PAGE_SAVE",
}


export interface IActionLoad extends IAction {
    type: UserPageActionType.USER_PAGE_LOAD,
    payload: {
        username: IUser["username"]
    }
}
export interface IActionLocalSave extends IAction {
    type: UserPageActionType.USER_PAGE_SAVE,
    payload: { user: IUser, isOwner: boolean }
}

type TUserPageActions =
    | IActionLoad
    | IActionLocalSave

export default TUserPageActions