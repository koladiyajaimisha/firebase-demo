import { AnyAction } from "@reduxjs/toolkit";

import { SET_IS_AUTHENTICATED } from "./types";

const initialState = {
  isAuthenticated: false,
};

interface TInitialState {
  isAuthenticated: boolean;
}

const authReducer = (
  state: TInitialState = initialState,
  action: AnyAction
): TInitialState => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };

    default:
      return state;
  }
};

export default authReducer;
