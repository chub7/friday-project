import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from "./app-reducer";
import {LoginActionsType, loginReducer} from "../features/Login/login-reducer";
import {ProfileActionsType, profileReducer} from "../features/Profile/profile-reducer";


const rootReducer = combineReducers({
 app: appReducer,
    loginPage: loginReducer,
    profile: profileReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllOfActions = AppActionsType | LoginActionsType | ProfileActionsType
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AllOfActions>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
