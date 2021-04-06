const {
  AUTHFORM_GOTO_SIGN_IN,
  AUTHFORM_GOTO_SIGN_UP,
  AUTHFORM_SUBMIT_SIGN_IN,
  AUTHFORM_SUBMIT_SIGN_UP,
  AUTHFORM_GOTO_EMAIL_CONFIRM,
} = require("./actions");

const defaultState = {
  active: 0,
};

export const authFormReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHFORM_GOTO_SIGN_IN:
      return {
        ...state,
        active: 0,
      };
    case AUTHFORM_GOTO_SIGN_UP:
      return {
        ...state,
        active: 1,
      };
    case AUTHFORM_GOTO_EMAIL_CONFIRM:
      return {
        ...state,
        active: 2,
      };
  }
  return state;
};