// const { USER_PAGE_SAVE } = require("./actions");

import TChatFormActions, { IChatFormState, ChatFormActionType, TActionSetUpPayload } from "./types";

const defaultState: IChatFormState = {
  name: { value: "", error: false },
  avatar: { loading: false, src: null, url: null },
  members: [],
  // formType: FormType.create,
  isValid: true,
  isLoading: false,
};

type IRule<T> = (v: T) => true | string

const nameRules: IRule<IChatFormState["name"]["value"]>[] = [
  (v) => !!v || "Min name length is 3!",
];

type TValidFunc<T> = (value: T, rules: IRule<T>[]) => false | string
const checkValueError: TValidFunc<IChatFormState["name"]["value"]> = (value, rules) => {
  for (const rule of rules) {
    const res = rule(value);
    if (res !== true) return res;
  }
  return false;
}


export const chatFormReduser = (state = defaultState, action: TChatFormActions): IChatFormState => {
  const { type, payload } = { payload: undefined, ...action, };

  switch (type) {
    case ChatFormActionType.CHAT_FORM_SETUP: {
      const newState = { ...defaultState }
      const data = payload as TActionSetUpPayload
      if (data) {
        if (data.name) newState.name = { value: data.name, error: false }
        if (data.avatar) newState.avatar = { url: data.avatar, src: null, loading: false, }
        if (data.members) newState.members = data.members
      }

      return newState
    }
    case ChatFormActionType.CHAT_FORM_AVATAR_CHANGE:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          loading: true, src: null
        },
      };
    case ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_NOT_SAVED:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          loading: false, src: null
        },
      };
    case ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_SAVED:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          loading: false, src: payload as IChatFormState["avatar"]["src"],
        },
      };
    case ChatFormActionType.CHAT_FORM_NAME_CHANGE:
      return {
        ...state,
        name: { value: payload as IChatFormState["name"]["value"], error: false }
      };
    case ChatFormActionType.CHAT_FORM_MEMEBERS_CHANGE:
      // TODO:
      return {
        ...state,
        members: payload as IChatFormState["members"]
      };
    case ChatFormActionType.CHAT_FORM_SUBMIT:
      // check valid
      {
        const nameError = checkValueError(state.name.value, nameRules)
        let isValid = true
        if (nameError !== false) isValid = false
        return {
          ...state,
          name: {
            ...state.name,
            error: nameError
          },
          isValid
        };
      }
    case ChatFormActionType.CHAT_FORM_SET_LOADING:

      return {
        ...state,
        isLoading: payload as IChatFormState["isLoading"]
      };
  }
  return state;
};
