import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedThunk} from "./store";
import {loginApi} from "../features/login/login-api";
import {setProfile} from "../features/profile/profile-slice";
import {handleServerAppError} from "../common/utils/handling-response-error/handleServerAppError";

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
    setAuthError: (state: TypeInitialState, action: PayloadAction<{ error: string | null }>) => { //refactor надо ли обрабатывать ошибку isAuth
      state.error = action.payload.error;
    },
  },
});

export const appSlice = slice.reducer;
export const {setIsAppInProgress, setIsAuth, setAuthError} = slice.actions;

export const authMe = () : TypedThunk => async (dispatch) => {
  dispatch(setIsAppInProgress({ appStatus: true }));
  try {
    let res = await loginApi.me();
    dispatch(setIsAuth({ isAuthStatus: true }));
    dispatch(setProfile({ profile: res.data }));
  } catch (error) {
    handleServerAppError(error, dispatch, setAuthError)
  } finally {
    dispatch(setIsAppInProgress({ appStatus: false }));
  }
};
