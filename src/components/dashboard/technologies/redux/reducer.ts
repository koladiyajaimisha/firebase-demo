import { Action, AnyAction } from "@reduxjs/toolkit";
import { ITechnology } from "../../interface";
import {
  FETCH_TECHNOLOGIES_DATA,
  FETCH_TECHNOLOGIES_DATA_SUCCESS,
  SET_TECHNOLOGY_ID,
} from "./types";

const initialData = {
  technologies: [],
  isFetching: false,
  technologyId: "",
};

interface TInitialData {
  technologies: Array<ITechnology>;
  isFetching: boolean;
  technologyId: string;
}

const technologyReduces = (
  state: TInitialData = initialData,
  action: AnyAction
): TInitialData => {
  switch (action.type) {
    case FETCH_TECHNOLOGIES_DATA:
      return { ...state, isFetching: true };
    case FETCH_TECHNOLOGIES_DATA_SUCCESS:
      return { ...state, isFetching: false, technologies: action.payload };
    case SET_TECHNOLOGY_ID:
      return { ...state, technologyId: action.payload };
    default:
      return state;
  }
};

export default technologyReduces;
