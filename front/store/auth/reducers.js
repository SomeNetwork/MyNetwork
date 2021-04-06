const {
  AUTH_SAVE_USER,
  AUTH_SIGN_OUT,
  AUTH_CHECK,
  AUTH_CHECKED,
  AUTH_USER_LOAD,
} = require("./actions");

const defaultState = {
  username: "",
  _id: "",
  isAuth: false,
  authChecking: null,
};

export const authReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SAVE_USER:
      return {
        // ...state,
        ...payload,
        isAuth: true,
        authChecking: false,
      };
    case AUTH_CHECK:
      return {
        ...state,
        authChecking: true,
      };
    case AUTH_CHECKED:
      return {
        ...state,
        authChecking: false,
      };
    case AUTH_SIGN_OUT:
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
