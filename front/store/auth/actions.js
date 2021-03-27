export const AUTH_SIGN_IN = "AUTH_SIGN_IN";
export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export const AUTH_SAVE_USER = "AUTH_SAVE_USER";
export const AUTH_SAVE_TOKEN = "AUTH_SAVE_TOKEN";

export const localSaveToken = (payload) => ({
  type: AUTH_SAVE_TOKEN,
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
