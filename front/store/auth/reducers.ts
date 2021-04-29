import TAuthActions, { AuthActionType, IAuthState } from './types';


const defaultState: IAuthState = {
  user: {} as IAuthState["user"],
  isAuth: false,
  authChecking: null,
};

export const authReduser = (state = defaultState, action: TAuthActions): IAuthState => {
  // FIXME: fix me plz
  const { type, payload } = { payload: undefined, ...action };
  switch (type) {
    case AuthActionType.AUTH_SAVE_USER:
      return {
        // ...state,
        // FIXME: fix me too plz
        user: payload as IAuthState["user"],
        isAuth: true,
        authChecking: false,
      };
    case AuthActionType.AUTH_CHECK:
      return {
        ...state,
        authChecking: true,
      };
    case AuthActionType.AUTH_CHECKED:
      return {
        ...state,
        authChecking: false,
      };
    case AuthActionType.AUTH_SIGN_OUT:
      return {
        ...defaultState,
        authChecking: false,
      };
    // case AUTH_USER_LOAD:
    //   return {
    //     ...payload,
    //     isAuth: state.isAuth,
    //     authChecking: state.authChecking,
    //   };
  }
  return state;
};
