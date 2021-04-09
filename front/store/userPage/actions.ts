// export const USER_PAGE_LOAD = "USER_PAGE_LOAD";
// export const USER_PAGE_SAVE = "USER_PAGE_SAVE";

export enum ActionType  {
  USER_PAGE_LOAD = "USER_PAGE_LOAD",
  USER_PAGE_SAVE = "USER_PAGE_SAVE",
}


export type LoadUserPageAction = {
  type: ActionType.USER_PAGE_LOAD
  payload: any
}

export const loadUserPage = (payload : any):LoadUserPageAction => ({
  type: ActionType.USER_PAGE_LOAD,
  payload,
});


export type LocalSaveUserPageAction = {
  type: ActionType.USER_PAGE_SAVE
  payload: any
}

export const localSaveUserPage = (payload : any):LocalSaveUserPageAction => ({
  type: ActionType.USER_PAGE_SAVE,
  payload,
});



//type a = ReturnType<typeof localSaveUserPage>

export type UserPageActionType = LocalSaveUserPageAction | LoadUserPageAction