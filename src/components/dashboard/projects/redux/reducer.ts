import { AnyAction } from "redux";
import { RESET_AUTH } from "../../../auth/redux/types";
import { IS_FETCHING_PROJECTS_DATA, SET_ALL_PROJECTS_DATA } from "./types";

const initialState = {
  projectsList: [],
  isFetchingProjects: false,
};

const projectsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case IS_FETCHING_PROJECTS_DATA:
      return { ...state, isFetchingProjects: action.payload };
    case SET_ALL_PROJECTS_DATA:
      return { ...state, projectsList: action.payload };
    case RESET_AUTH:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default projectsReducer;
