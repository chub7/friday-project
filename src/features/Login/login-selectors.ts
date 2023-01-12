import {AppRootStateType} from "../../app/store";
import {ResultSignUpType} from "./login-slice";

export const signUpResultSelector = (state: AppRootStateType): ResultSignUpType => state.login.result;

export const loginIsInProgressSelector = (state: AppRootStateType): boolean => state.login.isInProgress;
