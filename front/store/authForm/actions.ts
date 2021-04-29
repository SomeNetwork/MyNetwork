import { TAction, TActionWithoutPayload } from "store/types";
import { AuthFormActionType, IActionGoToCodeSend, IActionGoToEmailConfirm, IActionGoToSignIn, IActionGoToSignUp, IActionSubmitEmailConfirm, IActionSubmitSendCode, IActionSubmitSignIn, IActionSubmitSignUp } from "./types";


export const gotoSignIn: TActionWithoutPayload<IActionGoToSignIn> = () => ({
  type: AuthFormActionType.AUTHFORM_GOTO_SIGN_IN,

});
export const gotoSignUp: TActionWithoutPayload<IActionGoToSignUp> = (): IActionGoToSignUp => ({
  type: AuthFormActionType.AUTHFORM_GOTO_SIGN_UP,

});
export const gotoEmailConfirm: TActionWithoutPayload<IActionGoToEmailConfirm> = () => ({
  type: AuthFormActionType.AUTHFORM_GOTO_EMAIL_CONFIRM
});
export const gotoCodeSend: TActionWithoutPayload<IActionGoToCodeSend> = () => ({
  type: AuthFormActionType.AUTHFORM_GOTO_SEND_CODE
});
export const submitSignIn: TAction<IActionSubmitSignIn> = (payload) => ({
  type: AuthFormActionType.AUTHFORM_SUBMIT_SIGN_IN,
  payload
});
export const submitSignUp: TAction<IActionSubmitSignUp> = (payload) => ({
  type: AuthFormActionType.AUTHFORM_SUBMIT_SIGN_UP,
  payload,
});
export const submitEmailConfirm: TAction<IActionSubmitEmailConfirm> = (payload) => ({
  type: AuthFormActionType.AUTHFORM_SUBMIT_EMAIL_CONFIRM,
  payload,
});
export const submitSendCode: TAction<IActionSubmitSendCode> = (payload) => ({
  type: AuthFormActionType.AUTHFORM_SUBMIT_SEND_CODE,
  payload,
});
