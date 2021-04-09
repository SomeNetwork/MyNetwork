export const USERS_LOAD = "USERS_LOAD";
export const USERS_SET_FILTERS = "USERS_SET_FILTERS";
export const USERS_LOCAL_SAVE = "USERS_LOCAL_SAVE";

export const usersLoadUsers = (payload) => ({
  type: USERS_LOAD,
  payload,
});
export const usersSetFilters = (payload) => ({
  type: USERS_SET_FILTERS,
  payload,
});
export const usersLocalSave = (payload) => ({
  type: USERS_LOCAL_SAVE,
  payload,
});
