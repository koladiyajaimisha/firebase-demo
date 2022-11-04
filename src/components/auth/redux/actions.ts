import { SET_IS_AUTHENTICATED } from "./types";

export const setIsAuthenticated = (payload: boolean) => ({
  type: SET_IS_AUTHENTICATED,
  payload,
});
