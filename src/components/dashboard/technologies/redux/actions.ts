import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../../../firebase";
import { ITechnology } from "../../interface";
import {
  FETCH_TECHNOLOGIES_DATA,
  FETCH_TECHNOLOGIES_DATA_SUCCESS,
  SET_TECHNOLOGY_ID,
} from "./types";

export const fetchTechnologies = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_TECHNOLOGIES_DATA });
  const data = await getDocs(collection(db, "technology"));
  const technology = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  dispatch(fetchTechnologiesSuccess(technology));
};

export const fetchTechnologiesSuccess = (technology: any) => ({
  type: FETCH_TECHNOLOGIES_DATA_SUCCESS,
  payload: technology,
});

export const setTechnologyId = (id: string) => ({
  type: SET_TECHNOLOGY_ID,
  payload: id,
});
