import IUser from "src/types/User";
import { IAction, IActionWithoutPayload } from "store/types";

export enum Tabs {
  signIn,
  signUp,
  emailConfirm,
  sendCode,
}

export interface IAuthFormState {
  active: Tabs
}

export enum AuthFormActionType {
  AUTHFORM_GOTO_SIGN_IN = "AUTHFORM_GOTO_SIGN_IN",
  AUTHFORM_GOTO_SIGN_UP = "AUTHFORM_GOTO_SIGN_UP",
  AUTHFORM_GOTO_EMAIL_CONFIRM = "AUTHFORM_GOTO_EMAIL_CONFIRM",
  AUTHFORM_GOTO_SEND_CODE = "AUTHFORM_GOTO_SEND_CODE",
  AUTHFORM_SUBMIT_SIGN_IN = "AUTHFORM_SUBMIT_SIGN_IN",
  AUTHFORM_SUBMIT_SIGN_UP = "AUTHFORM_SUBMIT_SIGN_UP",
  AUTHFORM_SUBMIT_EMAIL_CONFIRM = "AUTHFORM_SUBMIT_EMAIL_CONFIRM",
  AUTHFORM_SUBMIT_SEND_CODE = "AUTHFORM_SUBMIT_SEND_CODE",
}

export interface IActionGoToSignIn extends IActionWithoutPayload {
  type: AuthFormActionType.AUTHFORM_GOTO_SIGN_IN,
}
export interface IActionGoToSignUp extends IActionWithoutPayload {
  type: AuthFormActionType.AUTHFORM_GOTO_SIGN_UP,
}
export interface IActionGoToEmailConfirm extends IActionWithoutPayload {
  type: AuthFormActionType.AUTHFORM_GOTO_EMAIL_CONFIRM,
}
export interface IActionGoToCodeSend extends IActionWithoutPayload {
  type: AuthFormActionType.AUTHFORM_GOTO_SEND_CODE,
}
export interface IActionSubmitSignIn extends IAction {
  type: AuthFormActionType.AUTHFORM_SUBMIT_SIGN_IN,
  payload: {
    username: string,
    password: string,
  }
}

export interface IActionSubmitSignUp extends IAction {
  type: AuthFormActionType.AUTHFORM_SUBMIT_SIGN_UP,
  payload: IUser
}
export interface IActionSubmitEmailConfirm extends IAction {
  type: AuthFormActionType.AUTHFORM_SUBMIT_EMAIL_CONFIRM,
  payload: {
    username: string,
    code: string,
  }
}
export interface IActionSubmitSendCode extends IAction {
  type: AuthFormActionType.AUTHFORM_SUBMIT_SEND_CODE,
  payload: {
    username: string,
  }
}

type TAuthFormActions =
  | IActionGoToSignIn
  | IActionGoToSignUp
  | IActionGoToEmailConfirm
  | IActionGoToCodeSend
  | IActionSubmitSignIn
  | IActionSubmitSignUp
  | IActionSubmitEmailConfirm
  | IActionSubmitSendCode

export default TAuthFormActions