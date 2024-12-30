import { SAVE_REDIRECT_PATH, CLEAR_REDIRECT_PATH } from "./actionTypes";

export const saveRedirectPath = (path, allowRedirect) => ({
  type: SAVE_REDIRECT_PATH,
  redirectPath: path,
  redirectAction: allowRedirect,
});

export const clearRedirectPath = () => ({
  type: CLEAR_REDIRECT_PATH,
});
