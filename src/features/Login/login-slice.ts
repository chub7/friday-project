import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "./loginApi";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import { setProfile } from "../Profile/profile-slice";
import { setIsAuth } from "../../app/app-slice";

export type ResultSignUpType = false | "Created";

type TypeInitialState = {
  error: string | null;
  isInProgress: boolean;
  result: ResultSignUpType;
};

const initialState: TypeInitialState = {
  error: null,
  isInProgress: false,
  result: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    registration: (
      state: TypeInitialState,
      action: PayloadAction<ResultSignUpType>
    ) => {
      state.result = action.payload;
    },
    setInProgressStatus: (
      state: TypeInitialState,
      action: PayloadAction<boolean>
    ) => {
      state.isInProgress = action.payload;
    },
    setErrorSingUp: (
      state: TypeInitialState,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

export const loginSlice = slice.reducer;
export const { setInProgressStatus, setErrorSingUp, registration } =
  slice.actions;

export const singUp =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(registration(false));
    dispatch(setErrorSingUp(null));
    dispatch(setInProgressStatus(true));
    try {
      await loginApi.registration(email, password);
      dispatch(registration("Created"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const finalError =
          (error as AxiosError<{ error: string }>).response?.data.error ||
          error.message;
        dispatch(setErrorSingUp(finalError));
        alert(finalError);
      }
    } finally {
      dispatch(setInProgressStatus(false));
    }
  };

export const signInThunk =
  (email: string, password: string, rememberMe: boolean, setStatus: any) =>
  async (dispatch: AppDispatch) => {
    dispatch(setInProgressStatus(true));
    try {
      const data = await loginApi.login(email, password, rememberMe);
      dispatch(setProfile({ profile: data }));
      dispatch(setIsAuth({ isAuthStatus: true }));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const finalError =
          (error as AxiosError<{ error: string }>).response?.data.error ||
          error.message;
        setStatus({ message: finalError });
        /* dispatch(setErrorSingUp(finalError))*/
      }
    } finally {
      dispatch(setInProgressStatus(false));
    }
  };
