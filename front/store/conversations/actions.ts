import { TAction, TActionWithoutPayload } from "store/types";
import { IActionLoad, IActionLocalSave, IActionSetFilters, ConversationsType } from "./type";

export const convsLoadConvs: TActionWithoutPayload<IActionLoad> = () => ({
  type: ConversationsType.CONVERSATIONS_LOAD,
});
export const convsSetFilters: TAction<IActionSetFilters> = (payload) => ({
  type: ConversationsType.CONVERSATIONS_SET_FILTERS,
  payload,
});
export const convsLocalSave: TAction<IActionLocalSave> = (payload) => ({
  type: ConversationsType.CONVERSATIONS_LOCAL_SAVE,
  payload,
});
