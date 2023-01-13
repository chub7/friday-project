import { AppRootStateType } from "./store";

export const isAuthSelector = (state: AppRootStateType): boolean => state.app.isAuth;
export const appStatusSelector = (state: AppRootStateType): boolean => state.app.isAppInProgress;
export const appErrorSelector = (state: AppRootStateType): string | null => state.app.error;
