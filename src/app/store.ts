import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { configureStore} from '@reduxjs/toolkit';
import {rootReducer} from "./reducers";

export const store = configureStore({
    reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

// @ts-ignore
window.store = store;
