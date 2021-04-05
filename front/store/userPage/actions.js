export const USER_PAGE_LOAD = "USER_PAGE_LOAD";
export const USER_PAGE_SAVE = "USER_PAGE_SAVE";

export const loadUserPage = (payload) => ({
  type: USER_PAGE_LOAD,
  payload,
});
export const localSaveUserPage = (payload) => ({
  type: USER_PAGE_SAVE,
  payload,
});
