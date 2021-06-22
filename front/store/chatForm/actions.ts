import { TAction, TActionWithoutPayload } from "store/types";
import { IActionAvatarChange, IActionNameChange, IActionMembersChange, IActionSubmit, ChatFormActionType, IActionAvatarLocalSaved, IActionAvatarLocalNotSaved, IActionSetLoading, IActionSetUp } from "./types";


export const setupForm: TAction<IActionSetUp> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_SETUP,
  payload
});
export const avatarChange: TAction<IActionAvatarChange> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_AVATAR_CHANGE,
  payload,
});
// export const avatarLocalSave: TAction<IActionAvatarLocalSave> = (payload) => ({
//   type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_SAVE,
//   payload,
// });
export const avatarLocalSaved: TAction<IActionAvatarLocalSaved> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_SAVED,
  payload,
});
export const avatarLocalNotSaved: TActionWithoutPayload<IActionAvatarLocalNotSaved> = () => ({
  type: ChatFormActionType.CHAT_FORM_AVATAR_LOCAL_NOT_SAVED,
});
export const nameChange: TAction<IActionNameChange> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_NAME_CHANGE,
  payload,
});
export const memberChange: TAction<IActionMembersChange> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_MEMEBERS_CHANGE,
  payload,
});
export const submitForm: TActionWithoutPayload<IActionSubmit> = () => ({
  type: ChatFormActionType.CHAT_FORM_SUBMIT,
});
export const setLoading: TAction<IActionSetLoading> = (payload) => ({
  type: ChatFormActionType.CHAT_FORM_SET_LOADING,
  payload
});

