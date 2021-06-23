import { TAction, TActionWithoutPayload } from "store/types";
import { IActionLoad, IActionLocalSave, ConversationsType, IActionSetType, IActionSetNameFilter } from "./type";

export const convsLoadConvs: TActionWithoutPayload<IActionLoad> = () => ({
  type: ConversationsType.CONVERSATIONS_LOAD,
});
export const convsSetNameFilter: TAction<IActionSetNameFilter> = (payload) => ({
  type: ConversationsType.CONVERSATIONS_SET_NAME_FILTER,
  payload,
});
export const convsLocalSave: TAction<IActionLocalSave> = (payload) => ({
  type: ConversationsType.CONVERSATIONS_LOCAL_SAVE,
  payload,
});
export const convsSetType: TAction<IActionSetType> = (payload) => ({
  type: ConversationsType.CONVERSATIONS_SET_TYPE,
  payload,
});
