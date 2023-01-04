import {AppThunkDispatch} from "./store";

const initialState: InitialStateType = {}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const thunk = () => async (dispatch: AppThunkDispatch) => {

    try {

    } catch (e) {


    } finally {

    }
}

export type InitialStateType = {}
export type AppActionsType = any
