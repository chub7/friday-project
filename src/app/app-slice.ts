import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { loginApi } from "../features/Login/loginApi";
import { setProfile } from "../features/Profile/profile-slice";
import axios, { AxiosError } from "axios";

type TypeInitialState = {
  isAuth: boolean;
  error: null | string;
  isAppInProgress: boolean;
};

const initialState: TypeInitialState = {
  isAuth: false,
  isAppInProgress: false,
  error: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAppInProgress: (
      state: TypeInitialState,
      action: PayloadAction<{ appStatus: boolean }>
    ) => {
      state.isAppInProgress = action.payload.appStatus;
    },
    setIsAuth: (
      state: TypeInitialState,
      action: PayloadAction<{ isAuthStatus: boolean }>
    ) => {
      state.isAuth = action.payload.isAuthStatus;
    },
    setAuthError: (
      //refactor надо ли обрабатывать ошибку isAuth
      state: TypeInitialState,
      action: PayloadAction<{ error: string }>
    ) => {
      state.error = action.payload.error;
    },
  },
});

export const appSlice = slice.reducer;
export const { setIsAppInProgress, setIsAuth } = slice.actions;

export const authMe = () => async (dispatch: AppDispatch) => {
  dispatch(setIsAppInProgress({ appStatus: true }));
  try {
    let res = await loginApi.me();
    dispatch(setIsAuth({ isAuthStatus: true }));
    dispatch(setProfile({ profile: res.data }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const finalError =
        (error as AxiosError<{ error: string }>).response?.data.error ||
        error.message;
      //refactor надо ли обрабатывать ошибку isAuth
    }
  } finally {
    dispatch(setIsAppInProgress({ appStatus: false }));
  }
};
