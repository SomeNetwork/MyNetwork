import IUser from "src/types/User";
import { IAction, IActionWithoutPayload } from "store/types";

export interface IAuthState {
    user: IUser,
    isAuth: boolean,
    authChecking: boolean | null,
}

export enum AuthActionType {
    AUTH_SIGN_IN = "AUTH_SIGN_IN",
    AUTH_SIGN_UP = "AUTH_SIGN_UP",
    AUTH_SIGN_OUT = "AUTH_SIGN_OUT",
    AUTH_SAVE_USER = "AUTH_SAVE_USER",
    AUTH_CHECK = "AUTH_CHECK",
    AUTH_CHECKED = "AUTH_CHECKED",
    AUTH_USER_UPDATE = "AUTH_USER_UPDATE",
    AUTH_USER_LOAD = "AUTH_USER_LOAD",
    AUTH_CONFIRM_EMAIL = "AUTH_CONFIRM_EMAIL",
}


export interface IActionUpdateUser extends IAction {
    type: AuthActionType.AUTH_USER_UPDATE,
    payload: IUser
}

export interface IActionLoadUser extends IActionWithoutPayload {
    type: AuthActionType.AUTH_USER_LOAD
}

export interface IActionConfirmEmail extends IAction {
    type: AuthActionType.AUTH_CONFIRM_EMAIL,
    payload: { code: string }
}
export interface IActionLocalSaveUser extends IAction {
    type: AuthActionType.AUTH_SAVE_USER,
    payload: IUser
}
export interface IActionSignIn extends IAction {
    type: AuthActionType.AUTH_SIGN_IN,
    payload: {
        username: string,
        password: string
    }
}
export interface IActionSignUp extends IAction {
    type: AuthActionType.AUTH_SIGN_UP,
    payload: IUser
}
export interface IActionSignOut extends IAction {
    type: AuthActionType.AUTH_SIGN_OUT,
    payload: { username: string }
}
export interface IActionAuthCheck extends IActionWithoutPayload {
    type: AuthActionType.AUTH_CHECK,
}
export interface IActionAuthChecked extends IActionWithoutPayload {
    type: AuthActionType.AUTH_CHECKED
}

type TAuthActions =
    | IActionUpdateUser
    | IActionLoadUser
    | IActionConfirmEmail
    | IActionLocalSaveUser
    | IActionSignIn
    | IActionSignUp
    | IActionSignOut
    | IActionAuthCheck
    | IActionAuthChecked
export default TAuthActions