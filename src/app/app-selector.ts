import { AppRootStateType } from "./store";

export const isAuthSelector = (state: AppRootStateType): boolean =>
  state.app.isAuth;
export const appStatusSelector = (state: AppRootStateType): boolean =>
  state.app.isAppInProgress;
