const { AUTH_SAVE_USER, AUTH_SAVE_TOKEN } = require("./actions");

const defaultState = {
  username: "",
  _id: "",
};

export const authReduser = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case:
    case AUTH_SAVE_USER:
      console.log("payload :>> ", payload);
      return {
        ...state,
        _id: payload._id,
        username: payload.username,
      };
    case AUTH_SAVE_TOKEN:
      return {
        ...state,
        username: payload.username,
        token: payload.token,
      };
  }
  return state;
};
