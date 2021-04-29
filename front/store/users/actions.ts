import { TAction, TActionWithoutPayload } from "store/types";
import { IActionLoad, IActionLocalSave, IActionSetFilters, UsersType } from "./type";

export const usersLoadUsers: TActionWithoutPayload<IActionLoad> = () => ({
  type: UsersType.USERS_LOAD,
});
export const usersSetFilters: TAction<IActionSetFilters> = (payload) => ({
  type: UsersType.USERS_SET_FILTERS,
  payload,
});
export const usersLocalSave: TAction<IActionLocalSave> = (payload) => ({
  type: UsersType.USERS_LOCAL_SAVE,
  payload,
});
