export const AUTH_SIGN_IN = "AUTH_SIGN_IN";
export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_SAVE_USER = "AUTH_SAVE_USER";
export const AUTH_CHECK = "AUTH_CHECK";
export const AUTH_CHECKED = "AUTH_CHECKED";
export const AUTH_USER_UPDATE = "AUTH_USER_UPDATE";
export const AUTH_USER_LOAD = "AUTH_USER_LOAD";
export const AUTH_CONFIRM_EMAIL = "AUTH_CONFIRM_EMAIL";

export const updateUser = (payload) => ({
  type: AUTH_USER_UPDATE,
  payload,
});

export const loadUser = (payload) => ({
  type: AUTH_USER_LOAD,
  payload,
});
export const confirmEmail = (payload) => ({
  type: AUTH_CONFIRM_EMAIL,
  payload,
});

export const localSaveUser = (payload) => ({
  type: AUTH_SAVE_USER,
  payload,
});
export const signIn = (payload) => ({
  type: AUTH_SIGN_IN,
  payload,
});
export const signUp = (payload) => ({
  type: AUTH_SIGN_UP,
  payload,
});
export const signOut = (payload) => ({
  type: AUTH_SIGN_OUT,
  payload,
});
export const authCheck = (payload) => ({
  type: AUTH_CHECK,
  payload,
});
export const authChecked = (payload) => ({
  type: AUTH_CHECKED,
  payload,
});
