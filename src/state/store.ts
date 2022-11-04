import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../components/auth/redux/reducer";
import projectsReducer from "../components/dashboard/projects/redux/reducer";
import technologyReduces from "../components/dashboard/technologies/redux/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    technology: technologyReduces,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//hooks with type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
