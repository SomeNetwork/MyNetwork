export const AUTHFORM_GOTO_SIGN_IN = "AUTHFORM_GOTO_SIGN_IN";
export const AUTHFORM_GOTO_SIGN_UP = "AUTHFORM_GOTO_SIGN_UP";
export const AUTHFORM_GOTO_EMAIL_CONFIRM = "AUTHFORM_GOTO_EMAIL_CONFIRM";
export const AUTHFORM_SUBMIT_SIGN_IN = "AUTHFORM_SUBMIT_SIGN_IN";
export const AUTHFORM_SUBMIT_SIGN_UP = "AUTHFORM_SUBMIT_SIGN_UP";
export const AUTHFORM_SUBMIT_EMAIL_CONFIRM = "AUTHFORM_SUBMIT_EMAIL_CONFIRM";

export const gotoSignIn = (payload) => ({
  type: AUTHFORM_GOTO_SIGN_IN,
  payload,
});
export const gotoSignUp = (payload) => ({
  type: AUTHFORM_GOTO_SIGN_UP,
  payload,
});
export const gotoEmailConfirm = (payload) => ({
  type: AUTHFORM_GOTO_EMAIL_CONFIRM,
  payload,
});

export const submitSignIn = (payload) => ({
  type: AUTHFORM_SUBMIT_SIGN_IN,
  payload,
});
export const submitSignUp = (payload) => ({
  type: AUTHFORM_SUBMIT_SIGN_UP,
  payload,
});
export const submitEmailConfirm = (payload) => ({
  type: AUTHFORM_SUBMIT_EMAIL_CONFIRM,
  payload,
});
