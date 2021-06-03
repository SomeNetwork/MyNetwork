import { TAction, TActionWithoutPayload } from "store/types";
import { AuthActionType, IActionAuthCheck, IActionAuthChecked, IActionConfirmEmail, IActionLoadUser, IActionLocalSaveUser, IActionSignIn, IActionSignOut, IActionSignUp, IActionUpdateUser } from "./types";


export const updateUser: TAction<IActionUpdateUser> = (payload) => ({
  type: AuthActionType.AUTH_USER_UPDATE,
  payload,
});

export const loadUser: TActionWithoutPayload<IActionLoadUser> = () => ({
  type: AuthActionType.AUTH_USER_LOAD
  ,
});


export const confirmEmail: TAction<IActionConfirmEmail> = (payload) => ({
  type: AuthActionType.AUTH_CONFIRM_EMAIL,
  payload,
});

export const localSaveUser: TAction<IActionLocalSaveUser> = (payload) => ({
  type: AuthActionType.AUTH_SAVE_USER,
  payload,
});


export const signIn: TAction<IActionSignIn> = (payload) => ({
  type: AuthActionType.AUTH_SIGN_IN,
  payload,
});

export const signUp: TAction<IActionSignUp> = (payload) => ({
  type: AuthActionType.AUTH_SIGN_UP,
  payload,
});


export const signOut: TAction<IActionSignOut> = (payload) => ({
  type: AuthActionType.AUTH_SIGN_OUT,
  payload,
});

export const authCheck: TActionWithoutPayload<IActionAuthCheck> = () => ({
  type: AuthActionType.AUTH_CHECK,

});


export const authChecked: TActionWithoutPayload<IActionAuthChecked> = () => ({
  type: AuthActionType.AUTH_CHECKED
});
