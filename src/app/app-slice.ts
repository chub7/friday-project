import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedThunk} from "./store";
import {loginApi} from "../features/Login/login-api";
import {setProfile} from "../features/Profile/profile-slice";
import axios, {AxiosError} from "axios";

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
    setIsAppInProgress: (state: TypeInitialState, action: PayloadAction<{ appStatus: boolean }>) => {
      state.isAppInProgress = action.payload.appStatus;
    },
    setIsAuth: (state: TypeInitialState, action: PayloadAction<{ isAuthStatus: boolean }>) => {
      state.isAuth = action.payload.isAuthStatus;
    },
    setAuthError: (state: TypeInitialState, action: PayloadAction<{ error: string }>) => { //refactor надо ли обрабатывать ошибку isAuth
      state.error = action.payload.error;
    },
  },
});

export const appSlice = slice.reducer;
export const { setIsAppInProgress, setIsAuth } = slice.actions;

export const authMe = () : TypedThunk => async (dispatch) => {
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
