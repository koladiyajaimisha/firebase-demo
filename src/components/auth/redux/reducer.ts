import { AnyAction } from "@reduxjs/toolkit";
import { IAuthUser } from "../../dashboard/interface";

import {
  SET_AUTH_USER,
  SET_IS_AUTHENTICATED,
  SET_IS_FETCHING_AUTH_USER,
} from "./types";

const initialState = {
  isAuthenticated: false,
  authUser: null,
  isFetchingAuthUser: false,
};

interface TInitialState {
  isAuthenticated: boolean;
  authUser: null | IAuthUser;
  isFetchingAuthUser: boolean;
}

const authReducer = (
  state: TInitialState = initialState,
  action: AnyAction
): TInitialState => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case SET_IS_FETCHING_AUTH_USER:
      return { ...state, isFetchingAuthUser: action.payload };
    case SET_AUTH_USER:
      return { ...state, authUser: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export default authReducer;
