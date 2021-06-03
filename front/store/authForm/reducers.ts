import TAuthFormActions, { AuthFormActionType, IAuthFormState, Tabs } from "./types";

const defaultState: IAuthFormState = {
  active: Tabs.signIn,
};

export const authFormReduser = (state = defaultState, action: TAuthFormActions): IAuthFormState => {
  const { type } = action;
  switch (type) {
    case AuthFormActionType.AUTHFORM_GOTO_SIGN_IN:
      return {
        ...state,
        active: Tabs.signIn,
      };
    case AuthFormActionType.AUTHFORM_GOTO_SIGN_UP:
      return {
        ...state,
        active: Tabs.signUp,
      };
    case AuthFormActionType.AUTHFORM_GOTO_EMAIL_CONFIRM:
      return {
        ...state,
        active: Tabs.emailConfirm,
      };
    case AuthFormActionType.AUTHFORM_GOTO_SEND_CODE:
      return {
        ...state,
        active: Tabs.sendCode,
      };
  }
  return state;
};
