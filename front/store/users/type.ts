import IUser from "src/types/User";
import { IAction, IActionWithoutPayload } from "store/types";

export interface IUsersState {
    users: IUser[],
    // FIXME: type of filters
    filters: any,
    isLoaded: boolean,
}

export enum UsersType {
    USERS_LOAD = "USERS_LOAD",
    USERS_SET_FILTERS = "USERS_SET_FILTERS",
    USERS_LOCAL_SAVE = "USERS_LOCAL_SAVE",
}

export interface IActionLoad extends IActionWithoutPayload {
    type: UsersType.USERS_LOAD,
}
export interface IActionSetFilters extends IAction {
    type: UsersType.USERS_SET_FILTERS,
    payload: IUsersState["filters"]
}
export interface IActionLocalSave extends IAction {
    type: UsersType.USERS_LOCAL_SAVE,
    payload: IUsersState['users']
}

type TUsersActions =
    | IActionLoad
    // | IActionSetFilters
    | IActionLocalSave

export default TUsersActions