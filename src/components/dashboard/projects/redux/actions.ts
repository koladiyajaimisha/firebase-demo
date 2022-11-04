import { collection, getDocs, query, where } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../../../firebase";
import { IS_FETCHING_PROJECTS_DATA, SET_ALL_PROJECTS_DATA } from "./types";

export const fetchProjectsData =
  () => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: IS_FETCHING_PROJECTS_DATA, payload: true });
    const state = getState();
    const authEmail = state.auth.authUser?.email;
    const role = state.auth.authUser?.role;
    if (authEmail)
      try {
        const q =
          role === "mentor"
            ? query(
                collection(db, "projects"),
                where("createdBy", "==", authEmail)
              )
            : query(
                collection(db, "projects"),
                where("members", "array-contains", authEmail)
              );

        const data = await getDocs(q);
        if (data.docs.length) {
          dispatch({
            type: SET_ALL_PROJECTS_DATA,
            payload: data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          });
        }
      } catch (error) {}
    dispatch({ type: IS_FETCHING_PROJECTS_DATA, payload: false });
  };
