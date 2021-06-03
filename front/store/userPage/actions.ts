import { TAction } from "store/types";
import { IActionLoad, IActionLocalSave, UserPageActionType } from "./types";


export const loadUserPage: TAction<IActionLoad> = (payload) => ({
  type: UserPageActionType.USER_PAGE_LOAD,
  payload,
});
export const localSaveUserPage: TAction<IActionLocalSave> = (payload) => ({
  type: UserPageActionType.USER_PAGE_SAVE,
  payload,
});
